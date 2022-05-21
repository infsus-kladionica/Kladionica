import React from "react";
import {useNavigate} from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import UserService from "../services/UserService";
import {IUser} from "../types/User";

type LoginProps = {
    updateUser: (arg: IUser) => void
};

const Login: React.FC<LoginProps> = (props) => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IUser>();
  const onSubmit: SubmitHandler<IUser> = data => {
    UserService.login(data).then((response) => {
        props.updateUser(response.data);
        navigate('/');
    });
  }

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

export default Login;