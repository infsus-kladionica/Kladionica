export interface IUser {
    id?: string,
    korisnicko_ime: string,
    sifra: string,
    saldo?: number
    isAdmin: boolean
}

export const emptyUser: IUser = ({
    id: "",
    korisnicko_ime: "",
    sifra: "",
    saldo: 0,
    isAdmin: false
});