import styles from './bonuses-page.module.scss';
import { useNavigate, NavLink as RouterNavLink } from 'react-router-dom';
import {CoinCounter} from '@travel-hack/ui';
import Image from './image.png';

/* eslint-disable-next-line */
export interface BonusesPageProps {}

export function BonusesPage(props: BonusesPageProps) {
  const navigate = useNavigate();

  return (
    <div className={styles['container']}>
      <div className="container mx-auto p-4">
        <button onClick={() => navigate(-1)} className='flex items-center justify-center space-x-2 ml-4'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <p>Назад</p>
        </button>

        <h4 className="text-[64px]">Бонусы</h4>

        <div className="flex space-x-4">
          <div className="w-1/2 rounded-2xl p-4 bg-[#E6E0FF]">
            <div className="space-y-2 flex flex-col items-start justify-start">
              <h2 className='text-gray-800 text-[35px]'>Бонусы</h2>
              <CoinCounter text='100' />
            </div>
            <p className='mt-8'>Нажмите, <br/> чтобы потратить</p>
          </div>

          <div className="w-1/2 rounded-2xl p-4 bg-[#E6E0FF]">
            <div className="space-y-2 flex flex-col items-start justify-start">
              <h2 className='text-gray-800 text-[35px]'>Бонусы</h2>
              <CoinCounter text='100' />
            </div>
            <p className='mt-8'>Нажмите, <br/> чтобы потратить</p>
          </div>
        </div>

        <h4 className="text-[64px]">Товары</h4>

        <h4 className="text-[44px] text-gray-400">Возможно, вам понравится</h4>

        <div className='w-full overflow-x-auto'>
          <div className="flex w-full space-x-4 mt-8">
            

            <div className="min-w-[24em]">
              <div className='flex flex-col items-center justify-center'>
                <img src={Image} alt="" className="rounded-2xl w-full h-[23em] object-cover" />
                <CoinCounter text='300' />
                <p className='text-center text-gray-400'>Билет в Старый парк</p>
              </div>
            </div>
            
            <div className="min-w-[24em]">
              <div className='flex flex-col items-center justify-center'>
                <img src={Image} alt="" className="rounded-2xl w-full h-[23em] object-cover" />
                <CoinCounter text='300' />
                <p className='text-center text-gray-400'>Билет в Старый парк</p>
              </div>
            </div>

            <div className="min-w-[24em]">
              <div className='flex flex-col items-center justify-center'>
                <img src={Image} alt="" className="rounded-2xl w-full h-[23em] object-cover" />
                <CoinCounter text='300' />
                <p className='text-center text-gray-400'>Билет в Старый парк</p>
              </div>
            </div>

            <div className="min-w-[24em]">
              <div className='flex flex-col items-center justify-center'>
                <img src={Image} alt="" className="rounded-2xl w-full h-[23em] object-cover" />
                <CoinCounter text='300' />
                <p className='text-center text-gray-400'>Билет в Старый парк</p>
              </div>
            </div>

            <div className="min-w-[24em]">
              <div className='flex flex-col items-center justify-center'>
                <img src={Image} alt="" className="rounded-2xl w-full h-[23em] object-cover" />
                <CoinCounter text='300' />
                <p className='text-center text-gray-400'>Билет в Старый парк</p>
              </div>
            </div>

            <div className="min-w-[24em]">
              <div className='flex flex-col items-center justify-center'>
                <img src={Image} alt="" className="rounded-2xl w-full h-[23em] object-cover" />
                <CoinCounter text='300' />
                <p className='text-center text-gray-400'>Билет в Старый парк</p>
              </div>
            </div>

            <div className="min-w-[24em]">
              <div className='flex flex-col items-center justify-center'>
                <img src={Image} alt="" className="rounded-2xl w-full h-[23em] object-cover" />
                <CoinCounter text='300' />
                <p className='text-center text-gray-400'>Билет в Старый парк</p>
              </div>
            </div>

            <div className="min-w-[24em]">
              <div className='flex flex-col items-center justify-center'>
                <img src={Image} alt="" className="rounded-2xl w-full h-[23em] object-cover" />
                <CoinCounter text='300' />
                <p className='text-center text-gray-400'>Билет в Старый парк</p>
              </div>
            </div>

            <div className="min-w-[24em]">
              <div className='flex flex-col items-center justify-center'>
                <img src={Image} alt="" className="rounded-2xl w-full h-[23em] object-cover" />
                <CoinCounter text='300' />
                <p className='text-center text-gray-400'>Билет в Старый парк</p>
              </div>
            </div>

            <div className="min-w-[24em]">
              <div className='flex flex-col items-center justify-center'>
                <img src={Image} alt="" className="rounded-2xl w-full h-[23em] object-cover" />
                <CoinCounter text='300' />
                <p className='text-center text-gray-400'>Билет в Старый парк</p>
              </div>
            </div>


          </div>
        </div>


      </div>
    </div>
  );
}

export default BonusesPage;
