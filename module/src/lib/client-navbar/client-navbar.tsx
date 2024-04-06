import styles from './client-navbar.module.scss';
import { NavLink as RouterNavLink } from "react-router-dom";

/* eslint-disable-next-line */
export interface ClientNavbarProps {}

export function ClientNavbar(props: ClientNavbarProps) {
  return (
    <div className={styles['container']}>
      <div className={'navbar shadow-lg absolute top-[20px] left-0 right-0  bg-white lg:bg-white sm:bg-[#E6E0FF] rounded-xl w-[80%] lg:w-[80%] sm:w-[95%] py-4 px-8 mx-auto border select-none flex justify-between'} style={{ zIndex: 1 }}>
        <div className="flex space-x-4">
          <RouterNavLink
            to={"/admin/users"}
            className={"flex items-center justify-center underline"}
          >
            Список пользователей
          </RouterNavLink>
        </div>

        
        <RouterNavLink
          to={"/profile"}
          className={"flex items-center justify-center"}
        >
          <img className='rounded-full w-12 border-2 border-gray-300' src="https://nc.djft.ru/avatar/darius/64/dark?v=1" alt="" />
        </RouterNavLink>

      </div>
    </div>
  );
}

export default ClientNavbar;
