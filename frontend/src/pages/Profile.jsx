import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth(); // Access user token from context
  const navigate =useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch profile data from the backend
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFormData({
          name: response.data.name,
          email: response.data.email,
          university: response.data.university || '',
          address: response.data.address || '',
        });
      } catch (error) {
        alert('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      await axiosInstance.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#d0d0d0', fontFamily: 'sans-serif' }}>
      
      {/* Top Bar*/}
      <div style={{ background: '#1a3a5c', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <button onClick={() => navigate('/dashboard')}
          style={{ position: 'absolute', left: '24px', background: '#e0e0e0', border: 'none', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
          Back
        </button>
        <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>User Profile Page</span>
      </div>

      {/* Profile Content */}
      <div style={{ maxWidth: '700px', margin: '40px auto', background: '#d0d0d0', padding: '30px', borderRadius: '12px', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        
        {/* Profile picture */}
        <div style={{ width: '250px', height: '250px', background: '#b0b0b0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '60px' }}>
          Image Here
        </div>

        {/* Form*/}
        <form onSubmit={handleSubmit} style={{ flex: 1 }}>
          {success && <div style={{ color: 'green', marginBottom: '12px' }}>{success}</div>}
          {error && <div style={{ color: 'red', marginBottom: '12px' }}>{error}</div>}

          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #aaa', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #aaa', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="University"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #aaa', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #aaa', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit"
            style={{ width: '100%', padding: '12px', background: '#2a6ade', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', marginBottom: '12px' }}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>

          <button type="button" onClick={() => navigate('/dashboard')}
            style={{ width: '100%', padding: '12px', background: '#cc3333', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
            Delete Account
          </button>
        </form>
      </div>
    </div>

  );
};

export default Profile;
