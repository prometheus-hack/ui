import { useEffect, useState } from 'react';
import styles from './client-page.module.scss';
import { YMaps, Map, Placemark, TrafficControl } from '@pbe/react-yandex-maps';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { DrawPolylines, MapControls, Menu, Place } from '@travel-hack/ui';

/* eslint-disable-next-line */
export interface ClientPageProps {
}


export function ClientPage(props: ClientPageProps) {
  const [places, setPlaces] = useState<Place[]>([]);

  const [position, setPosition] = useState([55.75, 37.57]);
  const [lastPosition, setLastPosition] = useState([55.75, 37.57]);
  const [trafficShown, setTrafficShown] = useState(false);
  const [zoom, setZoom] = useState(9);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        setLastPosition([latitude, longitude]);
        setZoom(15);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  const [isCollapsedMenu, setIsCollapsedMenu] = useState(true);

  return (
    <div className={styles['h-screen relative']}>
      <div className={'absolute left-0 top-0 h-[100vh] py-6 px-3 pb-16 flex flex-col justify-between z-50'}>
        <RouterNavLink
          to={'/profile'}
          className={'flex items-center justify-center'}
        >
          <img className="rounded-full w-12 border-2 border-gray-300" src="https://nc.djft.ru/avatar/darius/64/dark?v=1"
               alt="" />
        </RouterNavLink>
      </div>

      <div className={'absolute left-0 top-20 h-[100vh] py-6 px-3 pb-16 flex flex-col justify-between z-50'}>
        <RouterNavLink
          to={'/qr'}
          className="flex items-center justify-center p-2 bg-white hover:bg-gray-100 shadow-md rounded-full text-gray-400 border"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
          </svg>

        </RouterNavLink>
      </div>

      <div className={'absolute left-0 top-40 h-[100vh] py-6 px-3 pb-16 flex flex-col justify-between z-50'}>
        <RouterNavLink
          to={'/organizations'}
          className="flex items-center justify-center p-2 bg-white hover:bg-gray-100 shadow-md rounded-full text-gray-400 border"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
          </svg>
        </RouterNavLink>
      </div>

      <MapControls
        onChangeZoom={(value) => setZoom(prevState => prevState + value)}
        onToggleTraffic={() => setTrafficShown(prevState => !prevState)}
        onHandleLocation={() => handleGetLocation()}
        shownTraffic={trafficShown}
        onOpenMenu={() => setIsCollapsedMenu(prevState => !prevState)}
      />

      <Menu isCollapsedMenu={isCollapsedMenu}
            selectedPlaces={places}
            onSelectLocation={(place) => {
              setPlaces(prevState => {
                if (prevState.includes(place)) {
                  return prevState.filter(item => item !== place);
                } else {
                  setLastPosition(place.location.coords);
                  return [...prevState, place];
                }
              });
            }}
            setCollapseMenu={(value) => {
              setIsCollapsedMenu(value);
            }} />

      <div className="mx-auto absolute z-0 top-0 left-0 w-full h-full">
        <YMaps>
          <Map className={'w-full h-full'}
               state={{ center: lastPosition, zoom: zoom }}
               modules={['geoObject.addon.balloon', 'geoObject.addon.hint', 'control.ZoomControl']}
          >
            <Placemark
              geometry={position}
            />
            <Placemark
              geometry={position}
            />
            {
              places && places.map((place, index) => (
                <div key={index}>
                  <Placemark
                    geometry={place.location.coords}
                    defaultOptions={{
                      // iconLayout: layout,
                      iconColor: '#b7a5ff'
                    }}
                    defaultProperties={{
                      balloonContent: '<h2>' + place.name + '</h2><h3>' + place.description + '</h3>'
                    }}
                    modules={['geoObject.addon.balloon']}
                  />
                </div>
              ))
            }
            <TrafficControl
              className={'hidden'}
              options={{
                visible: false
              }}
              state={{
                trafficShown: trafficShown
              }} />
            {places.map((place, index) => {
              if (index === 0)
                return <DrawPolylines points={[[position[0], position[1]], places[0].location.coords]} />;
              return <DrawPolylines points={[places[index - 1].location.coords, places[index].location.coords]} />;
            })}
          </Map>
        </YMaps>
      </div>
    </div>
  );
}

export default ClientPage;
