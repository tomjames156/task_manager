import './App.css';
import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateWrapper from './utils/PrivateWrapper';
import { AuthProvider } from './context/AuthContext';
import { TasksProvider } from './context/TasksContext';
import Login from './pages/LoginPage';
import CompletedTaskPage from './pages/CompletedTasksPage';
import IncompleteTasksPage from './pages/IncompleteTasksPage';
import NewTasksPage from './pages/NewTasksPage';
import UrgencyViewPage from './pages/UrgencyViewPage';

function App() {
  return (
    <Router>
      <AuthProvider>
      <TasksProvider>
          <Routes>
            <Route path='/'>
              <Route element={<PrivateWrapper/>}>
                <Route index path='' element={<Homepage/>} />
                <Route path='/completed' element={<CompletedTaskPage/>} />
                <Route path='/new' element={<NewTasksPage/>} />
                <Route path='/urgency' element={<UrgencyViewPage/>} />
                <Route  path='/incomplete' element={<IncompleteTasksPage/>} />
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
