import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // State for form inputs
  const [form, setForm] = useState({
    destinations: '',
    dates: '',
    duration: '',
    budget: '',
    interests: '',
    travelType: '',
  });
  // State for AI-generated data
  const [itinerary, setItinerary] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [accommodation, setAccommodation] = useState([]);
  const [transport, setTransport] = useState([]);
  const [weather, setWeather] = useState(null);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showShare, setShowShare] = useState(false);

  // Handles updates for form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handles submit - in production this would call backend APIs and/or AI endpoints
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    // Clear previous results
    setItinerary(null); setAccommodation([]); setTransport([]);
    setWeather(null); setEvents(null); setMapData(null);

    // --- For demo purposes, use static fake responses, otherwise integrate with backend/AI apis ---
    setTimeout(() => {
      setItinerary([
        {
          day: 1,
          title: 'Arrival & Explore Old Town',
          items: [
            { time: 'Morning', name: 'Airport arrival & hotel check-in', details: 'Taxi from airport; drop bags at hotel.' },
            { time: 'Lunch', name: 'Bistro Bleu', details: 'Local favorite for brunch.', alt: 'Try Le Petit Café nearby' },
            { time: 'Afternoon', name: 'Guided Old Town Walk', details: 'Historic city center, cobbled streets, local shops.' },
            { time: 'Dinner', name: 'Trattoria della Piazza', details: 'Italian, well-rated, city square views.' }
          ],
          costs: '$100 approx.',
          travel: 'Taxi 25min from airport, all city sights by foot.',
          alt: 'Hop-on-hop-off bus tour as alternative',
        },
        {
          day: 2,
          title: 'Museums & Riverwalk',
          items: [
            { time: 'Morning', name: 'Art Museum', details: 'Modern & classical art exhibits.' },
            { time: 'Lunch', name: 'Riverfront Food Market', details: 'Street food and fresh produce.' },
            { time: 'Afternoon', name: 'Boat Ride on River', details: 'Guided tour covering city bridges.' },
            { time: 'Dinner', name: 'La Marina', details: 'Seafood on the waterfront.' }
          ],
          costs: '$80 approx.',
          travel: 'Local tram/walking.',
          alt: 'Bicycle rental for riverside trail'
        },
      ]);
      setWeather({
        today: { summary: 'Sunny', icon: '🌞', temp: '23°C' },
        tomorrow: { summary: 'Partly cloudy', icon: '⛅', temp: '21°C' }
      });
      setEvents([
        { name: 'Spring Jazz Fest', date: 'Day 2, Evening' },
        { name: 'Local Farmers Market', date: 'Day 1, 8am-1pm' }
      ]);
      setAccommodation([
        {
          name: 'City Center Hotel',
          type: 'Hotel',
          price: '$120/night',
          link: '#',
          thumbnail: 'https://via.placeholder.com/64?text=Hotel'
        }, {
          name: 'Sunny Apartments BnB',
          type: 'Airbnb',
          price: '$90/night',
          link: '#',
          thumbnail: 'https://via.placeholder.com/64?text=BnB'
        }
      ]);
      setTransport([
        { mode: 'Taxi', price: '$30', book: '#' },
        { mode: 'Metro Pass (3 days)', price: '$15', book: '#' },
        { mode: 'Bike Rental', price: '$7/day', book: '#' }
      ]);
      setMapData({
        route: [
          { name: 'Airport', lat: 40.1, lng: -3.6 },
          { name: 'City Center Hotel', lat: 40.2, lng: -3.7 },
          { name: 'Old Town', lat: 40.21, lng: -3.71 },
          { name: 'Museum', lat: 40.22, lng: -3.72 }
        ],
        pins: [
          { name: 'Bistro Bleu', lat: 40.211, lng: -3.715, type: 'food' },
          { name: 'Trattoria della Piazza', lat: 40.215, lng: -3.718, type: 'food' },
          { name: 'Riverfront Market', lat: 40.221, lng: -3.725, type: 'food' }
        ]
      });
      setLoading(false);
    }, 1200);
  };

  // PUBLIC_INTERFACE
  const handleSavePDF = () => {
    // For demo, just alert
    alert("Saving as PDF or interactive page not implemented in this demo.");
  };

  // PUBLIC_INTERFACE
  const handleShare = () => {
    setShowShare(true);
    setTimeout(() => setShowShare(false), 2200);
    // Production: share via Web Share, link copy, etc
  };

  // Minor map section: Placeholder - see explanation below
  const renderMap = () => (
    <div style={{
      height: 260,
      background: 'linear-gradient(90deg,#2D9CDB20,#56CCF230),#fff',
      color: '#333',
      borderRadius: 10,
      margin: '16px 0',
      padding: '12px',
      border: '1px solid #E9F1F2',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ fontWeight:600, color: '#2D9CDB', marginBottom: 10 }}>
        <span role="img" aria-label="map">🗺️</span> Travel Route & Top Spots
      </div>
      <div style={{ fontSize:13, color:'#222', marginBottom:8 }}>
        {mapData && mapData.route.map((stop, idx) =>
          <span key={stop.name} style={{
            fontWeight: idx === 0 ? 600 : 400,
            color: idx === 0 ? '#F2994A' : undefined,
            marginRight:10
          }}>
            {stop.name}{idx < mapData.route.length - 1 ? ' → ' : ''}
          </span>
        )}
      </div>
      {/* Pins */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {mapData && mapData.pins.map((pin, idx) =>
          <div key={idx}
            style={{
              display: 'inline-block',
              fontSize: 12,
              background: '#2D9CDB10',
              border: '1px solid #56CCF2',
              borderRadius: 6,
              padding: '2px 10px',
              margin: '0 5px'
            }}
            title={`Type: ${pin.type}`}>
            <span role="img" aria-label="food" style={{marginRight:3}}>
              {pin.type==='food'?'🍽️':'📍'}
            </span>
            {pin.name}
          </div>)}
      </div>
      <div style={{ position:'absolute', bottom:10, right:20, fontSize:12, color:'#888' }}>
        Distance: 12 km &ensp; | &ensp; Total time: 1h 40m
      </div>
    </div>
  );

  return (
    <div className="app" style={{ background: '#F9FAFB', minHeight: '100vh'}}>
      {/* Navigation */}
      <nav className="navbar"
           style={{ background: 'linear-gradient(90deg,#2D9CDB,#56CCF2)', color: '#fff', border: 0}}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '100%' }}>
            <div className="logo" style={{ letterSpacing:1 }}>
              <span className="logo-symbol" style={{color:'#F2994A', fontSize:'1.5rem'}}>🧭</span>
              TravelGenie
            </div>
            <div>
              <button className="btn" style={{marginRight:12, background:'#2D9CDB', color:'#fff', border:'none', fontWeight:'500'}} onClick={handleSavePDF}>
                Save Trip
              </button>
              <button className="btn" style={{background:'#F2994A', color:'#fff', border:'none', fontWeight:'500'}} onClick={handleShare}>
                Share
              </button>
              {showShare && (
                <span style={{marginLeft:10, fontWeight:500, color:'#2D9CDB'}}>
                  Copied link! <span aria-label="party" role="img">🎉</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div style={{paddingTop:90}}></div>
      {/* Main Content */}
      <main>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          gap: '32px'
        }}>
          {/* --- User Input Form (left/top) --- */}
          <section style={{
            background:'#fff', boxShadow:'0 2px 8px #2D9CDB12', borderRadius:10, padding:'2rem', flex:'1 1 320px',
            minWidth:270, maxWidth:355, marginBottom:24
          }}>
            <div className="subtitle" style={{color:'#2D9CDB',marginBottom:8}}>Where to?</div>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div>
                <label style={{fontWeight:500, color:'#222'}}>Destination(s)</label>
                <input type="text" name="destinations" value={form.destinations}
                       onChange={handleChange}
                       placeholder="e.g., Paris, Barcelona"
                       required
                       style={inputStyle}
                />
              </div>
              <div style={{margin:'14px 0 0 0'}}>
                <label style={{fontWeight:500, color:'#222'}}>Dates</label>
                <input type="text" name="dates" value={form.dates}
                       onChange={handleChange}
                       placeholder="e.g., 2024-06-12 to 2024-06-20"
                       required
                       style={inputStyle}
                />
              </div>
              <div style={{margin:'14px 0 0 0'}}>
                <label style={{fontWeight:500, color:'#222'}}>Duration</label>
                <input type="text" name="duration" value={form.duration}
                       onChange={handleChange}
                       placeholder="e.g., 8 days"
                       required
                       style={inputStyle}
                />
              </div>
              <div style={{margin:'14px 0 0 0'}}>
                <label style={{fontWeight:500, color:'#222'}}>Budget</label>
                <input type="number" name="budget" value={form.budget}
                       onChange={handleChange}
                       placeholder="e.g., 1500"
                       required
                       min={0}
                       style={inputStyle}
                />
              </div>
              <div style={{margin:'14px 0 0 0'}}>
                <label style={{fontWeight:500, color:'#222'}}>Travel Type</label>
                <select name="travelType" value={form.travelType} onChange={handleChange}
                        required style={inputStyle}>
                  <option value="" disabled>Select...</option>
                  <option value="solo">Solo</option>
                  <option value="family">Family</option>
                  <option value="honeymoon">Honeymoon</option>
                  <option value="friends">Friends</option>
                  <option value="adventure">Adventure</option>
                  <option value="luxury">Luxury</option>
                  <option value="backpacking">Backpacking</option>
                </select>
              </div>
              <div style={{margin:'14px 0 0 0'}}>
                <label style={{fontWeight:500, color:'#222'}}>Interests</label>
                <input type="text" name="interests" value={form.interests}
                       onChange={handleChange}
                       placeholder="e.g., museums, food, outdoors"
                       style={inputStyle}
                />
              </div>
              <button className="btn btn-large"
                      style={{
                        width:'100%',
                        margin:'24px 0 8px 0',
                        background: loading ? '#56CCF2aa' : '#2D9CDB',
                        color:'#fff',
                        fontWeight:500
                      }}
                      type="submit"
                      disabled={loading}
              >
                {loading ? "Generating Itinerary…" : "Create My Trip"}
              </button>
              {errorMsg && <div style={{color:'#e53e3e', fontSize:13, margin:'10px 0 0 0'}}>{errorMsg}</div>}
            </form>
          </section>
          {/* --- Results/Itinerary/AI Output (right/below or wider screen) --- */}
          <section style={{
            flex: '2 1 500px',
            minWidth:340, maxWidth:660, background:'#fff', borderRadius:10, boxShadow:'0 2px 10px #56CCF21B', marginBottom:24, padding:'2rem'
          }}>
            <div className="subtitle" style={{color:'#F2994A',fontSize:'1.2rem',marginBottom:8}}>Your Custom AI Trip Plan</div>
            {!itinerary && !loading && (
              <div style={{color:'#2D9CDB', fontWeight:500, fontSize:16, opacity:.8}}>
                Enter trip details on the left to get started!
              </div>
            )}
            {loading && (
              <div style={{color:'#56CCF2', fontSize:17, fontWeight:500, marginTop:12, minHeight:160}}>
                <span className="loader" style={{marginRight:10, fontSize:'2em'}}>⏳</span>
                Generating your personalized travel plan…
              </div>
            )}
            {/* Display complete plan ONLY if we have results and not loading */}
            {!loading && itinerary && (
              <div>
                {/* Weather and events at a glance */}
                <div style={{display:'flex', gap:28, marginBottom:8}}>
                  {weather && <div style={{
                    background:'#2D9CDB12',
                    borderRadius: 7,
                    padding: '8px 12px',
                    color:'#333',
                    fontSize:'1rem',
                    display:'flex',
                    alignItems:'center',
                    minWidth:'128px'
                  }}>
                    <span style={{fontSize:'1.6em',marginRight:8}}>{weather.today.icon}</span>
                    <span>
                      {weather.today.summary}, {weather.today.temp}
                      <div style={{fontSize:13, color:'#2D9CDB'}}><span style={{fontWeight:500}}>Today</span></div>
                    </span>
                  </div>}
                  <div>
                    {events && events.length > 0 && (
                      <div style={{
                        background:'#F2994A14', borderRadius:7, padding:'8px 12px', color:'#333', fontSize:'1rem'
                      }}>
                        <div style={{color:'#F2994A', fontWeight:500, fontSize:'1rem',marginBottom:3}}>
                          🎉 Upcoming Events
                        </div>
                        <ul style={{margin:0, padding:0, listStyle:'none'}}>
                          {events.map((ev, i) => <li key={i} style={{fontSize:14, color:'#333'}}>{ev.name} <span style={{color:'#888'}}>({ev.date})</span></li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {/* Itinerary cards */}
                <div>
                  {itinerary.map(day => (
                    <div key={day.day} style={{
                      margin:'18px 0',
                      borderLeft:'6px solid #2D9CDB',
                      borderRadius: '7px',
                      boxShadow:'0 2px 8px #F2994A15',
                      padding:'18px 18px 18px 28px',
                      background:'#FAFAFE'
                    }}>
                      <div style={{fontWeight:600, fontSize:'1.18rem', color:'#2D9CDB'}}>{`Day ${day.day}: ${day.title}`}</div>
                      <ul style={{padding:0, margin:'11px 0 0 0', listStyle:'none'}}>
                        {day.items.map((item, idx) =>
                          <li key={idx} style={{marginBottom:4, fontSize:15}}>
                            <span style={{fontWeight:500, color:'#F2994A'}}>{item.time}:</span>&ensp;
                            <span style={{fontWeight: 'bold', color:'#111'}}>{item.name}</span>
                            {item.details && <span style={{color:'#666'}}> – {item.details}</span>}
                            {item.alt && <span style={{marginLeft:8, fontSize:13, color:'#2D9CDB'}}>(Alt: {item.alt})</span>}
                          </li>)}
                      </ul>
                      <div style={{ marginTop:7, color:'#2D9CDB', fontWeight:500, fontSize:14 }}>
                        Est. Cost: {day.costs} &nbsp;|&nbsp; Travel: <span style={{color:'#56CCF2'}}>{day.travel}</span>
                      </div>
                      {day.alt && <div style={{color:'#F2994A', fontSize:13,marginTop:4}}><span>Alternative: {day.alt}</span></div>}
                    </div>
                  ))}
                </div>
                {/* Map Integration */}
                {mapData && renderMap()}
                {/* Accommodation & Transport Suggestions */}
                <div style={{marginTop:22,display:'flex',gap:22,flexWrap:'wrap'}}>
                  {/* Accommodations */}
                  <div style={{flex:1,minWidth:175,maxWidth:245}}>
                    <div style={{fontWeight:500, color:'#2D9CDB',marginBottom:6,fontSize:15}}>🏨 Stay here</div>
                    {accommodation.map((hotel, idx) =>
                      <a key={idx} href={hotel.link} rel="noopener noreferrer"
                        style={{
                          display:'flex', alignItems: 'center',
                          background:'#2D9CDB0A',
                          marginBottom:7, borderRadius:6, padding:'7px',
                          border:'1px solid #56CCF215', textDecoration:'none'
                        }}
                        target="_blank"
                      >
                        <img src={hotel.thumbnail} alt={hotel.name} width="48" height="48"
                             style={{borderRadius:8, marginRight:13, border:'1px solid #F2994A30'}} />
                        <div>
                          <div style={{ fontWeight: 600, color: '#222' }}>{hotel.name}</div>
                          <div style={{ fontSize: 14, color: '#888' }}>{hotel.type} · {hotel.price}</div>
                        </div>
                      </a>
                    )}
                  </div>
                  {/* Transport */}
                  <div style={{flex:1,minWidth:170,maxWidth:235}}>
                    <div style={{fontWeight:500, color:'#F2994A',marginBottom:6,fontSize:15}}>🚗 Get around</div>
                    {transport.map((tr, idx) =>
                      <div key={idx}
                           style={{
                             background:'#F2994A0A',
                             border:'1px solid #F2994A15',
                             borderRadius:6,
                             display:'flex',
                             alignItems:'center',
                             padding:'7px 7px 7px 11px',
                             marginBottom:7,
                           }}>
                        <span style={{fontWeight:600, color:'#2D9CDB'}}>
                          {tr.mode}
                        </span>
                        <span style={{marginLeft:7, color:'#333', fontSize:14}}>{tr.price}</span>
                        <a href={tr.book} target="_blank" rel="noopener noreferrer"
                          className="btn"
                          style={{
                            background:'#2D9CDB',
                            color:'#fff',
                            padding:'4px 11px',
                            borderRadius:3,
                            fontWeight:'500',
                            fontSize:12,
                            marginLeft:'auto'
                          }}>
                          Book
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

// Styles for input fields - simple consistent design with color theme
const inputStyle = {
  width:'100%',
  fontSize:'1rem',
  padding:'8px 11px',
  border:'1.4px solid #2D9CDB33',
  borderRadius:'5px',
  outline:'none',
  marginTop:'3px',
  background:'#F7FAFC',
  color:'#181818',
  marginBottom:'0',
};

export default App;