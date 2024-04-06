import { useState, useEffect } from 'react';
import styles from './admin-users-list.module.scss';

/* eslint-disable-next-line */
export interface AdminUsersListProps {}

type UserDTO = {
  user: string;
  first_name: string;
  last_name: string;
  title: string;
  avatar: string;
  count_friends: string;
  count_subscribers: string;
};

export function AdminUsersList(props: AdminUsersListProps) {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserDTO[]>([]);

  const handleGetUsers = async () => {

    try {
      const response = await fetch('https://hack4.k-lab.su/api/user/profiles/?page=' + page, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('access_token') || '',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.results);
      } else {
        console.error('Ошибка при получении данных пользователей');
        console.error(response);
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const [isGetUser, setIsGetUser] = useState(false);
  if (!isGetUser) {
    handleGetUsers();
    setIsGetUser(true);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleGetUsers();
    }, 60000);
    return () => clearInterval(interval);
  }, [page]);

  return (
    <div className={styles['container']}>

      <div className="container max-w-3xl px-4 mx-auto sm:px-8">
          <div className="py-8">
              <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                  <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                      <table className="min-w-full leading-normal">
                          <thead>
                              <tr>
                                  <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                      Пользователь
                                  </th>
                                  <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                      Роль
                                  </th>
                                  <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                      Кол-во друзей
                                  </th>
                                  <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                      Кол-во подписчиков
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                            {
                              users.map((user: UserDTO, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <a href="#" className="relative block">
                                                    <img alt="profil" src={user.avatar} className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                                </a>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    { user.first_name } { user.last_name }
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            { user.title }
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                            <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
                                            <span className="relative">
                                                { user.count_friends }
                                            </span>
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                            <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50"></span>
                                            <span className="relative">
                                                { user.count_subscribers }
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                              )})
                            }
                          </tbody>,
                      </table>
                  </div>
              </div>
          </div>
          <div className='flex space-x-4'>
            {
              page > 1 && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPage(page - 1)}>
                Назад
              </button>
            }
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPage(page + 1)}>
              Загрузить еще
            </button>
          </div>  
      </div>
    </div>
  );
}

export default AdminUsersList;
