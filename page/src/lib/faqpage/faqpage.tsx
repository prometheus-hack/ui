import styles from './faqpage.module.scss';

/* eslint-disable-next-line */
export interface FAQPageProps {}

export function FAQPage(props: FAQPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FAQPage!</h1>
    </div>
  );
}

export default FAQPage;
