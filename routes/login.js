import express from 'express';
import * as loginController from '../controllers/login/login';

const router = express.Router();

router.post(
  '/login',
  loginController.login,
);

router.post(
  '/register',
  loginController.register,
);

module.exports = router;