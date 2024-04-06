import styles from './test-list-page.module.scss';

/* eslint-disable-next-line */
export interface TestListPageProps {}

export function TestListPage(props: TestListPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TestListPage!</h1>
    </div>
  );
}

export default TestListPage;
