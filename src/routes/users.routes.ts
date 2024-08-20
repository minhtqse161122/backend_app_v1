import { UpdateMeReqBody } from '@/@types/request.type';
import {
    emailVerifyController,
    forgotPasswordController,
    getMeController,
    loginController,
    logoutController,
    registerController,
    resendEmailVerifyController,
    resetPasswordController,
    updateMeController,
    verifyForgotPasswordTokenController
} from '@/controllers/users.controllers';
import { filterMiddleware } from '@/middlewares/common.middleware';
import {
    accessTokenValidator,
    forgotPasswordValidator,
    loginValidator,
    refreshTokenValidator,
    registerValidator,
    requestLimiter,
    resetPasswordValidator,
    updateMeValidator,
    verifyEmailValidator,
    verifyForgotPasswordValidator,
    verifyUserValidator
} from '@/middlewares/users.middlewares';
import { asyncHandler } from '@/utils/async-handler';
import express from 'express';

const router = express.Router();

// [POST] /api/users/register
router.post('/register', requestLimiter, registerValidator, asyncHandler(registerController));

// [POST] /api/users/login
router.post('/login', requestLimiter, loginValidator, asyncHandler(loginController));

// [POST] /api/users/logout
router.post('/logout', requestLimiter, accessTokenValidator, refreshTokenValidator, asyncHandler(logoutController));

// [POST] /api/users/verify-email
router.post('/verify-email', requestLimiter, verifyEmailValidator, asyncHandler(emailVerifyController));

// [POST] /api/users/resend-verify-email
router.post('/resend-verify-email', requestLimiter, accessTokenValidator, asyncHandler(resendEmailVerifyController));

// [POST] /api/users/forgot-password
router.post('/forgot-password', requestLimiter, forgotPasswordValidator, asyncHandler(forgotPasswordController));

// [POST] /api/users/verify-forgot-password
router.post(
    '/verify-forgot-password',
    requestLimiter,
    verifyForgotPasswordValidator,
    verifyForgotPasswordTokenController
);

// [POST] /api/users/reset-password
router.post('/reset-password', requestLimiter, resetPasswordValidator, asyncHandler(resetPasswordController));

// [GET] /api/users/me
router.get('/me', accessTokenValidator, asyncHandler(getMeController));

// [PATCH] /api/users/me
router.patch(
    '/me',
    accessTokenValidator,
    verifyUserValidator,
    updateMeValidator,
    filterMiddleware<UpdateMeReqBody>(['avatar', 'bio', 'cover_photo', 'date_of_birth', 'location', 'name', 'website']),
    asyncHandler(updateMeController)
);

// Export
const usersRouters = router;
export default usersRouters;
