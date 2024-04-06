import styles from './waitlist-page.module.scss';

/* eslint-disable-next-line */
export interface WaitlistPageProps {}

export function WaitlistPage(props: WaitlistPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WaitlistPage!</h1>
    </div>
  );
}

export default WaitlistPage;
