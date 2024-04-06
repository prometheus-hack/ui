// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ClientPage, LoginPage, RegisterPage } from '@travel-hack/page';


export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
