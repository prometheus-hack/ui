import styles from './qrcode-scanner.module.scss';
import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate, NavLink as RouterNavLink } from 'react-router-dom';

/* eslint-disable-next-line */
export interface QRCodeScannerProps {}

export function QRCodeScanner(props: QRCodeScannerProps) {
  const navigate = useNavigate();
  const [data, setData] = useState('No result');
  const [sended, setSended] = useState("No result");

  const handleRegisterSubmit = async () => {
    try {
      const response = await fetch('https://hack4.k-lab.su/api/business/qr-code/check/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('access_token') || '',
        },
        body: JSON.stringify({ qrCodeData: data }),
      });

      console.log("data: ", data);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log('Успешно проверен!');
        navigate('/');
      } else {
        console.error('Ошибка при проверке');
        console.error(response);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };


  return (
    <div className="container">
        <button onClick={() => navigate(-1)} className='flex mt-8 items-center justify-center space-x-2 ml-4'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <p>Назад</p>
        </button>
        <QrReader
        constraints={{ facingMode: 'environment' }}
        onResult={(result: any, error: any) => {
          if (result) {
            setData(result?.text);
            console.info(result?.text);
            if (result?.text != sended) {
              handleRegisterSubmit();
              console.info("KJAKFKFAKAS");
              setSended(result?.text);
            }
          }
          if (error) {
            console.info(error);
          }
        }}
      />
      <p>{data}</p>
      </div>
  );
}

export default QRCodeScanner;
