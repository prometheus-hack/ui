import { useState, useEffect } from 'react';
import styles from './profile-settings-page.module.scss';
import { useNavigate, NavLink as RouterNavLink } from 'react-router-dom';
import { UpdateUserDto } from './UpdateUser.dto';
import { UpdateUserEntity } from './UpdateUser.entity';
import { ProfileDTO } from '../profile-page/Profile.dto';

/* eslint-disable-next-line */
export interface ProfileSettingsPageProps {}

export function ProfileSettingsPage(props: ProfileSettingsPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const [profile, setProfile] = useState<ProfileDTO|null>(null);

  const handleGetUser = async () => {

    try {
      const response = await fetch('https://hack4.k-lab.su/api/user/profile/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('access_token') || '',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Ошибка при получении данных пользователя');
        console.error(response);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const [first_name, setFirst_name] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [isGetUser, setIsGetUser] = useState(false);
  if (!isGetUser) {
    handleGetUser();
    if (profile !== null) {
      setFirst_name(profile.first_name);
      setLast_name(profile.last_name);
      setTitle(profile.title);
      setIsGetUser(true);
    }
  }

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    setIsLoading(true);

    try {

      const send: UpdateUserDto = {
        first_name: first_name,
        last_name: last_name,
        title: title,
      };

      const response = await fetch('https://hack4.k-lab.su/api/user/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('access_token') || '',
        },
        body: JSON.stringify(send),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Успешно сохранно!');
      } else {
        console.error('Ошибка при аутентификации');
        console.error(response);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  return (
    <div className={styles['container']}>
      <div className="bg-[#E6E0FF] h-screen w-screen pt-8">
        <div className="w-full lg:w-1/4 md:w-2/3 sm:w-full mx-auto">
          <button onClick={() => navigate(-1)} className='flex items-center justify-center space-x-2 ml-4'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            <p>Назад</p>
          </button>
          <p>{ isLoading }</p>

          {
            isLoading ? (
              <div className="w-full bg-white rounded-t-3xl mt-12 px-8 py-4">
                <p>Загрузка...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full bg-white rounded-3xl mt-12 px-8 py-8">

                <input placeholder='Имя' value={first_name} onChange={(e) => setFirst_name(e.target.value)} type="text" className='py-2 px-4 mt-8 mx-auto bg-white lg:bg-gray-200 sm:bg-white border w-[95%] rounded-xl' />

                <input placeholder='Фамилия' value={last_name} onChange={(e) => setLast_name(e.target.value)} type="text" className='py-2 px-4 mt-8 mx-auto bg-white lg:bg-gray-200 sm:bg-white border w-[95%] rounded-xl' />

                <input placeholder='Статус' value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='py-2 px-4 mt-8 mx-auto bg-white lg:bg-gray-200 sm:bg-white border w-[95%] rounded-xl' />

                <div className="flex items-center justify-between mt-4">
                  <button type="submit" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Сохранить
                  </button>
                </div>
              </form>
            )
          }

        </div>
      </div>
    </div>
  );
}

export default ProfileSettingsPage;
