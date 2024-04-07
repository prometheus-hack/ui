import styles from './qrcode-scanner.module.scss';
import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';

/* eslint-disable-next-line */
export interface QRCodeScannerProps {}

export function QRCodeScanner(props: QRCodeScannerProps) {
  const [data, setData] = useState('No result');

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
      } else {
        console.error('Ошибка при проверке');
        console.error(response);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  // useEffect(() => {
  //   if (data !== "No result") {
  //     handleRegisterSubmit();
  //   }
  // }, [data]);


  return (
    <>
      <QrReader
        constraints={{ facingMode: 'environment' }}
        onResult={(result: any, error: any) => {
          if (result) {
            setData(result?.text);
            console.info(result?.text);
            console.info("KJAKFKFAKAS");
            handleRegisterSubmit();
          }
          if (error) {
            console.info(error);
          }
        }}
      />
      <p>{data}</p>
    </>
  );
}

export default QRCodeScanner;
