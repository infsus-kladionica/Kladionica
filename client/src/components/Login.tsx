import React from "react";
import {useNavigate} from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import KorisnikService from "../services/KorisnikService";
import IKorisnik from "../types/Korisnik";

export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IKorisnik>();
  const onSubmit: SubmitHandler<IKorisnik> = data => {
    KorisnikService.login(data)
        .then(() => (navigate('/home')));
  }

  console.log(watch("korisnicko_ime")) // watch input value by passing the name of it

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("korisnicko_ime", { required: true })} />
      {errors.korisnicko_ime && <span>Ovo polje je obavezno</span>}
      <input {...register("sifra", { required: true })} />
      {errors.sifra && <span>Ovo polje je obavezno</span>}
      <input type="submit" />
    </form>
  );
};