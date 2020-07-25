import { errorResponse } from '../helpers';
import { getConnection, getCommonConnection } from '../models';
import jwt from 'jsonwebtoken';

const apiAuth = async (req, res, next) => {
  if (!(req.headers && req.headers.authorization)) {
    return errorResponse(req, res, 'Token is not provided', 401);
  }
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    let user;
    if (req.user.role && (req.user.role === 'iW4vTGhA' || req.user.role === 'uOT1CH1t')) {
      if (req.user.role === 'uOT1CH1t') {
        req.query.slug = decoded.user.slug;
      }
      user = await getCommonConnection().users.findOne({
        where: { id: req.user.userId },
      });
    } else {
      req.query.slug = decoded.user.slug;
      const db = await getConnection(req);
      user = await db.users.findOne({
        where: { id: req.user.userId },
      });
    }
    if (!user) {
      return errorResponse(req, res, 'User is not found in system', 401);
    }
    return next();
  } catch (error) {
    switch (error.message) {
      case 'Connection is not set for given slug.' || 'Please provide tenant\'s slug to connect.':
        return errorResponse(
          req,
          res,
          error.message,
          500,
        );
      default:
        return errorResponse(
          req,
          res,
          'Incorrect token is provided, try re-login',
          401,
        );
    }
  }
};

export default apiAuth;
