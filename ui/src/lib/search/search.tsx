import styles from './search.module.scss';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */


export type Location = {
  pk: number;
  coords: [number, number];
  region: string;
  address: string;
};

export type Place = {
  location: Location;
  images: string[];
  name: string;
  phone?: string;
  description?: string;
  website?: string;
  category: number;
}

const SearchItem = ({ place, onSelectLocation }: { place: Place, onSelectLocation: (place: Place) => void }) => {
  return <div className={'flex bg-gray-100 rounded-2xl justify-start items-start p-2 gap-2'} onClick={() => {
    onSelectLocation(place);
  }}>
    <div className={'bg-[#E6E0FF] w-[10px] h-[10px] rounded-full my-[4px]'}></div>
    <div>
      <div className={'font-bold'}>
        {place.name}
      </div>
      <div>
        {place.location.address}
      </div>
    </div>
  </div>;
};

export function Search({ query, onSelectLocation }: { query: string, onSelectLocation: (place: Place) => void }) {
  const [data, setData] = useState<Place[]>([]);
  useEffect(() => {
    (async () => {
      await fetch(`https://hack4.k-lab.su/api/organizations/search/${query}/`, {
        method: 'get'
      })
        .then(response => response.json())
        .then(data => {
          setData(data.results.filter((item: any) => item.location.address !== ''));
        })
        .catch(error => {
          console.error(error);
        });
    })();
  }, [query]);
  return <div className={styles['container']}>
    <div className={'overflow-y-scroll'}>
      <div className={'flex flex-col gap-2 my-4'}>
        {data.slice(0, 6).map((item, index) => <SearchItem place={item} key={index}
                                                           onSelectLocation={onSelectLocation} />)}
      </div>
    </div>
  </div>;
}

export default Search;
