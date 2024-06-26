// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ClientPage, ProfilePage, MyPlacesPage, GaleryPage, WaitlistPage, BonusesPage, TestPage, FAQPage, LoginPage, RegisterPage, AdminUsersList, ProfileSettingsPage, QRScanerPage, OrganizationCreatePage, OrganizationsListPage } from '@travel-hack/page';
import styles from './app.module.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/profile/settings" element={<ProfileSettingsPage/>} />
        <Route path="/my-places" element={<MyPlacesPage />} />
        <Route path="/galery" element={<GaleryPage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="/bonuses" element={<BonusesPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/faq" element={<FAQPage />} />

        <Route path="/qr" element={<QRScanerPage />} />
        
        <Route path="/organizations" element={<OrganizationsListPage />} />
        <Route path="/organization/create" element={<OrganizationCreatePage />} />

        <Route path="/admin/users" element={<AdminUsersList />} />
      </Routes>
    </Router>
  );
}

export default App;
