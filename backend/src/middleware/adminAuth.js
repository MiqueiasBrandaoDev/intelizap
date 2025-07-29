import { getConnection } from '../config/database.js';

export const authenticateAdmin = async (req, res, next) => {
  try {
    const { userId } = req.user;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }

    const connection = getConnection();
    
    // Check if user exists and has admin privileges
    const [userResult] = await connection.execute(
      'SELECT id, nome, email, is_admin FROM usuarios WHERE id = ?',
      [userId]
    );

    if (userResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    const user = userResult[0];

    // Check if user is admin
    if (!user.is_admin) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado. Privilégios de administrador necessários.'
      });
    }

    // Add admin user info to request
    req.admin = user;
    next();

  } catch (error) {
    console.error('❌ Admin auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};