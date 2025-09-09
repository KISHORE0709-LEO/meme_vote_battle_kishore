export const validateToken = (token: string): { userId: string } | null => {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    if (decoded.exp < Date.now()) return null;
    return { userId: decoded.userId };
  } catch (error) {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    return decoded.exp < Date.now();
  } catch (error) {
    return true;
  }
};

export const requireAuth = (token: string | null): boolean => {
  if (!token) return false;
  if (isTokenExpired(token)) return false;
  return validateToken(token) !== null;
};

export const requireAdmin = (token: string | null, userRole: string | undefined): boolean => {
  if (!requireAuth(token)) return false;
  return userRole === 'admin';
};