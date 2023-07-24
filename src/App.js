import './App.css';
import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateWrapper from './utils/PrivateWrapper';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/LoginPage';

function App() {
  return (
    <Router>
      <AuthProvider>
          <Routes>
            <Route path='/'>
              <Route element={<PrivateWrapper/>}>
                <Route index path='' element={<Homepage/>} />
              </Route>
              <Route path="login" element={<Login/>} />
            </Route>
          </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
