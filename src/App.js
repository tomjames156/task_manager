import './App.css';
import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateWrapper from './utils/PrivateWrapper';
import { AuthProvider } from './context/AuthContext';
import { TasksProvider } from './context/TasksContext';
import Login from './pages/LoginPage';
import CompletedTaskPage from './pages/CompletedTasksPage';

function App() {
  return (
    <Router>
      <AuthProvider>
      <TasksProvider>
          <Routes>
            <Route path='/'>
              <Route element={<PrivateWrapper/>}>
                <Route index path='' element={<Homepage/>} />
                <Route index path='/completed' element={<CompletedTaskPage/>} />
              </Route>
              <Route path="login" element={<Login/>} />
            </Route>
          </Routes>
      </TasksProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
