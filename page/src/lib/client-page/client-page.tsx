import { useState } from 'react';
import styles from './client-page.module.scss';
import { YMaps, Map, Placemark, TrafficControl, GeoObject } from '@pbe/react-yandex-maps';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { DrawPolylines, MapControls, Menu } from '@travel-hack/ui';

/* eslint-disable-next-line */
export interface ClientPageProps {
}

type Place = {
  name: string;
  description: string;
  position: [number, number];
};


export function ClientPage(props: ClientPageProps) {
  const [places, setPlaces] = useState<Place[]>([
    {
      name: 'Place 1',
      description: 'Description 1',
      position: [55.75, 37.57]
    },
    {
      name: 'Place 2',
      description: 'Description 2',
      position: [55.75, 37.00]
    },
    {
      name: 'Place 3',
      description: 'Description 3',
      position: [55.75, 36.57]
    }
  ]);

  const [activePlace, setActivePlace] = useState<Place | null>(places[0]);

  const [position, setPosition] = useState([55.75, 37.57]);
  const [trafficShown, setTrafficShown] = useState(false);
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

  const [isCollapsedDialog, setIsCollapsedDialog] = useState(false);
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

      {/*<div*/}
      {/*  className={`absolute shadow-lg left-4 lg:left-4 sm:left-0 bottom-4 w-[30em] lg:w-[30em] sm:w-full rounded-2xl bg-white lg:bg-white sm:bg-[#E6E0FF] border pt-0 flex flex-col ${isCollapsedDialog ? 'h-[70em]' : 'h-[30em]'}`}*/}
      {/*  style={{ zIndex: 1 }}>*/}
      {/*  <button type="button" onClick={() => setIsCollapsedDialog(!isCollapsedDialog)}*/}
      {/*          className="w-full bg-transparent py-2 hover:bg-gray-100">*/}
      {/*    <hr className="h-[0.5em] w-[5em] rounded-full bg-gray-300 mx-auto" />*/}
      {/*  </button>*/}

      {/*  <input placeholder="Поиск" type="text"*/}
      {/*         className="py-2 px-4 mt-8 mx-auto bg-white lg:bg-gray-200 sm:bg-white border w-[95%] rounded-xl" />*/}

      {/*  <h4 className="text-start justify-items-start mx-4 mt-4 font-sans text-[24px]">*/}
      {/*    {activePlace?.name}*/}
      {/*  </h4>*/}
      {/*</div>*/}

      <Menu isCollapsedMenu={isCollapsedMenu} setCollapseMenu={(value) => {
        setIsCollapsedMenu(value);
      }} />

      <div className="mx-auto absolute z-0 top-0 left-0 w-full h-full">
        <YMaps>
          <Map className={'w-full h-full'}
               state={{ center: places[0].position, zoom: zoom }}
               modules={['geoObject.addon.balloon', 'geoObject.addon.hint', 'control.ZoomControl']}
          >
            <Placemark
              geometry={position}
            />
            <GeoObject geometry={position} properties={{
              hint: <img src={''} height={13} width={13} />
            }} />
            {
              places.map((place, index) => (
                <div key={index} onClick={() => setActivePlace(place)}>
                  <Placemark
                    geometry={place.position}
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
            {places.map((place, index) => (
              index !== places.length - 1 && (
                <DrawPolylines points={[place.position, places[index + 1].position]} />
              )
            ))}
          </Map>
        </YMaps>
      </div>
    </div>
  );
}

export default ClientPage;
