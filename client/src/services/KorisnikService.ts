import http from "../common/http-common";
import IKorisnik from "../types/Korisnik";

const register = (data: IKorisnik) => {
  return http.post<IKorisnik>("/korisnik/registriraj", data);
};
const login = (data: IKorisnik) => {
  return http.post<IKorisnik>("/korisnik/prijavi", data);
};

const KorisnikService = {
    register,
    login
};

export default KorisnikService;