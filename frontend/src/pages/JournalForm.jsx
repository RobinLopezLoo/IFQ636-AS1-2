
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function JournalForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState({ name: '', country: '' });
  const [tags, setTags] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (id) fetchJournal();
  }, []);


  const fetchJournal = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`http://localhost:5001/api/journals/${id}`, config);
      setTitle(data.title);
      setContent(data.content);
      setLocation(data.location || { name: '', country: '' });
      setTags(data.tags ? data.tags.join(', ') : '');
      setVisibility(data.visibility);
      if (data.photos && data.photos[0]) {
        setPhotoUrl(data.photos[0].fileURL);
        setCaption(data.photos[0].caption);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleSubmit = async () => {
    if (!title || !content) {
      setError('Title and content are required');
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const journalData = {
        title,
        content,
        location,
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
        visibility,
        photos: photoUrl ? [{ fileURL: photoUrl, caption }] : []
      };

      if (id) {
        await axios.put(`http://localhost:5001/api/journals/${id}`, journalData, config);
      } else {
        await axios.post('http://localhost:5001/api/journals', journalData, config);
      }
      navigate('/journals');
    } catch (error) {
      setError('Something went wrong, please try again');
    }
  };


  return (
    <div style={{ height: '100vh', fontFamily:'sans-serif', background:'#f0ebe0' }}>
      {/* Top Bar */}
      <div style={{ background: '#1a3a5c', padding: '12px 20px', display: 'flex', alignItems:'center', justifyContent:'space-between' }}>
        <button onClick={() => navigate('/journals')}
          style={{ background: '#e0e0e0', border:'none', padding:'8px 16px', borderRadius: '20px', cursor: 'pointer' }}>
          Back
        </button>
        <button onClick={handleSubmit}
          style={{ background: '#c87941', color: 'white', border:'none', padding: '8px 24px', borderRadius:'20px', cursor: 'pointer', fontWeight:'bold', fontSize:'16px' }}>
          {id ? 'Update' : 'Publish'}
        </button>
      </div>


      {/* Form */}
      <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', boxSizing: 'border-box' }}/>


        {/* Photo URL input */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <input
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}/>

          <input
            placeholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}/>
        </div>


        {photoUrl && (
          <img src={photoUrl} alt="preview" style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }} />
        )}

        <textarea
          placeholder="Write about your travel experiences."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', height: '180px', resize: 'vertical', fontSize: '14px', boxSizing: 'border-box' }}
        />

        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <input
            placeholder="Location name"
            value={location.name}
            onChange={(e) => setLocation({ ...location, name: e.target.value })}
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}/>

          <input
            placeholder="Country"
            value={location.country}
            onChange={(e) => setLocation({ ...location, country: e.target.value })}
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}/>
        </div>

        <input
          placeholder="Tags (comma separated e.g. beach, sunset, adventure)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{ width: '100%', padding: '12px', marginTop: '16px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}/>

        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>Visibility:</span>
          <button onClick={() => setVisibility(!visibility)}
            style={{ background: visibility ? '#2a7a2a' : '#888', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer' }}>
            {visibility ? 'Public' : 'Private'}
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default JournalForm;