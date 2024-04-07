import styles from './organization-create-page.module.scss';
import { useNavigate, NavLink as RouterNavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

/* eslint-disable-next-line */
export interface OrganizationCreatePageProps {}

type LocationDTO = {
  coords: [number, number];
  address: string;
};

type OrganizationCreateDTO = {
  location: LocationDTO;
  images: string[];
  name: string;
  phone: string;
  website: string;
  description: string;
  category: number;
};

export function OrganizationCreatePage(props: OrganizationCreatePageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const [coords1, setCoords1] = useState<number>("");
  const [coords2, setCoords2] = useState<number>("");
  const [address, setAddress] = useState<string>("");

  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<number>(0);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    setIsLoading(true);

    try {

      const send: OrganizationCreateDTO = {
        location: {
          coords: [coords1, coords2],
          address: address,
        },
        images: images,
        name: name,
        phone: phone,
        website: website,
        description: description,
        category: category,
      };

      const response = await fetch('https://hack4.k-lab.su/api/organizations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('access_token') || '',
        },
        body: JSON.stringify(send),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Успешно сохранно!');
      } else {
        console.error('Ошибка при создании организации');
        console.error(response);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  return (
    <div className={styles['container']}>
      <div className="bg-[#E6E0FF] h-screen w-screen pt-8">
        <div className="w-full lg:w-1/4 md:w-2/3 sm:w-full mx-auto">
          <button onClick={() => navigate(-1)} className='flex items-center justify-center space-x-2 ml-4'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            <p>Назад</p>
          </button>

          {
            (isLoading) ? (
              <p className='text-[24px] text-center text-gray-600 font-bold'>Загрузка...</p>
            ) : (
              <form onSubmit={handleSubmit} className="w-full bg-white rounded-3xl mt-12 px-8 py-8">

                <input placeholder='Координаты 1' value={coords1} onChange={(e) => setCoords1(parseFloat(e.target.value))} type="text" className='py-2 px-4 mx-auto bg-white lg:bg-gray-200 sm:bg-white border w-[95%] rounded-xl mt-4' />

                <input placeholder='Координаты 2' value={coords2} onChange={(e) => setCoords2(parseFloat(e.target.value))} type="text" className='py-2 px-4 mx-auto bg-white lg:bg-gray-200 sm:bg-white border w-[95%] rounded-xl mt-4' />

                <input placeholder='Адрес' value={address} onChange={(e) => setAddress(e.target.value)} type="text" className='py-2 px-4 mx-auto bg-white lg:bg-gray-200 sm:bg-white border w-[95%] rounded-xl mt-4' />

                <input placeholder='Название' value={name} onChange={(e) => setName(e.target.value)} type="text" className='py-2 px-4 mx-auto bg-white lg:bg-gray-200 sm:bg-white border w-[95%] rounded-xl mt-4' />

                <input placeholder='Телефон' value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className='py-2 px-4 mx-auto bg-white lg:bg-gray-200 sm:bg-white border w-[95%] rounded-xl mt-4' />

                <input placeholder='Сайт' value={website} onChange={(e) => setWebsite(e.target.value)} type="text" className='py-2 px-4 mx-auto bg-white lg:bg-gray-200 sm:bg-white border w-[95%] rounded-xl mt-4' />

                <input placeholder='Описание' value={description} onChange={(e) => setDescription(e.target.value)} type="text" className='py-2 px-4 mx-auto bg-white lg:bg-gray-200 sm:bg-white border w-[95%] rounded-xl mt-4' />

                <select value={category} onChange={(e) => setCategory(parseInt(e.target.value))} className='py-2 px-4 mx-auto bg-white lg:bg-gray-200 sm:bg-white border w-[95%] rounded-xl mt-4'>
                  <option value={1}>Категория</option>
                  <option value={2}>Категория 1</option>
                  <option value={3}>Категория 2</option>
                  <option value={4}>Категория 3</option>
                </select>

                <div className="flex items-center justify-between mt-4">
                  <button type="submit" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Сохранить
                  </button>
                </div>
              </form>
            )
          }

        </div>
      </div>
    </div>
  );
}

export default OrganizationCreatePage;
