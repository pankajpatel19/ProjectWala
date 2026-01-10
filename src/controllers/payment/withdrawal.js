import ApiError from "../../middleware/apiError.midllware.js";
import { catchAsync } from "../../middleware/catchAsync.middleware.js";
import Transaction from "../../models/transaction.model.js";
import User from "../../models/user.model.js";
import Withdrawal from "../../models/withdrawal.model.js";

export const WithdrawalRequest = catchAsync(async (req, res, next) => {
  try {
    const { amount, bankDetails } = req.body;
    const { id } = req.user;

    const user = await User.findById(id);
    if (user.balance < amount) {
      throw new ApiError("Insufficient balance", 400);
    }
    const pendingWithdrawal = await Withdrawal.findOne({
      seller_id: id,
      status: "Pending",
    });
    if (pendingWithdrawal) {
      throw new ApiError("Pending withdrawal request already exists", 400);
    }

    const withdrawal = await Withdrawal.create({
      seller_id: id,
      amount,
      bankDetails,
    });
    res.status(201).json({
      status: "success",
      data: withdrawal,
    });
  } catch (error) {
    next(error.message);
  }
});

export const approveWithdrawal = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    const payout = await Withdrawal.findById(id);

    if (!payout) {
      throw new ApiError("request not found", 404);
    }

    if (payout.status !== "Pending") {
      throw new ApiError("request already processed", 400);
    }
    if (status === "Completed") {
      const seller = await User.findById(payout.seller_id);
      if (!seller) {
        throw new ApiError("seller not found", 404);
      }
      if (seller.balance < payout.amount) {
        throw new ApiError("Insufficient balance", 400);
      }
      seller.balance -= payout.amount;
      await seller.save();

      await Transaction.create({
        user_id: payout.seller_id,
        amount: payout.amount,
        type: "debit",
        description: `Withdrawal approved ${payout.amount}`,
      });
    }
    payout.status = status;
    payout.adminNotes = adminNotes;
    await payout.save();
    res.status(200).json({
      status: "success",
      data: payout,
    });
  } catch (error) {
    console.error(error);
    next(error.message);
  }
});

export const getAllWithdrawals = catchAsync(async (req, res, next) => {
  try {
    const withdrawals = await Withdrawal.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      data: withdrawals,
    });
  } catch (error) {
    next(error.message);
  }
});
