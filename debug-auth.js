// Simple debug script to test authentication
const testAuth = async () => {
  try {
    console.log('=== Testando Registro ===');
    
    // Test register first
    const registerResponse = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        nome: 'Usuario Teste',
        email: 'teste@intelizap.com', 
        senha: '123456',
        instancia: 'teste-instance' 
      })
    });
    
    const registerData = await registerResponse.json();
    console.log('Register Response:', JSON.stringify(registerData, null, 2));
    
    if (!registerData.success) {
      console.log('\n=== Usuário já existe, testando Login ===');
    }
    
    // Test login with real user
    const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'miqueiasbrandaogyn@gmail.com', senha: '123' })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login Response:', JSON.stringify(loginData, null, 2));
    
    if (loginData.success && loginData.data?.token) {
      console.log('\n=== Testando getUser ===');
      
      // Test getUser
      const getUserResponse = await fetch(`http://localhost:3001/api/usuarios/${loginData.data.user.id}`, {
        headers: { 'Authorization': `Bearer ${loginData.data.token}` }
      });
      
      const userData = await getUserResponse.json();
      console.log('GetUser Response:', JSON.stringify(userData, null, 2));
      
      // Compare fields
      console.log('\n=== Comparação de Campos ===');
      const loginUser = loginData.data.user;
      const getUser = userData.data;
      
      const fields = ['transcricao_ativa', 'transcricao-pvd', 'transcreverEu', 'ludico', 'agendamento', 'key-openai'];
      fields.forEach(field => {
        const loginValue = loginUser[field];
        const getValue = getUser[field];
        const match = loginValue === getValue;
        console.log(`${field}: Login=${loginValue} | GetUser=${getValue} | Match=${match}`);
      });
    }
    
  } catch (error) {
    console.error('Erro:', error.message);
  }
};

testAuth();