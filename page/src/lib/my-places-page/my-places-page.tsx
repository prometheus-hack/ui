import styles from './my-places-page.module.scss';

/* eslint-disable-next-line */
export interface MyPlacesPageProps {}

export function MyPlacesPage(props: MyPlacesPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MyPlacesPage!</h1>
    </div>
  );
}

export default MyPlacesPage;
