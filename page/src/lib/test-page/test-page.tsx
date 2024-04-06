import styles from './test-page.module.scss';
import { useNavigate, NavLink as RouterNavLink } from 'react-router-dom';
import ParkKrasnodarImage from './image.png';

/* eslint-disable-next-line */
export interface TestPageProps {}

export function TestPage(props: TestPageProps) {
  const navigate = useNavigate();

  return (
    <div className={styles['container']}>
      <div className='mt-8 space-y-4 container mx-auto select-none px-4'>
      <button onClick={() => navigate(-1)} className='flex items-center justify-center space-x-2 ml-4'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <p>Назад</p>
      </button>

      <h4 className="text-[64px]">Тесты в городе Краснодар</h4>

      <RouterNavLink to={'/'}>
        <div className='px-4 mt-12 relative'>
          <img src={ParkKrasnodarImage} className="w-full max-h-[40em] rounded-xl" alt="" />
          <div className="absolute left-[7em] bottom-[7em]">
            <h4 className="text-[60px] font-bold text-white">Тест "Парк Краснодар"</h4>
            <p className='text-[30px] text-white'>Доступен с 06.04.24 до 08.04.24</p>
          </div>
        </div>
      </RouterNavLink>

      <RouterNavLink to={'/'}>
        <div className='px-4 mt-12 relative'>
          <img src={ParkKrasnodarImage} className="w-full max-h-[40em] rounded-xl" alt="" />
          <div className="absolute left-[7em] bottom-[7em]">
            <h4 className="text-[60px] font-bold text-white">Тест "Парк Краснодар"</h4>
            <p className='text-[30px] text-white'>Доступен с 06.04.24 до 08.04.24</p>
          </div>
        </div>
      </RouterNavLink>


  
      </div>
    </div>
  );
}

export default TestPage;
