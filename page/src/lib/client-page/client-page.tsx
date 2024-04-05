import { useState } from 'react';
import styles from './client-page.module.scss';
import { YMaps, Map } from '@pbe/react-yandex-maps';

/* eslint-disable-next-line */
export interface ClientPageProps {}

export function ClientPage(props: ClientPageProps) {
  const [position, setPosition] = useState([55.75, 37.57]);
  const [zoom, setZoom] = useState(9);

  return (
    <div className={styles['h-screen relative']}>
      <div className={'navbar absolute top-[20px] left-0 right-0 bg-white rounded-xl w-[80%] lg:w-[80%] sm:w-[95%] py-4 px-8 mx-auto border'} style={{ zIndex: 1 }}>
        <p>Hello</p>
      </div>
      <div className="mx-auto">
        <YMaps>
          <div>
            <Map width="100" height="80em" defaultState={{ center: position, zoom: zoom }} />
          </div>
        </YMaps>
      </div>
    </div>
  );
}

export default ClientPage;
