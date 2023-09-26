import { RegisterForm } from "./form";

import style from '@/app/Authentication.module.css'

export default function RegisterPage() {
  return (
    <>
      <section className={style.loginCont}>
        <div className={style.loginWrapper}>
          <div className={style.padding_Wrapper}>
            <div className={style.color_wrap}>
              <h1>Register</h1>
              <br></br>
              <RegisterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}