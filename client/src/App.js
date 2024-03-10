import './App.css';

import {CssBaseline, useMediaQuery } from '@mui/material';

import { Route, Router, Routes } from 'react-router-dom';
import InstructorBoard from './pages/Instructor/InstructorBoard';
import ChallengeManagement from './pages/Instructor/views/ChallengeManagement';
import AdminBoard from './pages/Admin/AdminBoard';
import Plannification from './pages/Admin/views/Plannification';
import DeveloperBoard from './pages/Developer/DeveloperBoard';
import Home from './pages/Developer/views/Home';
import Compete from './pages/Developer/views/Compete';
import ChallengeDetail from './pages/Instructor/views/ChallengeDetail';
import Auth from './components/auth/Auth';
import Users from './components/users/Users';
import PathManagement from './pages/Admin/views/PathManagement';
import ModuleManagementAdmin from './pages/Admin/views/ModuleManagement';
import PathPage from './pages/Instructor/views/PathPage';
import ModuleManagementInstructor from './pages/Instructor/views/ModuleManagement';
import GamifiedTutorial from './pages/Instructor/views/GamifiedTutorial';
import RecruiterBoard from './pages/Recruter/RecruiterBoard';
import ChallengeManagementRecruiter from './pages/Recruter/views/ChallengeManagement';
import JobManagement from './pages/Recruter/views/JobManagement';
import JobDetail from './pages/Recruter/views/JobDetail';
import Competition from './pages/Developer/views/Competition';
import ChallengeManagementInstructor from './pages/Instructor/views/ChallengeManagement';
import RequireAuth from './components/auth/RequireAuth';
import AuthForm from './components/auth/AuthForm';
import QuestionManagement from './pages/Instructor/views/QuestionManagement';
import Dashboard1 from './pages/Admin/views/Dashboard';
import PathDetail from './pages/Developer/views/PathDetail';
import ModuleDetail from './pages/Developer/views/ModuleDetail';
import ProblemSetChallenge from './pages/Developer/views/Events/challenge/ProblemSetChallenge';
import ProblemPromptChallenge from './pages/Developer/views/Events/challenge/ProblemPromptChallenge';
import ProblemPromptPath from './pages/Developer/views/Events/path/ProblemPromptPath';



function App () {

  const isSmallScreen = useMediaQuery('(max-width:600px)');


  return (
    <>
    <CssBaseline />

      
      
    <Routes>

      <Route path='/auth' element={<Auth />}/>

        <Route
          path="/developer"
          element={<RequireAuth allowedRole='DEVELOPER' />}
        >
          
          <Route path="/developer/" element={<DeveloperBoard />} >
          <Route path="/developer/dashboard" element={<Home />} />
          <Route path="/developer/compete" element={<Compete />} />
          <Route path="/developer/compete/:challengeID" element={<Competition />} />
          <Route path="/developer/compete/:challengeID/problemset" element={<ProblemSetChallenge />} />
          <Route path="/developer/compete/:challengeID/problemset/:questionID" element={<ProblemPromptChallenge />} />
          <Route path="/developer/dashboard/:pathID" element={<PathDetail />} />
          <Route path="/developer/dashboard/:pathID/:moduleID" element={<ModuleDetail />} />
          <Route path="/developer/dashboard/:pathID/:moduleID/:questionID" element={<ProblemPromptPath/>}/>
          </Route>
          
          {/* Other child routes of DeveloperBoard */}
        </Route>
        <Route
        path="/admin"
        element={<RequireAuth allowedRole="ADMIN"/>}>
          
          <Route path='/admin/' element={<AdminBoard />}>
          <Route path='/admin/dashboard' element={<Dashboard1 />} />
          <Route path='/admin/plan' element={<Plannification />} />
          <Route path='/admin/path' element={<PathManagement />} />
          <Route path='/admin/path/:pathID' element={<ModuleManagementAdmin />} />
          <Route path='/admin/users' element={<Users />}/>
          </Route>
          
        </Route>

        <Route
        path="/instructor" 
        element={<RequireAuth allowedRole="INSTRUCTOR"/>}>
          <Route path="/instructor/" element={<InstructorBoard />}>
          <Route path='/instructor/dashboard' element={<Dashboard1 />} />
          <Route path="/instructor/challenge" element={<ChallengeManagementInstructor />} />
          <Route path="/instructor/challenge/:challengeID" element={<ChallengeDetail />}/>
          <Route path="/instructor/path" element={<PathPage />} />
          <Route path="/instructor/path/:pathID" element={<ModuleManagementInstructor />} />
          <Route path="/instructor/path/:pathID/:moduleID" element={<GamifiedTutorial />}/>
          <Route path="/instructor/questions" element={<QuestionManagement />} />
          </Route>
          
        </Route>
        <Route
        path="/recruiter" 
        element={<RequireAuth allowedRole="RECRUITER"/>}>
          <Route path="/recruiter/" element={<RecruiterBoard />}>
          <Route path='/recruiter/dashboard' element={<Dashboard1 />} />
          <Route path="/recruiter/challenge" element={<ChallengeManagementRecruiter />} />
          <Route path="/recruiter/challenge/:challengeID" element={<ChallengeDetail />}/>
          <Route path="/recruiter/jobs" element={<JobManagement />} />
          <Route path="/recruiter/jobs/:jobID" element={<JobDetail />} />
          </Route>
          
        </Route>
        
      </Routes>
      </>
  );
}

export default App;
