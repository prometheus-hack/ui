import styles from './organizations-list-page.module.scss';
import { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, TrafficControl } from '@pbe/react-yandex-maps';
import { NavLink as RouterNavLink } from 'react-router-dom';

/* eslint-disable-next-line */
export interface OrganizationsListPageProps {}

type OrganizationEntiry = {
  location: [string, string];
};

type OrganizationDTO = {
  count: number;
  next: string;
  previous: string;
  results: OrganizationEntiry[];
};

export function OrganizationsListPage(props: OrganizationsListPageProps) {


  const [page, setPage] = useState(1);
  const [organizations, setOrganizations] = useState([]);

  const handleGetOrganizations = async () => {

    try {
      const response = await fetch('https://hack4.k-lab.su/api/organizations/?page=' + page, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('access_token') || '',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrganizations(data.results);
        console.log(data.results);
      } else {
        console.error('Ошибка при получении данных организаций');
        console.error(response);
      }
    } catch (error) {
      console.error('Произошла ошибка при получении организаций:', error);
    }
  };

  const [isGetOrganizations, setIsGetOrganizations] = useState(false);
  if (!isGetOrganizations) {
    handleGetOrganizations();
    setIsGetOrganizations(true);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleGetOrganizations();
    }, 60000);
    return () => clearInterval(interval);
  }, [page]);

  return (
    <div className={styles['container']}>
      <div className="bg-[#E6E0FF] h-screen w-screen pt-8">
        <div className="w-full lg:w-1/4 md:w-2/3 sm:w-full mx-auto h-screen overflow-y-auto">
          
          <div className='flex items-center justify-center space-x-4'>
            <button onClick={() => navigate(-1)} className='flex items-center justify-center space-x-2 ml-4 mt-12'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              <p>Назад</p>
            </button>

            <RouterNavLink
                to={'/organization/create'}
                className={'text-2xl font-bold text-center px-8 py-4 rounded-2xl bg-white shadow-lg mt-12'}
              >
                Создать организацию
              </RouterNavLink>
          </div>

          <div className="flex flex-col items-center mt-8 justify-center">
            <h1 className="text-4xl font-bold text-center">Организации</h1>
            <div className="flex flex-col items-center justify-center pb-12">

              {
                organizations.length === 0 && <div className="flex items-center justify-center w-full p-4 my-4 bg-white rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold">Организации не найдены</h2>
                </div>
              }

              <YMaps>
                <Map className={'w-full h-[200px]'} state={{ center: [55.75, 37.57], zoom: 10 }}>
                  {
                    organizations.map((organization: OrganizationEntiry, index: number) => (
                      <Placemark key={index}
                        geometry={[organization.location[0], organization.location[1]]}
                        defaultOptions={{
                          iconColor: '#b7a5ff'
                        }}
                      />
                    ))
                  }
                </Map>
              </YMaps>

              {
                organizations.map((organization: OrganizationEntiry, index: number) => (
                  <div key={index} className="flex flex-col items-center justify-center w-full p-4 my-4 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold">{organization?.name}</h2>
                  </div>
                ))
              }
            </div>
          </div>

          <div className='flex space-x-4 mb-12'>
            {
              page > 1 && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPage(page - 1)}>
                Назад
              </button>
            }
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded" onClick={() => setPage(page + 1)}>
              Загрузить еще
            </button>
          </div>  

          </div>
        </div>
      </div>
    
  );
}

export default OrganizationsListPage;
