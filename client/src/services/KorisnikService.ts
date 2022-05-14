import http from "../common/http-common";
import IKorisnik from "../types/Korisnik";

const register = (data: IKorisnik) => {
  return http.post<IKorisnik>("/korisnik/registriraj", data);
};
const login = (data: IKorisnik) => {
  return http.post<IKorisnik>("/korisnik/prijava", data);
};

const KorisnikService = {
    register,
    login
};

export default KorisnikService;