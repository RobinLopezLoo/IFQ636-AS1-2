
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function JournalView() {
  const [journal, setJournal] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    fetchJournal();
  }, []);

  const fetchJournal = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`http://localhost:5001/api/journals/${id}`, config);
      setJournal(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!journal) return <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#f0ebe0', fontFamily: 'sans-serif' }}>
      {/* Top Bar*/}
      <div style={{ background: '#1a3a5c', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/dashboard')}
          style={{ background: '#e0e0e0', border: 'none', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
          Back
        </button>
        <button onClick={() => navigate(`/journals/edit/${id}`)}
          style={{ background: '#c87941', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
          Edit
        </button>
      </div>

      {/* Journal Content*/}
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>{journal.title}</h1>
        
        <div style={{ color: '#888', marginBottom: '16px', fontSize: '14px' }}>
          {new Date(journal.createdAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
          {journal.location?.name && ` · 📍 ${journal.location.name}${journal.location.country ? ', ' + journal.location.country : ''}`}
        </div>

        {journal.photos && journal.photos[0] && (
          <img src={journal.photos[0].fileURL} alt={journal.photos[0].caption}
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px', marginBottom: '24px' }} />
        )}

        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#333', marginBottom: '24px' }}>{journal.content}</p>

        {journal.tags && journal.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {journal.tags.map((tag, i) => (
              <span key={i} style={{ background: '#1a3a5c', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '13px' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>


  );
}

export default JournalView;