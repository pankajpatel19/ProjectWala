import { Router } from "express";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
import { roleAccess } from "../middleware/roleAccess.middleware.js";
import {
  approveWithdrawal,
  getAllWithdrawals,
  WithdrawalRequest,
} from "../controllers/payment/withdrawal.js";
const withdrawalRouter = Router();

withdrawalRouter.post(
  "/withdraw/request",
  authMiddleware,
  roleAccess("seller"),
  WithdrawalRequest
);

withdrawalRouter.get(
  "withdraw/All_requests",
  authMiddleware,
  roleAccess("admin"),
  getAllWithdrawals
);
withdrawalRouter.patch(
  "/withdraw/approve/:id",
  authMiddleware,
  roleAccess("admin"),
  approveWithdrawal
);

export default withdrawalRouter;
