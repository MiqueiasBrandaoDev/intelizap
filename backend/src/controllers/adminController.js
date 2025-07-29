import { getConnection } from '../config/database.js';

// Get dashboard stats for admin
export const getAdminStats = async (req, res) => {
  try {
    const connection = getConnection();

    // Get total users
    const [totalUsersResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM usuarios'
    );

    // Get active users (users with groups)
    const [activeUsersResult] = await connection.execute(
      `SELECT COUNT(DISTINCT usuario_id) as total 
       FROM grupos WHERE ativo = true`
    );

    // Get total groups
    const [totalGroupsResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM grupos'
    );

    // Get total resumos
    const [totalResumosResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM resumos'
    );

    // Get resumos today
    const [resumosHojeResult] = await connection.execute(
      `SELECT COUNT(*) as total FROM resumos 
       WHERE DATE(data_envio) = CURDATE()`
    );

    // Get users by plan status
    const [planStatsResult] = await connection.execute(
      `SELECT 
         plano_ativo,
         COUNT(*) as total 
       FROM usuarios 
       GROUP BY plano_ativo`
    );

    const stats = {
      totalUsers: totalUsersResult[0].total,
      activeUsers: activeUsersResult[0].total,
      totalGroups: totalGroupsResult[0].total,
      totalResumos: totalResumosResult[0].total,
      resumosToday: resumosHojeResult[0].total,
      planStats: planStatsResult
    };

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('❌ Get admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Get all users for admin management
export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const connection = getConnection();

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const offset = (pageNum - 1) * limitNum;

    let whereClause = '1=1';
    let queryParams = [];

    if (search) {
      whereClause += ' AND (nome LIKE ? OR email LIKE ? OR instancia LIKE ?)';
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
    }

    // Get total count
    const [countResult] = await connection.execute(
      `SELECT COUNT(*) as total FROM usuarios WHERE ${whereClause}`,
      queryParams
    );

    // Get users with additional stats
    const [users] = await connection.execute(`
      SELECT 
        u.id,
        u.nome,
        u.email,
        u.instancia,
        u.plano_ativo,
        u.horaResumo,
        u.created_at,
        u.updated_at,
        COUNT(DISTINCT g.id) as total_grupos,
        COUNT(DISTINCT r.id) as total_resumos
      FROM usuarios u
      LEFT JOIN grupos g ON u.id = g.usuario_id AND g.ativo = true
      LEFT JOIN resumos r ON u.id = r.usuario_id
      WHERE ${whereClause}
      GROUP BY u.id
      ORDER BY u.created_at DESC
      LIMIT ${limitNum} OFFSET ${offset}
    `, queryParams);

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: total,
        totalPages: totalPages
      }
    });

  } catch (error) {
    console.error('❌ Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Update user plan status
export const updateUserPlan = async (req, res) => {
  try {
    const { userId } = req.params;
    const { plano_ativo } = req.body;

    if (typeof plano_ativo !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'plano_ativo deve ser boolean'
      });
    }

    const connection = getConnection();

    const [result] = await connection.execute(
      'UPDATE usuarios SET plano_ativo = ?, updated_at = NOW() WHERE id = ?',
      [plano_ativo, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      message: `Plano ${plano_ativo ? 'ativado' : 'desativado'} com sucesso`
    });

  } catch (error) {
    console.error('❌ Update user plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Get system activity logs
export const getSystemLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const connection = getConnection();

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 50;
    const offset = (pageNum - 1) * limitNum;

    // Get recent resumos as activity logs
    const [logs] = await connection.execute(`
      SELECT 
        r.id,
        r.status,
        r.data_envio,
        r.total_mensagens,
        u.nome as usuario_nome,
        u.email as usuario_email,
        g.nome_grupo
      FROM resumos r
      JOIN usuarios u ON r.usuario_id = u.id
      JOIN grupos g ON r.grupo_id = g.id
      ORDER BY r.data_envio DESC
      LIMIT ${limitNum} OFFSET ${offset}
    `);

    // Get total count
    const [countResult] = await connection.execute(
      'SELECT COUNT(*) as total FROM resumos'
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: logs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: total,
        totalPages: totalPages
      }
    });

  } catch (error) {
    console.error('❌ Get system logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};