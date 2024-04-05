import { useState } from 'react';
import styles from './profile-page.module.scss';
import { useNavigate, NavLink as RouterNavLink } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ProfilePageProps {}

type Profile = {
  name: string;
  avatar: string;
  description: string;
  friends_count: number;
  followers_count: number;
};

export function ProfilePage(props: ProfilePageProps) {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile>({
    name: 'Darius',
    avatar: 'https://nc.djft.ru/avatar/darius/64/dark?v=1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus et lectus malesuada varius.',
    friends_count: 0,
    followers_count: 0,
  });

  const [isLoadingImg, setIsLoadingImg] = useState(true);

  const handleImageLoad = () => {
    setIsLoadingImg(false);
  };

  const handleImageError = () => {
    setIsLoadingImg(false);
    console.error('Image loading error');
  };

  return (
    <div className={styles['container ']}>
      <div className="bg-[#E6E0FF] h-screen w-screen pt-8">
        <div className="w-1/4 lg:w-1/4 md:w-2/3 sm:w-full mx-auto">
          <button onClick={() => navigate(-1)} className='flex items-center justify-center space-x-2 ml-4'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            <p>Назад</p>
          </button>

          <div className="flex justify-center items-center space-x-4 mt-8">
          {isLoadingImg && <div className="w-36 h-24 animate-pulse bg-gray-300 rounded-full "/>}
          <img 
            className='rounded-full border-4 h-24 border-purple-500' 
            src={profile.avatar} 
            alt="" 
            onLoad={handleImageLoad} 
            onError={handleImageError}
          />
            <div>
              <p className="font-[Gilroy] text-[25px] font-hairline leading-[28.82px] text-left">{profile.name}</p>
              <p className="font-[Gilroy] text-[18px] font-hairline leading-[20.82px] text-left">{profile.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-center xpace-x-4">
            <div className="flex items-center space-x-8 mt-8">
              <div className='flex flex-col items-center'>
                <p className="font-[Gilroy] text-[25px] font-hairline leading-[28.82px] text-left">{profile.friends_count}</p>
                <p>Друзья</p>
              </div>
              <div className='flex flex-col items-center'>
                <p className="font-[Gilroy] text-[25px] font-hairline leading-[28.82px] text-left">{profile.followers_count}</p>
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

          <div className="w-full h-[30em] bg-white rounded-t-3xl mt-12"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
