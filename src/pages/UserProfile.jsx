import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
        setTickets(response.data.tickets || []);
      } catch (err) {
        alert('Error fetching user data!');
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
      <h2>Your Tickets</h2>
      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <div key={index}>
            <h3>{ticket.eventName}</h3>
            <p>Date: {ticket.eventDate}</p>
            <p>Price: ${ticket.price}</p>
          </div>
        ))
      ) : (
        <p>You have not purchased any tickets yet.</p>
      )}
    </div>
  );
};

export default UserProfile;
