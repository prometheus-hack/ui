import { useState } from 'react';
import styles from './client-page.module.scss';
import { YMaps, Map, Placemark, GeoObject } from '@pbe/react-yandex-maps';
import { ClientNavbar } from '@travel-hack/module';

/* eslint-disable-next-line */
export interface ClientPageProps {}

export function ClientPage(props: ClientPageProps) {
  const [positions, setPositions] = useState([
    [55.75, 37.57],
    [55.75, 37.00],
    [55.75, 36.57],
  ]);

  const [position, setPosition] = useState([55.75, 37.57]);
  const [zoom, setZoom] = useState(9);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        setZoom(15);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // handleGetLocation();

  const [isCollapsedDialog, setisCollapsedDialog] = useState(false);

  return (
    <div className={styles['h-screen relative']}>
      <ClientNavbar />
      
      <div className={`absolute shadow-lg left-4 lg:left-4 sm:left-0 bottom-4 w-[30em] lg:w-[30em] sm:w-full rounded-2xl bg-white lg:bg-white sm:bg-[#E6E0FF] border pt-0 flex flex-col items-center ${isCollapsedDialog ? 'h-[70em]' : 'h-[30em]'}`} style={{ zIndex: 1 }}>
        <button type='button' onClick={() => setisCollapsedDialog(!isCollapsedDialog)} className="w-full bg-transparent py-2 hover:bg-gray-100">
          <hr className='h-[0.5em] w-[5em] rounded-full bg-gray-300 mx-auto' />
        </button>

        <input type="text" className='py-2 px-4 mt-8 bg-white lg:bg-gray-200 sm:bg-white border w-[95%] rounded-xl' />
      </div>

      <button type='button' onClick={handleGetLocation} className='absolute right-4 top-[10em] flex items-center justify-center p-2 bg-white hover:bg-gray-100 shadow-md rounded-full text-gray-400 border' style={{ zIndex: 1 }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
          </svg>
      </button>

      <button type='button' onClick={handleGetLocation} className='absolute bottom-8 right-4 flex items-center justify-center p-2 bg-white hover:bg-gray-100 shadow-md rounded-full text-gray-400' style={{ zIndex: 1 }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -rotate-45">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
      </button>

      <div className="mx-auto">
        <YMaps>
          <div>
            <Map width="100" height="80em" defaultState={{ center: position, zoom: zoom }}>
              {
                positions.map((pos) => (
                  <Placemark geometry={pos} />
                ))
              
              }
              
              {positions.map((pos, index) => (
                index !== positions.length - 1 && (
                  <GeoObject
                    key={index}
                    geometry={{
                      type: "LineString",
                      coordinates: [pos, positions[index + 1]],
                    }}
                    options={{
                      geodesic: true,
                      strokeWidth: 5,
                      strokeColor: "#F008",
                    }}
                  />
                )
              ))}
            </Map>
          </div>
        </YMaps>
      </div>
    </div>
  );
}

export default ClientPage;
