import styles from './my-places-page.module.scss';
import { useNavigate, NavLink as RouterNavLink } from 'react-router-dom';
import ParkSunyCulturesImage from './image.png';

/* eslint-disable-next-line */
export interface MyPlacesPageProps {}

export function MyPlacesPage(props: MyPlacesPageProps) {
  const navigate = useNavigate();

  return (
    <div className={styles['container']}>
      <div className="container mx-auto px-4 pt-12">
        <button onClick={() => navigate(-1)} className='flex items-center justify-center space-x-2 ml-4'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <p>Назад</p>
        </button>

        <h4 className="text-[64px]">Мои места</h4>

        <div className="space-y-8">


          <div className="w-full h-[30em] rounded-2xl relative">
              <img src={ParkSunyCulturesImage} className='h-[75%] w-full' alt="" />

              <div className="absolute left-0 bottom-[1em] flex w-full items-center justify-center">
                <div className="w-[70%] shadow-2xl rounded-3xl bg-white p-8 items-center flex flex-col space-y-2">
                  <h4 className="text-gray-900 font-sans font-bold text-[35px]">Парк «Южные культуры»</h4>
                  <h2 className='text-gray-600 text-[24px] text-center'>ул. Губернская, 14, Адлер</h2>
                  <h2 className='text-gray-600 text-[24px] text-center'>Дата последнего посещения: 15.08.2023</h2>

                  <div className="flex space-x-4">
                    <button type='button' className='px-6 py-2 bg-[#AA99FF] font-bold text-white rounded-full'>Подробнее</button>
                    <button type='button' className='px-6 py-2 bg-[#AA99FF] font-bold text-white rounded-full'>Подробнее</button>
                  </div>
                </div>
              </div>
          </div>



        </div>
      </div>
    </div>
  );
}

export default MyPlacesPage;
