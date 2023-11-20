import { Request, Response } from "express";
import mongoose from "mongoose";
import AccountService from "../services/account.service";
import { SuccessHandler, ErrorHandler } from "../common/response.handler";

import { AccountDTO } from "../dto/account.dto";
import constants from "../common/constants";
const { httpStatus } = constants;

const accountService = new AccountService();

export const getAccount = async (req: any, res: Response) => {
  try {
    console.log("req.token: ", req.token);
    // const user = req.user.id;
    let account: any;
    if(req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {
       account = await accountService.findOne({_id: req.params.id});
       console.log('Here')
    }else{
      account = await accountService.findOne({ user: req.user.id });
      console.log('Below')
    }
    // const account = await accountService.findOne({_id: req.params.id});
    // console.log('accountS: ', account)
    if (!account) {
      return ErrorHandler(res, httpStatus.NOT_FOUND, { msg: "User not found" });
    }

    return SuccessHandler(res, httpStatus.OK, account);
  } catch (err) {
    console.log(err);
    return ErrorHandler(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }
};

export const updateAccount = async (req: any, res: Response) => {
  const query: Partial<AccountDTO> = req.body;
  try {
    const account = await accountService.getAccountById(req.params.id);
    if (!account) {
      return ErrorHandler(res, httpStatus.NOT_FOUND, "User not found");
    }
    await accountService.updateAccount(req.params.id, query);
    SuccessHandler(res, httpStatus.OK, "account updated successfully");
  } catch (err) {
    console.error(err);
    ErrorHandler(res, httpStatus.INTERNAL_SERVER_ERROR, "Something went wrong");
  }
};

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const accounts = await accountService.getAccounts({});
    if (accounts.length === 0) {
      return ErrorHandler(res, httpStatus.NO_CONTENT, "No accounts yet");
    }
    SuccessHandler(res, httpStatus.OK, accounts);
  } catch (err) {
    console.error(err);
  }
};

export const getAccountsByQuery = async (req: Request, res: Response) => {
  try {
    // const accountId = req.query.accountId;
    let query: any = {
      ...req.query
    }
    const accounts = await accountService.getAccounts(query);

    if (!accounts) {
      return ErrorHandler(res, httpStatus.NOT_FOUND, { msg: "User not found" });
    }

    return SuccessHandler(res, httpStatus.OK, accounts);
  } catch (err) {
    console.log(err);
    return ErrorHandler(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }
}