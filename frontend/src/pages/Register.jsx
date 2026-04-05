import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axiosInstance.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1a3a5c', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>

      {/* Title */}
      <div style={{ background: '#2a6ade', padding: '12px 40px', borderRadius: '30px', marginBottom: '40px' }}>
        <span style={{ color: 'white', fontSize: '40px', fontWeight: 'bold', fontFamily: "'Dancing Script', cursive" }}>Travel Logger</span>
      </div>

      {/* Register Box */}
      <div style={{ background: '#6b7a8d', padding: '40px', borderRadius: '20px', width: '350px' }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '24px', fontSize: '22px', fontWeight: 'bold' }}>
          Register an account with Travel Logger
        </h2>

        {error && <div style={{ color: '#ffcccc', marginBottom: '12px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: 'white', fontSize: '14px' }}>Full Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: 'white', fontSize: '14px' }}>Email Address:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: 'white', fontSize: '14px' }}>Password:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ color: 'white', fontSize: '14px' }}>Confirm Password:</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', marginTop: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit"
            style={{ width: '100%', padding: '12px', background: '#c87941', color: 'white', border: 'none', borderRadius: '30px', fontSize: '18px', cursor: 'pointer', marginBottom: '12px' }}>
            Create
          </button>

          <button type="button" onClick={() => navigate('/login')}
            style={{ width: '100%', padding: '10px', background: '#4a5568', color: 'white', border: 'none', borderRadius: '30px', fontSize: '14px', cursor: 'pointer' }}>
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;