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
import { ProfileProvider } from './context/ProfileContext';
import ProfileTemplate from './pages/templates/ProfileTemplates'
import SignUpPage from './pages/auth/SignUpPage';
import SearchUsers from './pages/templates/SearchUsers';

function App() {

  return (
    <Router>
      <AuthProvider>
      <ProfileProvider>
      <TasksProvider>
      <TaskProvider>
          <Routes>
            <Route path='/'>
              <Route path="login" element={<Login/>} />
              <Route path='signup' element={<SignUpPage/>}/>
              <Route element={<PrivateWrapper/>}>
                <Route index path='' element={<Homepage/>} />
                <Route path='/completed' element={<CompletedTaskPage/>} />
                <Route path='/new' element={<NewTasksPage/>} />
                <Route path='/urgency' element={<UrgencyViewPage/>} />
                <Route path='/incomplete' element={<IncompleteTasksPage/>} />
                <Route path='/task/:id' element={<UpdateViewTaskPage/>} />
                <Route exact path='/task/new' element={<AddTaskPage/>} />
                <Route exact path='/profile/' element={<ProfileTemplate/>}></Route>
                <Route path='/profile/update' element={<ProfileTemplate/>}/>
                <Route path='/search' element={<SearchUsers/>}/>
              </Route>
            </Route>
          </Routes>
      </TaskProvider>
      </TasksProvider>
      </ProfileProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
