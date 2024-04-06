import styles from './admin-users-list.module.scss';

/* eslint-disable-next-line */
export interface AdminUsersListProps {}

export function AdminUsersList(props: AdminUsersListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to AdminUsersList!</h1>
    </div>
  );
}

export default AdminUsersList;
