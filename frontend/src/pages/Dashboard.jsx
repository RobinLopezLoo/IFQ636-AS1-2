
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


function Dashboard()
{
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
        try{
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {headers: {Authorization: `Bearer ${user.token}`}};
            const {data} = await await axios.get('http://localhost:5001/api/journals', config);
            setJournals(data);

        }
        catch(error){
            console.error('Fetch error:', error.response?.data);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>

      {/* Sidebar */}
      <div style={{ width: '220px', background: '#1a3a5c', color: 'white', display: 'flex', flexDirection: 'column', padding: '20px 0', flexShrink: 0 }}>
        <div style={{ padding: '20px', fontSize: '30px', fontWeight: 'bold', fontFamily: "'Dancing Script', cursive", borderBottom: '1px solid #2a4a6c', marginBottom: '16px' }}>
          Travel Logger
        </div>

        <button onClick={() => navigate('/journals/new')}
          style={{ background: '#f0e040', color: 'black', border: 'none', padding: '14px 20px', margin: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', textAlign: 'left' }}>
          New Entry
        </button>

        <button onClick={() => navigate('/journals')}
          style={{ background: '#2a4a6c', color: 'white', border: 'none', padding: '14px 20px', margin: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', textAlign: 'left' }}>
          My Journal
        </button>

        <div style={{ flex: 1 }} />

        <button onClick={handleLogout}
          style={{ background: 'transparent', color: '#aabbcc', border: '1px solid #2a4a6c', padding: '12px 20px', margin: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', textAlign: 'left' }}>
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: '#f0ebe0', display: 'flex', flexDirection: 'column' }}>

        {/* Top Navbar */}
        <div style={{ background: '#1a3a5c', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <input placeholder="Search" style={{ padding: '8px 20px', borderRadius: '20px', border: 'none', width: '300px', fontSize: '14px' }} />
          <button onClick={() => navigate('/profile')}
            style={{ background: '#e0e0e0', border: 'none', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>
            My Profile
          </button>
        </div>

        {/* Journal Cards */}
        <div style={{ padding: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px', overflowY: 'auto' }}>
          {journals.length === 0 ? (
            <div style={{ color: '#666', fontSize: '18px', marginTop: '20px' }}>
              No journal entries yet — click <strong>New Entry</strong> to get started!
            </div>
          ) : (
            journals.map((journal) => (
              <div key={journal._id} style={{ background: 'white', borderRadius: '10px', width: '200px', padding: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer' }}
                onClick={() => navigate(`/journals/view/${journal._id}`)}>
                <div style={{ background: '#a0b0c0', height: '120px', borderRadius: '6px', marginBottom: '10px' }}>
                  {journal.photos && journal.photos[0] && (
                    <img src={journal.photos[0].fileURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
                  )}
                </div>
                <div style={{ fontWeight: 'bold' }}>{journal.title}</div>
                <div style={{ color: '#888', fontSize: '12px' }}>{new Date(journal.createdAt).toLocaleDateString('en-AU', {day: 'numeric', month:'long', year: 'numeric'})}</div>
                <div style={{ marginTop: '6px'}}>
                    <span style={{ background: journal.visibility ? '#2a7a2a' : '#888', color: 'white', padding: '2px 10px', borderRadius: '20px', fontSize:' 11px' }}>
                        {journal.visibility ? 'Public' : 'Private'}
                    </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div> 
        
    );

}


export default Dashboard;