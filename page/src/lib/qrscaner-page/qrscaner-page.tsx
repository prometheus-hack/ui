import { QRCodeScanner } from '@travel-hack/module';
import styles from './qrscaner-page.module.scss';

/* eslint-disable-next-line */
export interface QRScanerPageProps {}

export function QRScanerPage(props: QRScanerPageProps) {
  return (
    <div className={styles['container']}>
      <div className="container mx-auto">
        <QRCodeScanner/>
      </div>
    </div>
  );
}

export default QRScanerPage;
