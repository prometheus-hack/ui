import styles from './client-navbar.module.scss';
import { NavLink as RouterNavLink } from "react-router-dom";

/* eslint-disable-next-line */
export interface ClientNavbarProps {}

export function ClientNavbar(props: ClientNavbarProps) {
  return (
    <div className={styles['container']}>
      <div className={'navbar shadow-lg absolute top-[20px] left-0 right-0  bg-white lg:bg-white sm:bg-[#E6E0FF] rounded-xl w-[80%] lg:w-[80%] sm:w-[95%] py-4 px-8 mx-auto border select-none flex justify-between'} style={{ zIndex: 1 }}>
        <p>Hello</p>
        
        <RouterNavLink
          to={"/profile"}
          className={"py-auto h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center border"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </RouterNavLink>

      </div>
    </div>
  );
}

export default ClientNavbar;
