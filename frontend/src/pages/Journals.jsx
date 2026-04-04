
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Journals() {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchJournals();
  }, []);


  const fetchJournals = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5001/api/journals', config);
      setJournals(data);
    } 
    catch (error) {
      console.error(error);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this journal entry?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`http://localhost:5001/api/journals/${id}`, config);
      fetchJournals();
    } 
    catch (error) {
      console.error(error);
    }
  };


  return (
    <div style={{ height: '100vh', fontFamily:'sans-serif', background: '#f0ebe0' }}>
      
      {/* Top Bar */}
      <div style={{ background: '#1a3a5c', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button onClick={() => navigate('/dashboard')}
          style={{ background: '#e0e0e0', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }}>
          Back
        </button>

        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>My Journal</span>
      </div>


      {/* Journal Cards Grid */}
      <div style={{ padding: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {journals.length === 0 ? (
          <div style={{ color: '#666', fontSize: '18px', marginTop: '50px' }}>
            No journal entries yet.{' '}
            <span style={{ color: '#1a3a5c', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/journals/new')}>
              Create your first one!
            </span>
          </div>
        ) : (

          journals.map((journal) => (
            <div key={journal._id} style={{ background: '#e0e0e0', borderRadius: '10px', width: '220px', padding: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ background: '#a0b0c0', height: '140px', borderRadius: '6px', marginBottom: '10px' }}>
                {journal.photos && journal.photos[0] ? (
                  <img src={journal.photos[0].fileURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#8899aa', borderRadius: '6px' }} />
                )}
              </div>
              
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{journal.title}</div>
              <div style={{ color: '#888', fontSize: '12px', marginBottom: '10px' }}>
                {new Date(journal.createdAt).toLocaleDateString()}
              </div>

              <button onClick={() => navigate(`/journals/edit/${journal._id}`)}
                style={{ background: '#c87941', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', width: '100%', marginBottom: '6px' }}>
                Edit Journal
              </button>

              <button onClick={() => handleDelete(journal._id)}
                style={{ background: '#cc3333', color:'white', border: 'none', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', width: '100%' }}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Journals;