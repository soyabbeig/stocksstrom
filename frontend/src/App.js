import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000/api';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [stocks, setStocks] = useState([]);

  async function fetchStocks() {
    // Simulated dummy data for now
    const data = [
      { symbol: 'RELIANCE', price: 2500, change: +10 },
      { symbol: 'TCS', price: 3200, change: -15 },
      { symbol: 'INFY', price: 1500, change: +5 },
    ];
    setStocks(data);
  }

  useEffect(() => {
    if (loggedIn) {
      fetchStocks();
      const interval = setInterval(fetchStocks, 5000);
      return () => clearInterval(interval);
    }
  }, [loggedIn]);

  async function handleLogin() {
    const res = await fetch(API_URL + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setMessage(data.message);
    if (res.ok) setLoggedIn(true);
  }

  if (!loggedIn) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Login</h2>
        <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <br />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <br />
        <button onClick={handleLogin}>Login</button>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Live Stocks & Signals</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
            <th>Signal</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(({ symbol, price, change }) => (
            <tr key={symbol} style={{ color: change > 0 ? 'green' : 'red' }}>
              <td>{symbol}</td>
              <td>{price}</td>
              <td>{change}</td>
              <td>{change > 0 ? 'BUY' : 'SELL'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
