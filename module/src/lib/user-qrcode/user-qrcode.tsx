import styles from './user-qrcode.module.scss';
import { useState, useEffect } from 'react';
import QRCode from "react-qr-code";

/* eslint-disable-next-line */
export interface UserQRCodeProps {}

export function UserQRCode(props: UserQRCodeProps) {

  const [isLoading, setIsLoading] = useState(true);

  const [code, setCode] = useState<string>('');

  const handleGetQR = async () => {

    try {
      const response = await fetch('https://hack4.k-lab.su/api/user/qr/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('access_token') || '',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCode(data);
        setIsLoading(false);
        console.log(data);
      } else {
        console.error('Ошибка при получении данных пользователя');
        console.error(response);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  handleGetQR();
  const [isGetQR, setIsGetQR] = useState(false);
  if (!isGetQR) {
    handleGetQR();
    setIsGetQR(true);
  }

  return (
    <div className={styles['container']}>
      <div className={'flex justify-center items-center p-4 rounded-3xl border bg-white'}>
        <QRCode value={code} />  
      </div>  
    </div>
  );
}

export default UserQRCode;
