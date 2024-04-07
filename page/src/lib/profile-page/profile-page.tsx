import { useState, useEffect } from 'react';
import styles from './profile-page.module.scss';
import { useNavigate, NavLink as RouterNavLink } from 'react-router-dom';
import myPlacesImage from './myPlacesImage.png';
import galereyImage from './galereyImage.png';
import waitListImage from './whaitListImage.png';
import bonusImage from './bonusImage.png';
import testImage from './testImage.png';
import faqImage from './faqImage.png';
import { AvatarImage, ProfileCardButton } from '@travel-hack/module';
import { ProfileDTO } from './Profile.dto';

/* eslint-disable-next-line */
export interface ProfilePageProps {}

export function ProfilePage(props: ProfilePageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/register');
    }
  }, [navigate]);

  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
        localStorage.setItem('current_user', data);
      } else {
        console.error('Ошибка при получении данных пользователя');
        console.error(response);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const [isGetUser, setIsGetUser] = useState(false);
  if (!isGetUser) {
    handleGetUser();
    setIsGetUser(true);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleGetUser();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const [isLoadingImg, setIsLoadingImg] = useState(true);

  const handleImageLoad = () => {
    setIsLoadingImg(false);
  };

  const handleImageError = () => {
    setIsLoadingImg(false);
    console.error('Image loading error');
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <div className={styles['container ']}>
      <div className="bg-[#E6E0FF] h-screen w-screen pt-8 overflow-y-auto">
        <div className="w-full lg:w-1/4 md:w-2/3 sm:w-full mx-auto">
          <div className="w-full flex justify-between items-center px-4">
            <button onClick={() => navigate(-1)} className='flex items-center justify-center space-x-2 ml-4'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              <p>Назад</p>
            </button>

            <button onClick={logout} type='button' className='flex items-center justify-center space-x-2 ml-4'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              <p>Выйти</p>
            </button>
          </div>

          <div className="flex justify-center items-center space-x-4 mt-8 px-4">
          {isLoadingImg && <div className="w-36 h-24 animate-pulse bg-gray-300 rounded-full "/>}
          <img 
            className='rounded-full border-4 h-24 border-purple-500' 
            // src={profile?.avatar} 
            src="https://nc.djft.ru/avatar/darius/64/dark?v=1"
            alt="" 
            onLoad={handleImageLoad} 
            onError={handleImageError}
          />
            {
              isLoading && <div className="flex flex-col items-start">
                <div className="w-36 h-6 animate-pulse bg-gray-300 rounded-xl mt-8"/>
                <div className="w-36 h-6 animate-pulse bg-gray-300 rounded-xl mt-4"/>
              </div>
            }
            {
              !isLoading && <div className="flex flex-col items-start">
                <p className="font-[Gilroy] text-[25px] font-hairline leading-[28.82px] text-left">{profile?.first_name} {profile?.last_name}</p>
                <p className="text-gray-500 text-left">{profile?.title}</p>
              </div>
            }
          </div>

          {
            isLoading && <div className="w-full h-96 animate-pulse bg-gray-300 rounded-xl mt-8"/>
          }
          {
            !isLoading && (
              <div className="flex items-center justify-center xpace-x-4">
                <div className="flex items-center space-x-8 mt-8">
                  <div className='flex flex-col items-center'>
                    <p className="font-[Gilroy] text-[25px] font-hairline leading-[28.82px] text-left">{profile?.friends}</p>
                    <p>Друзья</p>
                  </div>
                  <div className='flex flex-col items-center'>
                    <p className="font-[Gilroy] text-[25px] font-hairline leading-[28.82px] text-left">{profile?.subscribers}</p>
                    <p>Подписчики</p>
                  </div>

                  <RouterNavLink
                    to={"/profile/settings"}
                    className={"rounded-xl bg-transparrent hover:bg-gray-400 border-2 border-gray-500 px-4 py-2"}
                  >
                    Редактировать<br/> профиль
                  </RouterNavLink>
                </div>
              </div>
            )
          }

          <div className="w-full bg-white rounded-3xl lg:rounded-3xl md:rounded-3xl sm:rounded-t-3xl mt-12 px-8 py-4 grid grid-cols-2 gap-16">

            <ProfileCardButton name='Мои места' imageUrl={myPlacesImage} url='/my-places' />
            <ProfileCardButton name='Галерея' imageUrl={galereyImage} url='/galery' />
            <ProfileCardButton name='Желания' imageUrl={waitListImage} url='/waitlist' />
            <ProfileCardButton name='Бонусы' imageUrl={bonusImage} url='/bonuses' />
            <ProfileCardButton name='Тесты' imageUrl={testImage} url='/test' />
            <ProfileCardButton name='Обратная связь' imageUrl={faqImage} url='/faq' />

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
