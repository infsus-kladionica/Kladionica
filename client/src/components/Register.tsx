import React from "react";
import {useNavigate} from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Container, Form } from "react-bootstrap";

import UserService from "../services/UserService";
import {IUser} from "../types/User";

type RegisterProps = {
    updateUser: (arg: IUser) => void
};

const Register: React.FC<RegisterProps> = (props) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IUser>();
  const onSubmit: SubmitHandler<IUser> = data => {
    UserService.register(data).then((response) => {
        props.updateUser(response.data);
        navigate('/');
    });
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

export default Register;