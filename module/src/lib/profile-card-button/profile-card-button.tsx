import styles from './profile-card-button.module.scss';
import { NavLink as RouterNavLink } from "react-router-dom";

/* eslint-disable-next-line */
export interface ProfileCardButtonProps {
  imageUrl: any;
  name: string;
  url: string;
}

export function ProfileCardButton(props: ProfileCardButtonProps) {
  return (
    <RouterNavLink to={props.url} className='space-y-2 w-full'>
      <h2 className='text-[20px]'>{props.name}</h2>
      <img className='rounded-xl' src={props.imageUrl} alt="" />
    </RouterNavLink>
  );
}

export default ProfileCardButton;
