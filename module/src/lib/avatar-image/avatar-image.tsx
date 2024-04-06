import styles from './avatar-image.module.scss';

/* eslint-disable-next-line */
export interface AvatarImageProps {
  size: number;
  src: string; 
}

export function AvatarImage(props: AvatarImageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AvatarImage!</h1>
    </div>
  );
}

export default AvatarImage;
