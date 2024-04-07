import { useEffect, useState } from 'react';
import styles from './client-page.module.scss';
import { YMaps, Map, Placemark, TrafficControl } from '@pbe/react-yandex-maps';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { DrawPolylines, MapControls, Menu, Place } from '@travel-hack/ui';
import { it } from 'vitest';

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

      <MapControls
        onChangeZoom={(value) => setZoom(prevState => prevState + value)}
        onToggleTraffic={() => setTrafficShown(prevState => !prevState)}
        onHandleLocation={() => handleGetLocation()}
        shownTraffic={trafficShown}
        onOpenMenu={() => setIsCollapsedMenu(prevState => !prevState)}
      />

      <Menu isCollapsedMenu={isCollapsedMenu}
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
