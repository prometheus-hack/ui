import styles from './galery-page.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink as RouterNavLink } from 'react-router-dom';

/* eslint-disable-next-line */
export interface GaleryPageProps {}

type ResultDTO = {
  image: string;
};

type GaleryDTO = {
  count: number;
  next: string;
  previous: string;
  results: ResultDTO[];
};

export function GaleryPage(props: GaleryPageProps) {
  const navigate = useNavigate();
  const defaultGalery: GaleryDTO = {
    count: 0,
    next: '',
    previous: '',
    results: []
  };
  const [galery, setGalery] = useState<GaleryDTO[]|null>(defaultGalery);

  const handleGetPhotos = async () => {

    try {
      const response = await fetch('https://hack4.k-lab.su/api/activity/gallery/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('access_token') || '',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGalery(data.results);
      } else {
        console.error('Ошибка при получении данных пользователей');
        console.error(response);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const [isGetPhotos, setIsGetPhotos] = useState(false);
  if (!isGetPhotos) {
    handleGetPhotos();
    setIsGetPhotos(true);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleGetPhotos();
    }, 60000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className={styles['container']}>
      <div className="bg-[#E6E0FF] h-screen w-screen pt-8 overflow-y-auto">
        <div className="w-full lg:w-1/4 md:w-2/3 sm:w-full mx-auto">


            <button onClick={() => navigate(-1)} className='flex items-center justify-center space-x-2 ml-4'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              <p>Назад</p>
            </button>


            <div className="p-4 mt-8 rounded-2xl border bg-white">

            <h4 className="text-[64px]">Галерея</h4>
            <h4 className="text-[34px]">Найдено {galery.count} фото</h4>

            <div className="mt-8 w-full gap-4 grid-cols-2 grid">
              {
                (galery.count > 0) && galery.results.map((item:ResultDTO, index:number) => {
                  return (
                    <div key={index} className="relative w-full h-[400px]">
                      <img src={item?.image} alt="" className="object-cover w-full h-full" />
                    </div>
                  );
                })
              }

              {
                (galery.count === 0) && (
                  <h4 className="text-[24px]">Фотографий не найдено</h4>
                )
              }

              {
                (galery == defaultGalery) && (
                  <h4 className="text-[24px] text-center mt-16">Загрузка...</h4>
                )
              }
            </div>

            </div>

        </div>
      </div>
    </div>
  );
}

export default GaleryPage;
