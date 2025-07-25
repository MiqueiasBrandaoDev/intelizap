import { query } from '../config/database.js';

export const getMensagens = async (req, res) => {
  try {
    const { grupo_id, page = 1, limit = 100 } = req.query;
    const offset = (page - 1) * limit;

    if (!grupo_id) {
      return res.status(400).json({
        success: false,
        message: 'grupo_id é obrigatório'
      });
    }

    // Verificar se grupo existe
    const grupos = await query('SELECT id FROM grupos WHERE id = ?', [grupo_id]);
    if (grupos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Grupo não encontrado'
      });
    }

    // Buscar mensagens com paginação
    const mensagens = await query(
      `SELECT id, grupo_id, usuario_id, mensagem, data_mensagem, 
              \`nome-autor\`, \`numero-autor\`
       FROM mensagens 
       WHERE grupo_id = ? 
       ORDER BY data_mensagem DESC 
       LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`,
      [parseInt(grupo_id)]
    );

    // Contar total de mensagens
    const totalResult = await query(
      'SELECT COUNT(*) as total FROM mensagens WHERE grupo_id = ?',
      [parseInt(grupo_id)]
    );

    const total = totalResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: mensagens.reverse(), // Mostrar mais recentes primeiro
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages
      }
    });

  } catch (error) {
    console.error('❌ Get mensagens error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const createMensagem = async (req, res) => {
  try {
    const { 
      grupo_id, 
      usuario_id, 
      mensagem, 
      data_mensagem,
      'nome-autor': nomeAutor,
      'numero-autor': numeroAutor
    } = req.body;

    if (!grupo_id || !usuario_id || !mensagem || !nomeAutor || !numeroAutor) {
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios: grupo_id, usuario_id, mensagem, nome-autor, numero-autor'
      });
    }

    // Verificar se grupo existe
    const grupos = await query('SELECT id FROM grupos WHERE id = ?', [grupo_id]);
    if (grupos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Grupo não encontrado'
      });
    }

    // Verificar se usuário existe
    const usuarios = await query('SELECT id FROM usuarios WHERE id = ?', [usuario_id]);
    if (usuarios.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Usar data atual se não fornecida
    const dataFinal = data_mensagem || new Date();

    // Criar mensagem
    const result = await query(
      `INSERT INTO mensagens 
       (grupo_id, usuario_id, mensagem, data_mensagem, \`nome-autor\`, \`numero-autor\`) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [grupo_id, usuario_id, mensagem, dataFinal, nomeAutor, numeroAutor]
    );

    // Buscar mensagem criada
    const newMensagens = await query(
      `SELECT id, grupo_id, usuario_id, mensagem, data_mensagem, 
              \`nome-autor\`, \`numero-autor\`
       FROM mensagens 
       WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Mensagem criada com sucesso',
      data: newMensagens[0]
    });

  } catch (error) {
    console.error('❌ Create mensagem error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const deleteMensagem = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se mensagem existe
    const existingMensagens = await query('SELECT id FROM mensagens WHERE id = ?', [id]);
    if (existingMensagens.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Mensagem não encontrada'
      });
    }

    // Deletar mensagem
    await query('DELETE FROM mensagens WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Mensagem deletada com sucesso'
    });

  } catch (error) {
    console.error('❌ Delete mensagem error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};