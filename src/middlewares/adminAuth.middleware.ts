import { Request, Response, NextFunction } from "express";

// Extend the Request type to include the `user` property
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    username: string;
    role: string;
  };
}

/**
 * Middleware to enforce admin authorization.
 * Assumes that `authMiddleware` has already added a `user` object to the `req` object.
 */
export const adminAuthMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Check if the user is authenticated and has an admin role
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }

  // User is an admin, proceed to the next middleware or route handler
  next();
};
