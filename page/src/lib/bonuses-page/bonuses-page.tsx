import styles from './bonuses-page.module.scss';

/* eslint-disable-next-line */
export interface BonusesPageProps {}

export function BonusesPage(props: BonusesPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BonusesPage!</h1>
    </div>
  );
}

export default BonusesPage;
