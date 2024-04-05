// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ClientPage, ProfilePage } from '@travel-hack/page';
import styles from './app.module.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/profile/settings" element={<ProfilePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
