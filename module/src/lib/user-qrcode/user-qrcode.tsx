import styles from './user-qrcode.module.scss';
import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

/* eslint-disable-next-line */
export interface UserQRCodeProps {
}

export function UserQRCode(props: UserQRCodeProps) {

  const [isLoading, setIsLoading] = useState(true);

  const [code, setCode] = useState<string>('');

  useEffect(() => {
    (async () => {
      await fetch('https://hack4.k-lab.su/api/user/qr/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('access_token') || ''
        }
      })
        .then(response => response.json())
        .then(data => {
          setCode(data.qr_str);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Произошла ошибка:', error);
        });
    })();
  }, []);

  return (
    <div className={styles['container']}>
      <div className={'flex justify-center items-center p-4 rounded-3xl border bg-white'}>
        <QRCode value={code} />
      </div>
    </div>
  );
}

export default UserQRCode;
