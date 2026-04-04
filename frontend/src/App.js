import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Journals from './pages/Journals';
import JournalForm from './pages/JournalForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/journals" element={<Journals/>}/>
        <Route path="/journals/new" element={<JournalForm/>}/>
        <Route path="/journals/edit/:id" element={<JournalForm/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
