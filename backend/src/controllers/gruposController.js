import { query } from '../config/database.js';

export const getGrupos = async (req, res) => {
  try {
    const { usuario_id, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    if (!usuario_id) {
      return res.status(400).json({
        success: false,
        message: 'usuario_id é obrigatório'
      });
    }

    // Buscar grupos com paginação
    const grupos = await query(
      `SELECT id, nome_grupo, grupo_id_externo, usuario_id, ativo, criado_em 
       FROM grupos 
       WHERE usuario_id = ? 
       ORDER BY criado_em DESC 
       LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`,
      [parseInt(usuario_id)]
    );

    // Contar total de grupos
    const totalResult = await query(
      'SELECT COUNT(*) as total FROM grupos WHERE usuario_id = ?',
      [parseInt(usuario_id)]
    );

    const total = totalResult[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: grupos,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages
      }
    });

  } catch (error) {
    console.error('❌ Get grupos error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const getGrupo = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar grupo
    const grupos = await query(
      `SELECT id, nome_grupo, grupo_id_externo, usuario_id, ativo, criado_em 
       FROM grupos 
       WHERE id = ?`,
      [id]
    );

    if (grupos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Grupo não encontrado'
      });
    }

    // Buscar mensagens do grupo (últimas 100)
    const mensagens = await query(
      `SELECT id, grupo_id, usuario_id, mensagem, data_mensagem, 
              \`nome-autor\`, \`numero-autor\`
       FROM mensagens 
       WHERE grupo_id = ? 
       ORDER BY data_mensagem DESC 
       LIMIT 100`,
      [parseInt(id)]
    );

    const grupo = {
      ...grupos[0],
      mensagens: mensagens.reverse() // Mostrar mensagens em ordem cronológica
    };

    res.json({
      success: true,
      data: grupo
    });

  } catch (error) {
    console.error('❌ Get grupo error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const createGrupo = async (req, res) => {
  try {
    const { nome_grupo, grupo_id_externo, usuario_id, ativo = true } = req.body;

    if (!nome_grupo || !usuario_id) {
      return res.status(400).json({
        success: false,
        message: 'nome_grupo e usuario_id são obrigatórios'
      });
    }

    // Verificar se usuário existe e obter limite de grupos
    const users = await query('SELECT id, max_grupos FROM usuarios WHERE id = ?', [usuario_id]);
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    const user = users[0];
    const maxGrupos = user.max_grupos || 0;

    // Verificar quantos grupos o usuário já possui
    const gruposAtivos = await query(
      'SELECT COUNT(*) as total FROM grupos WHERE usuario_id = ?', 
      [usuario_id]
    );
    const totalGrupos = gruposAtivos[0].total;

    // Verificar se já atingiu o limite
    if (totalGrupos >= maxGrupos) {
      return res.status(400).json({
        success: false,
        message: `Limite de grupos atingido. Você pode ter no máximo ${maxGrupos} grupos.`,
        code: 'LIMIT_EXCEEDED',
        limits: {
          current: totalGrupos,
          maximum: maxGrupos
        }
      });
    }

    // Criar grupo com timezone de São Paulo
    const now = new Date().toLocaleString('en-CA', { 
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(', ', ' ');

    const result = await query(
      `INSERT INTO grupos (nome_grupo, grupo_id_externo, usuario_id, ativo, criado_em) 
       VALUES (?, ?, ?, ?, ?)`,
      [nome_grupo, grupo_id_externo, usuario_id, ativo, now]
    );

    // Buscar grupo criado
    const newGrupos = await query(
      `SELECT id, nome_grupo, grupo_id_externo, usuario_id, ativo, criado_em 
       FROM grupos 
       WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Grupo criado com sucesso',
      data: newGrupos[0]
    });

  } catch (error) {
    console.error('❌ Create grupo error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const updateGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome_grupo, grupo_id_externo, ativo } = req.body;

    // Verificar se grupo existe
    const existingGrupos = await query('SELECT id FROM grupos WHERE id = ?', [id]);
    if (existingGrupos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Grupo não encontrado'
      });
    }

    // Construir query de update
    const updates = [];
    const values = [];

    if (nome_grupo !== undefined) {
      updates.push('nome_grupo = ?');
      values.push(nome_grupo);
    }
    if (grupo_id_externo !== undefined) {
      updates.push('grupo_id_externo = ?');
      values.push(grupo_id_externo);
    }
    if (ativo !== undefined) {
      updates.push('ativo = ?');
      values.push(ativo);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum campo para atualizar'
      });
    }

    values.push(id);

    await query(`UPDATE grupos SET ${updates.join(', ')} WHERE id = ?`, values);

    // Buscar grupo atualizado
    const updatedGrupos = await query(
      `SELECT id, nome_grupo, grupo_id_externo, usuario_id, ativo, criado_em 
       FROM grupos 
       WHERE id = ?`,
      [id]
    );

    res.json({
      success: true,
      message: 'Grupo atualizado com sucesso',
      data: updatedGrupos[0]
    });

  } catch (error) {
    console.error('❌ Update grupo error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const deleteGrupo = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se grupo existe
    const existingGrupos = await query('SELECT id FROM grupos WHERE id = ?', [id]);
    if (existingGrupos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Grupo não encontrado'
      });
    }

    // Deletar grupo (CASCADE vai deletar mensagens relacionadas)
    await query('DELETE FROM grupos WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Grupo deletado com sucesso'
    });

  } catch (error) {
    console.error('❌ Delete grupo error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};