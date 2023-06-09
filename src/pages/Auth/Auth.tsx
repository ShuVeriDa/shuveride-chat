import {FC} from 'react';
import styles from './Auth.module.scss';
import stylesInput from '../../components/Input/Input.module.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import logo from '../../assets/logo.png'

import {SubmitButton} from "../../components/SubmitButton/SubmitButton";
import {IAuthInputType} from "../../types/auth.interface.ts";
import {useNavigate} from "react-router-dom";
import {Input} from "../../components/Input/Input.tsx";

interface ILoginProps {
  idInstance: string
  apiTokenInstance: string
  setIdInstance: (idInstance: string) => void
  setApiTokenInstance: (apiTokenInstance: string) => void
}

export const Auth: FC<ILoginProps> = ({setApiTokenInstance, setIdInstance}) => {
  const navigate = useNavigate()

  const {register, handleSubmit, formState: {errors}, reset} = useForm<IAuthInputType>({mode: 'onChange'})

  const onSubmit: SubmitHandler<IAuthInputType> = (data) => {
    setIdInstance(data.idInstance)
    setApiTokenInstance(data.apiTokenInstance)
    localStorage.setItem('idInstance', data.idInstance);
    localStorage.setItem('apiTokenInstance', data.apiTokenInstance);
    navigate('/')
    reset()
  }

  return (
    <div className={styles.auth}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img src={logo} alt=""/>
            </div>
          </div>

          <div className={styles.login}>
            <div className={styles.header}>
              <h2 className={styles.title}>Вход</h2>
            </div>
            <Input {...register('idInstance', {
              required: 'idInstance обязательно'
            })}
                    placeholder={'idInstance'}
                    styles={stylesInput}
                   error={errors.idInstance}
            />
            <Input {...register('apiTokenInstance', {
              required: 'apiTokenInstance обязательно'
            })}
                   placeholder={'apiTokenInstance'}
                   styles={stylesInput}
                   error={errors.apiTokenInstance}
            />
          </div>

          <div>
            <SubmitButton title={"Вход"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};