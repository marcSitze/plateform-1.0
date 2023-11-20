import { User } from '../models/Users';
import { CreateUserDTO } from '../dto/user.dto';
import { encryptPassword } from '../common/auth';
import { IUserService } from '../interfaces/users/user.service.interface';

export default class UserService implements IUserService {
  constructor(){}
  createUser = async (user: CreateUserDTO) => {
    user.password = await encryptPassword(user.password);
    let newUser = new User(user);
    return await newUser.save();
  };
  getUsers = async (query: any) => {
    return await User.find(query).select('-password').sort({ createdAt: -1});
  };
  findOne = async (query: any) => {
    return await User.findOne(query);
  };
  getUserById = async (id: string) => {
    return await User.findById(id).select('-password');;
  };
  // findOneByQuery: async (query) => {
  //   return await User.findOne(query);
  // },
  findUsersByQuery = async (query: any) => {
    return await User.find(query).select('-password').sort({ createdAt: -1 });
  };
  // findUserById: async (id) => {
  //   return await User.findById(id).select('-password');
  // },
  // findUserByQuery: async (query) => {
  //   return await User.find(query).select('-password');
  // },
  // findUsers: async () => {
  //   return await User.find({});
  // },
  updateUser = async (id: string, query: any) => {
    return await User.findOneAndUpdate({ _id: id}, query);
  }
}

// await User.updateOne(
//   { _id: userId },
//   { $set: { password: hash } },
//   { new: true }
// );