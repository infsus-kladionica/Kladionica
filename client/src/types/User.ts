export interface IUser {
    id?: string,
    korisnicko_ime: string,
    sifra: string,
    saldo?: number,
    je_admin: boolean
}

export const emptyUser: IUser = ({
    id: "",
    korisnicko_ime: "",
    sifra: "",
    saldo: 0,
    je_admin: false
});