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
        localStorage.setItem('current_user', data);
      } else {
        console.error('Ошибка при получении данных пользователя');
        console.error(response);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const [isGetQR, setIsGetQR] = useState(false);
  if (!isGetQR) {
    handleGetQR();
    setIsGetQR(true);
  }

  return (
    <div className={styles['container']}>
      {
        !isGetQR ? (
          <div className={'flex justify-center items-center py-12 border bg-white my-4 rounded-3xl'}>
            <div className={'animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'} />
          </div>
        ) : (
          <div className={'flex justify-center items-center p-4 rounded-3xl border bg-white'}>
            <QRCode value={code} />  
          </div>
        )
      }
    </div>
  );
}

export default UserQRCode;
