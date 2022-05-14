import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Container, Form } from "react-bootstrap";

import KorisnikService from "../services/KorisnikService";
import IKorisnik from "../types/Korisnik";

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IKorisnik>();
  const onSubmit: SubmitHandler<IKorisnik> = data => {
    KorisnikService.register(data)
  }

  console.log(watch("korisnicko_ime")) // watch input value by passing the name of it

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("korisnicko_ime", { required: true })} />
      {errors.korisnicko_ime && <span>Ovo polje je obavezno</span>}
      <input {...register("sifra", { required: true })} />
      {errors.sifra && <span>Ovo polje je obavezno</span>}
      <input type="submit" />
    </form>
  );
};