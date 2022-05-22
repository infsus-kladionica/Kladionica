import http from "../common/http-common";
import {IUser} from "../types/User";

const register = (data: IUser) => {
  return http.post<IUser>("/user/register", data);
};
const login = (data: IUser) => {
  return http.post<IUser>("/user/login", data);
};

const UserService = {
    register,
    login
};

export default UserService;