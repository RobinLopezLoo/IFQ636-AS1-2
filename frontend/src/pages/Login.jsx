import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      login(response.data);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed. Please check the email and password and try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1a3a5c', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      
      <div style={{ background: '#2a6ade', padding: '12px 40px', borderRadius: '30px', marginBottom: '40px' }}>
        <span style={{ color: 'white', fontSize: '80px', fontWeight: 'bold', fontFamily: "'Dancing Script', cursive" }}>Travel Logger</span>
      </div>

      <div style={{ background: '#6b7a8d', padding: '40px', borderRadius: '20px', width: '350px' }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '24px', fontSize: '30px', fontWeight: 'bold' }}>
          Welcome Traveller
        </h2>

        {error && <div style={{ color: '#ffcccc', marginBottom: '12px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: 'white', fontSize: '14px' }}>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: 'white', fontSize: '14px' }}>Password:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit"
            style={{ width: '100%', padding: '12px', background: '#2a6ade', color: 'white', border: 'none', borderRadius: '30px', fontSize: '18px', cursor: 'pointer', marginBottom: '12px' }}>
            Login
          </button>

          <button type="button" onClick={() => navigate('/register')}
            style={{ width: '100%', padding: '10px', background: '#4a5568', color: 'white', border: 'none', borderRadius: '30px', fontSize: '14px', cursor: 'pointer' }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
