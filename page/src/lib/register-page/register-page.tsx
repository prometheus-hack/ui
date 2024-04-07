import styles from './register-page.module.scss';
import { useEffect, useState } from 'react';
import { NavLink as RouterNavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/* eslint-disable-next-line */
export interface RegisterPageProps {}

export function RegisterPage(props: RegisterPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      history('/');
    }
  }, [history]);

  const handleRegisterSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch('https://hack4.k-lab.su/api/user/registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Сохраняем токены в localStorage
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        console.log(data);
        console.log('Успешно аутентифицирован!');

        history("/");
      } else {
        console.error('Ошибка при аутентификации');
        console.error(response);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  return (
    <div className={styles['container']}>
      <div className="w-full h-screen font-sans bg-cover bg-landscape">
      <div className="container flex items-center justify-center flex-1 h-full mx-auto">
          <div className="w-full max-w-lg">
              <div className="leading-loose">
                  <form onSubmit={handleRegisterSubmit} className="max-w-sm p-10 m-auto rounded shadow-xl bg-white/25">
                      <p className="mb-8 text-2xl font-light text-center text-gray-700">
                          Регистрация
                      </p>
                      <div className="mb-2">
                          <div className=" relative ">
                              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="email"/>
                          </div>
                      </div>
                      <div className="mb-2">
                        <div className=" relative ">
                          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Пароль"/></div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <button type="submit" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                          Создать аккаунт
                          </button>
                        </div>
                        <div className="text-center">
                            <RouterNavLink to={"/login"} className="right-0 inline-block text-sm font-light align-baseline text-500 hover:text-gray-800">
                                Войти
                            </RouterNavLink>
                        </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  );
}

export default RegisterPage;
