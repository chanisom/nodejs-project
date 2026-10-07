export const authMiddleware = (req, res, next) => {
  console.log(`🔒 Auth middleware נקרא עבור: ${req.method} ${req.originalUrl}`);

  const authKey = req.headers['auth-key'];
  const VALID_AUTH_KEY = process.env.AUTH_KEY; 

  if (authKey !== VALID_AUTH_KEY) {
    return res.status(401).json({ error: 'חסר או שגוי auth-key header' });
  }

  next();
};