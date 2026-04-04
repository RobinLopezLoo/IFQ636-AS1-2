
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

    return(
        <div style ={{display: 'flex', height: '100vh', fontFamily: 'sans-serif'}}>
            <div style={{width: '180', background: '#1a3a5c', color: 'white', display: 'flex', flexDirection: 'column', padding: '20px 0'}}>
                <div style={{padding: '20px', frontSize: ' 20px', frontWeight: 'bold', fontStyle: 'italic'}}>
                    Travel Logger
                </div>

                <button onClick={() => navigate('/journals/new')}
                    style={{background: '#f0e040', color: 'black', border: 'none', padding: '12px', margin:'8px', borderRadius: '6px', cursor:'pointer', fontWeight:'bold'}}>
                    New Entry
                </button>

                <button onClick={() => navigate('/journals')}
                    style={{background: '#2a4a6c', color: 'white', border:'none', padding:'12px', margin: '8px', borderRadius: '6px', cursor: 'pointer'}}>
                    My Journal
                </button>

                <div style={{flex: 1}}/>

                <button onClick={handleLogout}
                    style={{background: 'transparent', color:'white', border:'none', padding:'12px', margin: '8px', cursor:'pointer'}}>
                    Log Out
                </button>

            </div> 

            {/* Main page content*/}
            <div style={{padding:'30px', display:'flex', flexWrap: 'wrap', gap:'20px'}}>
                {journals.length ===0 ? (
                    <div style={{color: '#667', fontSize: '18px'}}>
                        No journal entries available. Please create one.
                    </div>
                ):(

                    journals.map((journal) => (
                        <div key={journal._id} style={{background: 'white', borderRadius:'10px', width: '200px', padding: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                            <div style={{background: '#a0b0c0', height:'120px', borderRadius:'6px', marginBottom: '10px'}}>
                                {journal.photos && journal.photos[0] && (
                                    <img src={journal.photos[0].fileURL} alt="" style={{width:'100%', height:'100%', objectFit: 'cover', borderRadius:'6px'}} />

                                )}
                            </div>

                            <div style={{fontWeight:'bold'}}> {journal.title}</div>
                            <div style={{ color: '#888', fontSize:'12px'}}> {new Date(journal.createdAt).toLocaleDateString()} </div>
                        </div>
                    ))
                )}
            </div>
        </div> 
        
    );

}


export default Dashboard;