import './App.css';
import Homepage from './pages/tasks/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateWrapper from './utils/PrivateWrapper';
import { AuthProvider } from './context/AuthContext';
import { TasksProvider } from './context/TasksContext';
import { TaskProvider } from './context/TaskContext';
import Login from './pages/auth/LoginPage';
import CompletedTaskPage from './pages/tasks/CompletedTasksPage';
import IncompleteTasksPage from './pages/tasks/IncompleteTasksPage';
import NewTasksPage from './pages/tasks/NewTasksPage';
import UrgencyViewPage from './pages/tasks/UrgencyViewPage';
import AddTaskPage from './pages/tasks/AddTaskPage';
import UpdateViewTaskPage from './pages/tasks/UpdateViewTaskPage';

function App() {

  return (
    <Router>
      <AuthProvider>
      <TasksProvider>
      <TaskProvider>
          <Routes>
            <Route path='/'>
              <Route element={<PrivateWrapper/>}>
                <Route index path='' element={<Homepage/>} />
                <Route path='/completed' element={<CompletedTaskPage/>} />
                <Route path='/new' element={<NewTasksPage/>} />
                <Route path='/urgency' element={<UrgencyViewPage/>} />
                <Route path='/incomplete' element={<IncompleteTasksPage/>} />
                <Route path='/task/new' element={<AddTaskPage/>} />
                <Route path='/task/:id' element={<UpdateViewTaskPage/>} />
              </Route>
              <Route path="login" element={<Login/>} />
            </Route>
          </Routes>
      </TaskProvider>
      </TasksProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
