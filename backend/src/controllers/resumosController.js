import { getConnection } from '../config/database.js';

export const getResumos = async (req, res) => {
  try {
    const { 
      usuario_id, 
      page = 1, 
      limit = 20,
      data_inicio,
      data_fim,
      grupo_id,
      status
    } = req.query;

    if (!usuario_id) {
      return res.status(400).json({
        success: false,
        message: 'usuario_id é obrigatório'
      });
    }

    const connection = getConnection();
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const offset = (pageNum - 1) * limitNum;

    // Build WHERE clause
    let whereClause = 'WHERE r.usuario_id = ?';
    let queryParams = [usuario_id];

    if (data_inicio) {
      whereClause += ' AND r.data_criacao >= ?';
      queryParams.push(data_inicio);
    }

    if (data_fim) {
      whereClause += ' AND r.data_criacao <= ?';
      queryParams.push(data_fim);
    }

    if (grupo_id) {
      whereClause += ' AND r.grupo_id = ?';
      queryParams.push(grupo_id);
    }

    if (status) {
      whereClause += ' AND r.status = ?';
      queryParams.push(status);
    }

    // Use direct query without parameters for LIMIT and OFFSET to avoid MySQL2 issues
    const sql = `SELECT COUNT(*) as total FROM resumos r WHERE r.usuario_id = ${parseInt(usuario_id)}`;
    const [countResult] = await connection.execute(sql);

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limitNum);

    // Get resumos with group info using literal query
    const resumosSql = `SELECT 
        r.id,
        r.usuario_id,
        r.grupo_id,
        r.conteudo,
        r.data_criacao,
        r.data_envio,
        r.status,
        r.total_mensagens,
        g.nome_grupo
      FROM resumos r
      JOIN grupos g ON r.grupo_id = g.id
      WHERE r.usuario_id = ${parseInt(usuario_id)}
      ORDER BY r.data_criacao DESC
      LIMIT ${limitNum} OFFSET ${offset}`;
    
    const [resumos] = await connection.execute(resumosSql);

    // Format the response
    const formattedResumos = resumos.map(resumo => ({
      id: resumo.id,
      usuario_id: resumo.usuario_id,
      grupo_id: resumo.grupo_id,
      conteudo: resumo.conteudo,
      data_criacao: resumo.data_criacao,
      data_envio: resumo.data_envio,
      status: resumo.status,
      total_mensagens: resumo.total_mensagens,
      grupo: {
        id: resumo.grupo_id,
        nome_grupo: resumo.nome_grupo
      }
    }));

    res.json({
      success: true,
      data: formattedResumos,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: total,
        totalPages: totalPages
      }
    });

  } catch (error) {
    console.error('Erro ao buscar resumos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const createResumo = (req, res) => {
  res.json({
    success: true,
    message: 'Função não implementada'
  });
};

export const gerarResumo = (req, res) => {
  res.json({
    success: true,
    message: 'Função não implementada'
  });
};