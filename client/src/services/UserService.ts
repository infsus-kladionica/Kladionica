import http from "../common/http-common";
import {IUser} from "../types/User";

const register = (data: IUser) => {
  return http.post<IUser>("/korisnik/registriraj", data);
};
const login = (data: IUser) => {
  return http.post<IUser>("/korisnik/prijava", data);
};

const UserService = {
    register,
    login
};

export default UserService;