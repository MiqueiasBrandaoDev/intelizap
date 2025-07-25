import { getConnection } from '../config/database.js';

export const getDashboardStats = async (req, res) => {
  try {
    const { usuario_id } = req.query;
    
    if (!usuario_id) {
      return res.status(400).json({
        success: false,
        message: 'usuario_id é obrigatório'
      });
    }

    const connection = getConnection();

    const userId = parseInt(usuario_id);

    // Get total groups for user
    const [totalGroupsResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM grupos WHERE usuario_id = ?',
      [userId]
    );
    
    // Get active groups for user
    const [activeGroupsResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM grupos WHERE usuario_id = ? AND ativo = 1',
      [userId]
    );
    
    // Get total resumes for user
    const [totalResumesResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM resumos WHERE usuario_id = ?',
      [userId]
    );
    
    // Get total messages processed for user
    const [messagesProcessedResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM mensagens WHERE usuario_id = ?',
      [userId]
    );
    
    // Get resumes created today
    const [resumosHojeResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM resumos WHERE usuario_id = ? AND DATE(data_criacao) = CURDATE()',
      [userId]
    );
    
    // Get messages created today
    const [mensagensHojeResult] = await connection.execute(
      'SELECT COUNT(*) as count FROM mensagens WHERE usuario_id = ? AND DATE(data_mensagem) = CURDATE()',
      [userId]
    );

    const stats = {
      totalGroups: totalGroupsResult[0].count,
      activeGroups: activeGroupsResult[0].count,
      totalResumes: totalResumesResult[0].count,
      messagesProcessed: messagesProcessedResult[0].count,
      resumosHoje: resumosHojeResult[0].count,
      mensagensHoje: mensagensHojeResult[0].count
    };

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Erro ao buscar estatísticas do dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const { usuario_id, limit = '5' } = req.query;
    
    if (!usuario_id) {
      return res.status(400).json({
        success: false,
        message: 'usuario_id é obrigatório'
      });
    }

    const connection = getConnection();

    // Get recent resume activity with group names using literal query
    const activitySql = `SELECT 
        r.id,
        g.nome_grupo as grupo_nome,
        r.data_envio,
        r.status,
        r.data_criacao,
        r.total_mensagens
      FROM resumos r 
      JOIN grupos g ON r.grupo_id = g.id 
      WHERE r.usuario_id = ${parseInt(usuario_id)}
      ORDER BY 
        COALESCE(r.data_envio, r.data_criacao) DESC 
      LIMIT ${parseInt(limit)}`;
    
    const [activities] = await connection.execute(activitySql);

    // Format the data
    const formattedActivities = activities.map(activity => ({
      id: activity.id,
      grupo_nome: activity.grupo_nome || 'Grupo sem nome',
      data_envio: activity.data_envio || activity.data_criacao,
      status: activity.status,
      total_mensagens: activity.total_mensagens || 0,
      type: 'resumo'
    }));

    res.json({
      success: true,
      data: formattedActivities
    });

  } catch (error) {
    console.error('Erro ao buscar atividade recente:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const getSystemInsights = async (req, res) => {
  try {
    const { usuario_id } = req.query;
    
    if (!usuario_id) {
      return res.status(400).json({
        success: false,
        message: 'usuario_id é obrigatório'
      });
    }

    const connection = getConnection();
    const userId = parseInt(usuario_id);

    // Get most active group
    const [mostActiveGroup] = await connection.execute(
      `SELECT g.nome_grupo, COUNT(m.id) as total_mensagens 
       FROM grupos g 
       LEFT JOIN mensagens m ON g.id = m.grupo_id 
       WHERE g.usuario_id = ? 
       GROUP BY g.id, g.nome_grupo 
       ORDER BY total_mensagens DESC 
       LIMIT 1`,
      [userId]
    );

    // Get average messages per day in last 7 days
    const [avgMessagesPerDay] = await connection.execute(
      `SELECT ROUND(COUNT(*) / 7, 1) as media_diaria
       FROM mensagens 
       WHERE usuario_id = ? 
       AND data_mensagem >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`,
      [userId]
    );

    // Get last resume sent time
    const [lastResumeTime] = await connection.execute(
      `SELECT data_envio, g.nome_grupo
       FROM resumos r
       JOIN grupos g ON r.grupo_id = g.id
       WHERE r.usuario_id = ? AND r.data_envio IS NOT NULL
       ORDER BY r.data_envio DESC
       LIMIT 1`,
      [userId]
    );

    // Get productivity score based on resumos vs groups ratio
    const [productivity] = await connection.execute(
      `SELECT 
        COUNT(DISTINCT g.id) as grupos_ativos,
        COUNT(DISTINCT r.id) as resumos_gerados,
        ROUND(
          CASE 
            WHEN COUNT(DISTINCT g.id) = 0 THEN 0
            ELSE (COUNT(DISTINCT r.id) / COUNT(DISTINCT g.id)) * 100
          END
        ) as score_produtividade
       FROM grupos g
       LEFT JOIN resumos r ON g.id = r.grupo_id AND r.data_criacao >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
       WHERE g.usuario_id = ? AND g.ativo = 1`,
      [userId]
    );

    const insights = {
      mostActiveGroup: mostActiveGroup[0]?.nome_grupo || 'Nenhum grupo ativo',
      mostActiveGroupMessages: mostActiveGroup[0]?.total_mensagens || 0,
      avgMessagesPerDay: parseFloat(avgMessagesPerDay[0]?.media_diaria) || 0,
      lastResumeTime: lastResumeTime[0]?.data_envio || null,
      lastResumeGroup: lastResumeTime[0]?.nome_grupo || null,
      productivityScore: productivity[0]?.score_produtividade || 0,
      activeGroups: productivity[0]?.grupos_ativos || 0,
      resumesGenerated: productivity[0]?.resumos_gerados || 0
    };

    res.json({
      success: true,
      data: insights
    });

  } catch (error) {
    console.error('Erro ao buscar insights do sistema:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};