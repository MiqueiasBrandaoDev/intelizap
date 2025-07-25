import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';
import { generateToken } from '../middleware/auth.js';

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    console.log('🔐 Login attempt:', { email, senha: senha ? '***' : 'empty' });

    if (!email || !senha) {
      console.log('❌ Missing email or senha');
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }

    // Buscar usuário pelo email
    const users = await query(
      `SELECT id, nome, email, senha, instancia, plano_ativo, max_grupos, tokens_mes, \`dia-renovacao-tokens\`,
              horaResumo, resumoDiaAnterior, transcricao_ativa, \`transcricao-pvd\`, 
              transcreverEu, ambiente, \`key-openai\`, ludico, 
              agendamento, criado_em 
       FROM usuarios 
       WHERE email = ?`,
      [email]
    );

    console.log('🔍 Found users:', users.length);
    
    if (users.length === 0) {
      console.log('❌ User not found for email:', email);
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    const user = users[0];
    console.log('✅ User found:', { id: user.id, nome: user.nome, email: user.email });

    // Como você mencionou que precisa acessar todas as contas,
    // vamos verificar a senha diretamente (sem hash)
    // EM PRODUÇÃO: usar bcrypt.compare(senha, user.senha)
    console.log('🔍 Checking password:', { provided: senha, stored: user.senha });
    if (senha !== user.senha) {
      console.log('❌ Wrong password');
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    console.log('✅ Password correct, generating token');

    // Gerar token JWT
    const token = generateToken(user.id);

    // Remover senha da resposta
    const { senha: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        user: userWithoutPassword,
        token
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const register = async (req, res) => {
  try {
    const { nome, email, senha, instancia } = req.body;

    if (!nome || !email || !senha || !instancia) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    // Verificar se email já existe
    const existingUsers = await query(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email já está em uso'
      });
    }

    // Criar novo usuário
    const result = await query(
      `INSERT INTO usuarios 
       (nome, email, senha, instancia, plano_ativo, horaResumo, 
        resumoDiaAnterior, transcricao_ativa, \`transcricao-pvd\`, 
        transcreverEu, ambiente, \`key-openai\`, ludico, agendamento) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nome, email, senha, instancia, 
        true, '09:00:00', false, true, true, false, 'prod', '', false, true
      ]
    );

    // Buscar usuário criado
    const newUsers = await query(
      `SELECT id, nome, email, instancia, plano_ativo, horaResumo, 
              resumoDiaAnterior, transcricao_ativa, \`transcricao-pvd\`, 
              transcreverEu, ambiente, \`key-openai\`, ludico, agendamento, criado_em 
       FROM usuarios 
       WHERE id = ?`,
      [result.insertId]
    );

    const newUser = newUsers[0];
    const token = generateToken(newUser.id);

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: {
        user: newUser,
        token
      }
    });

  } catch (error) {
    console.error('❌ Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};