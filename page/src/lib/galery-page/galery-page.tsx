import styles from './galery-page.module.scss';

/* eslint-disable-next-line */
export interface GaleryPageProps {}

export function GaleryPage(props: GaleryPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to GaleryPage!</h1>
    </div>
  );
}

export default GaleryPage;
