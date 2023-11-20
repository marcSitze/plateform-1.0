import Account from "../models/Account";
import { AccountDTO } from "../dto/account.dto";
import { IAccountService } from "../interfaces/account/account.service.interface";

export default class AccountService implements IAccountService {
  constructor() {}
  createAccount = async (account: AccountDTO) => {
    const newAccount = new Account(account);
    return await newAccount.save();
  };
  getAccounts = async (query: any) => {
    return await Account.find(query)
      .populate("user", { password: 0, __v: 0 })
      .populate({
        path: "posts",
        populate: { path: "media", select: "path photo.contentType" },
      });
  };
  findOne = async (query: any) => {
    // console.log("query: ", query);
    return await Account.findOne(query)
      .populate("posts")
      .populate("user", { password: 0, __v: 0 })
      .populate({
        path: "posts",
        populate: { path: "media", select: "path photo.contentType" },
      });
  };
  getAccountById = async (id: string) => {
    return await Account.findById(id)
      .populate("user", { password: 0, __v: 0 })
      .populate({
        path: "posts",
        populate: { path: "media", select: "path photo.contentType" },
      });
  };
  // findAccountByQuery: async (query) => {
  //   return await Account.find(query).populate('user').select('-password');
  // },
  updateAccount = async (
    filter: Partial<AccountDTO>,
    query: Partial<AccountDTO>
  ) => {
    console.log("Account updated...");
    return await Account.findOneAndUpdate(filter, query);
  };
}
