import styles from './coin-counter.module.scss';
import Image from './image.png';

/* eslint-disable-next-line */
export interface CoinCounterProps {
  text: string;
}

export function CoinCounter(props: CoinCounterProps) {
  return (
    <div className={styles['container']}>
      <div className="flex space-x-2 items-center justify-center">
        <img src={Image} className='h-6 w-6' alt="" />
        <p className='font-bold text-[#FF9100] font-[Gilroy] text-2xl'>{props.text}</p>
      </div>
    </div>
  );
}

export default CoinCounter;
