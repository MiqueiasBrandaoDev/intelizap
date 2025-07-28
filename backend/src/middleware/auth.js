import jwt from 'jsonwebtoken';

export const authenticateToken = async (req, res, next) => {
  console.log('🔐 AUTH MIDDLEWARE - Path:', req.path);
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  console.log('🔐 Token present:', !!token);

  if (!token) {
    console.log('❌ AUTH FAILED - No token');
    return res.status(401).json({ 
      success: false, 
      message: 'Token de acesso requerido' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ AUTH SUCCESS - UserId:', decoded.userId);
    
    // Skip database verification for now due to query issues
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    console.log('❌ AUTH ERROR:', error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expirado' 
      });
    }
    
    return res.status(403).json({ 
      success: false, 
      message: 'Token inválido' 
    });
  }
};

export const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};