import { query } from '../config/database.js';

// Evolution API configuration
const EVOLUTION_API_URL = process.env.VITE_EVOLUTION_API_URL || process.env.EVOLUTION_API_URL || 'http://localhost:8080';
const EVOLUTION_API_KEY = process.env.VITE_EVOLUTION_API_KEY || process.env.EVOLUTION_API_KEY || 'your-evolution-api-key';

export const connectInstance = async (req, res) => {
  try {
    const { instanceName, userId } = req.body;

    if (!instanceName || !userId) {
      return res.status(400).json({
        success: false,
        message: 'instanceName e userId são obrigatórios'
      });
    }

    console.log('🔗 Connecting to Evolution API:', { instanceName });

    // First check if instance already exists
    const statusController = new AbortController();
    const statusTimeout = setTimeout(() => statusController.abort(), 15000); // 15 seconds timeout
    
    const statusResponse = await fetch(`${EVOLUTION_API_URL}/instance/fetchInstances`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY
      },
      signal: statusController.signal
    });
    
    clearTimeout(statusTimeout);

    let existingInstance = null;
    if (statusResponse.ok) {
      const instances = await statusResponse.json();
      existingInstance = instances.find(instance => 
        instance.name === instanceName
      );
    }

    // Check if instance is already connected
    if (existingInstance && existingInstance.connectionStatus === 'open') {
      console.log('✅ Instance already connected:', instanceName);
      return res.json({
        success: true,
        message: 'WhatsApp já conectado',
        connected: true,
        instance: existingInstance
      });
    }

    // Create instance if it doesn't exist
    if (!existingInstance) {
      console.log('📱 Creating new instance:', instanceName);
      
      const createResponse = await fetch(`${EVOLUTION_API_URL}/instance/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': EVOLUTION_API_KEY
        },
        body: JSON.stringify({
          instanceName: instanceName,
          token: EVOLUTION_API_KEY,
          qrcode: true,
          webhook: `${process.env.VITE_API_URL}/api/webhooks/evolution`,
          webhookByEvents: false,
          webhookBase64: false,
          events: ['MESSAGES_UPSERT', 'MESSAGES_UPDATE', 'MESSAGES_DELETE', 'SEND_MESSAGE']
        })
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.text();
        console.error('❌ Failed to create instance:', errorData);
        throw new Error('Falha ao criar instância');
      }

      const createData = await createResponse.json();
      console.log('✅ Instance created:', createData);
    }

    // Connect to WhatsApp
    const connectResponse = await fetch(`${EVOLUTION_API_URL}/instance/connect/${instanceName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY
      }
    });

    if (!connectResponse.ok) {
      throw new Error('Falha ao conectar com WhatsApp');
    }

    const connectData = await connectResponse.json();
    console.log('🔗 Connect response:', connectData);

    // Check if already connected
    if (connectData.connectionStatus === 'open') {
      return res.json({
        success: true,
        message: 'WhatsApp já conectado',
        connected: true,
        instance: connectData
      });
    }

    // If QR code is available
    if (connectData.base64 || connectData.qrcode) {
      return res.json({
        success: true,
        message: 'QR Code gerado com sucesso',
        qrCode: connectData.base64 || connectData.qrcode,
        instance: connectData.instance
      });
    }

    res.json({
      success: true,
      message: 'Conexão iniciada',
      data: connectData
    });

  } catch (error) {
    console.error('❌ Evolution connect error:', error);
    
    let errorMessage = 'Erro interno do servidor';
    if (error.name === 'AbortError') {
      errorMessage = 'Timeout ao conectar com WhatsApp. Tente novamente.';
    } else if (error.message) {
      errorMessage = error.message.replace(/Evolution API/gi, 'WhatsApp');
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};

export const getInstanceStatus = async (req, res) => {
  try {
    const { instanceName } = req.params;

    console.log('🔍 Checking instance status:', instanceName);

    // First try to get all instances and filter by name
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout
    
    const response = await fetch(`${EVOLUTION_API_URL}/instance/fetchInstances`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('❌ Failed to fetch instances:', response.status, response.statusText);
      throw new Error('Falha ao verificar status da instância');
    }

    const allInstances = await response.json();
    console.log('📱 All instances:', allInstances);

    // Find the specific instance by name
    const instance = allInstances.find(inst => 
      inst.name === instanceName
    );

    if (instance) {
      const connected = instance.connectionStatus === 'open';
      console.log(`✅ Instance ${instanceName} found, connected: ${connected}, status: ${instance.connectionStatus}`);
      
      return res.json({
        success: true,
        connected,
        state: instance.connectionStatus || 'disconnected',
        instance: instance
      });
    }

    console.log(`❌ Instance ${instanceName} not found`);
    res.json({
      success: true,
      connected: false,
      state: 'not_found',
      instance: null
    });

  } catch (error) {
    console.error('❌ Get instance status error:', error);
    
    let errorMessage = 'Erro interno do servidor';
    if (error.name === 'AbortError') {
      errorMessage = 'Timeout ao verificar status do WhatsApp. Tente novamente.';
    } else if (error.message) {
      errorMessage = error.message.replace(/Evolution API/gi, 'WhatsApp');
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};

export const disconnectInstance = async (req, res) => {
  try {
    const { instanceName } = req.params;

    console.log('❌ Disconnecting instance:', instanceName);

    const response = await fetch(`${EVOLUTION_API_URL}/instance/logout/${instanceName}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Falha ao desconectar instância');
    }

    const data = await response.json();
    console.log('🔌 Disconnect response:', data);

    res.json({
      success: true,
      message: 'Instância desconectada com sucesso',
      data
    });

  } catch (error) {
    console.error('❌ Disconnect instance error:', error);
    
    let errorMessage = 'Erro interno do servidor';
    if (error.name === 'AbortError') {
      errorMessage = 'Timeout ao desconectar WhatsApp. Tente novamente.';
    } else if (error.message) {
      errorMessage = error.message.replace(/Evolution API/gi, 'WhatsApp');
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};

export const getInstanceGroups = async (req, res) => {
  // Log inicial sempre será mostrado
  console.log('=== EVOLUTION GROUPS REQUEST START ===');
  console.log('Time:', new Date().toISOString());
  
  try {
    const { instanceName } = req.params;
    const { userId } = req.query;

    console.log('📥 Request params:', { instanceName, userId });

    if (!userId) {
      console.log('❌ userId missing');
      return res.status(400).json({
        success: false,
        message: 'userId é obrigatório'
      });
    }

    console.log('🔧 EVOLUTION_API_URL:', EVOLUTION_API_URL || 'NOT SET');
    console.log('🔑 EVOLUTION_API_KEY present:', !!EVOLUTION_API_KEY);

    // First check if instance is connected
    const statusController = new AbortController();
    const statusTimeout = setTimeout(() => statusController.abort(), 10000);
    
    try {
      console.log('🔍 Checking instance status...');
      console.log('Calling:', `${EVOLUTION_API_URL}/instance/fetchInstances`);
      
      const statusResponse = await fetch(`${EVOLUTION_API_URL}/instance/fetchInstances`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': EVOLUTION_API_KEY
        },
        signal: statusController.signal
      });
      
      clearTimeout(statusTimeout);
      console.log('📡 Status response:', statusResponse.status, statusResponse.statusText);
      
      if (statusResponse.ok) {
        const instances = await statusResponse.json();
        console.log('📱 Instances found:', instances.length);
        const instance = instances.find(inst => inst.name === instanceName);
        
        if (!instance) {
          console.log('⚠️ Instance not found in fetchInstances, but continuing...');
        } else {
          console.log('✅ Instance found:', instance.name, 'status:', instance.connectionStatus);
          
          if (instance.connectionStatus !== 'open') {
            console.log('⚠️ Instance not connected, but trying to fetch groups anyway...');
          }
        }
        
        console.log('🔄 Proceeding to fetch groups...');
      }
    } catch (statusError) {
      clearTimeout(statusTimeout);
      console.warn('⚠️ Could not verify instance status, proceeding anyway:', statusError.message);
    }

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

    try {
      const response = await fetch(`${EVOLUTION_API_URL}/group/fetchAllGroups/${instanceName}?getParticipants=false`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': EVOLUTION_API_KEY
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('❌ Evolution API response error:', response.status, response.statusText, errorData);
        
        // Handle specific timeout or connection errors
        if (response.status === 500 && errorData.includes('Timed Out')) {
          throw new Error('WhatsApp está demorando para responder. Tente novamente em alguns minutos.');
        }
        
        throw new Error(`Falha ao buscar grupos: ${response.status} ${response.statusText}`);
      }

      const groups = await response.json();
      console.log(`📱 Found ${groups.length} groups`);

      // Check if groups is an array
      if (!Array.isArray(groups)) {
        console.error('❌ Groups response is not an array:', groups);
        throw new Error('Formato de resposta inválido do WhatsApp');
      }

      // Format groups for our database
      const formattedGroups = groups.map(group => ({
        nome_grupo: group.subject || 'Sem nome',
        grupo_id_externo: group.id,
        usuario_id: parseInt(userId),
        ativo: true,
        participantes: group.participants?.length || 0,
        descricao: group.desc || null
      }));

      res.json({
        success: true,
        message: `${groups.length} grupos encontrados`,
        data: formattedGroups
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        throw new Error('Timeout ao buscar grupos. WhatsApp está demorando para responder.');
      }
      
      throw fetchError;
    }

  } catch (error) {
    console.log('=== EVOLUTION GROUPS ERROR ===');
    console.log('❌ Error message:', error.message);
    console.log('❌ Error name:', error.name);
    console.log('❌ Error code:', error.code);
    console.log('❌ Stack trace:', error.stack);
    console.log('=== END ERROR LOG ===');
    
    // Send more detailed error information
    let errorMessage = error.message;
    
    if (error.message.includes('Timeout') || error.message.includes('demorando')) {
      errorMessage = 'WhatsApp está demorando para responder. Verifique se está conectado e tente novamente.';
    } else if (error.message.includes('Falha ao buscar grupos')) {
      errorMessage = 'Não foi possível buscar os grupos. Verifique se o WhatsApp está conectado.';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Não foi possível conectar com a Evolution API. Verifique se está rodando.';
    } else if (error.name === 'AbortError') {
      errorMessage = 'Timeout ao conectar com Evolution API.';
    } else if (error.message.includes('EVOLUTION_API_URL')) {
      errorMessage = 'Evolution API URL não configurada no servidor.';
    } else if (error.message.includes('EVOLUTION_API_KEY')) {
      errorMessage = 'Evolution API Key não configurada no servidor.';
    }
    
    console.log('📤 Returning error:', errorMessage);
    
    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};