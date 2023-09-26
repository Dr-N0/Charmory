import { LoginForm } from "./form";

import style from '@/app/Authentication.module.css'

export default function LoginPage() {
  return (
    <>
      <section className={style.loginCont}>
        <div className={style.loginWrapper}>
          <div className={style.padding_Wrapper}>
            <div className={style.color_wrap}>
              <h1>Log In</h1>
              <br></br>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
