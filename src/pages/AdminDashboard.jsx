import React, { useEffect, useState } from 'react';
import axios from '../services/api'; // Make sure this file includes token handling
import styled from 'styled-components';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login'; // Redirect to login if token is not available
        return;
      }

      const response = await axios.get('/events', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching events.');
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login'; // Redirect if no token
        return;
      }

      await axios.delete(`/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      alert('Error deleting event!');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Container>
      <Title>Admin Dashboard</Title>
      <Button onClick={() => window.location.href = '/admin/event-form'}>Add Event</Button>
      
      {loading && <Message>Loading events...</Message>}
      {error && <Message>{error}</Message>}

      {events.length > 0 ? (
        <EventList>
          {events.map((event) => (
            <EventCard key={event._id}>
              <EventTitle>{event.name}</EventTitle>
              <EventDate>{new Date(event.date).toLocaleDateString()}</EventDate>
              <EventActions>
                <EditButton onClick={() => window.location.href = `/admin/event-form?id=${event._id}`}>Edit</EditButton>
                <DeleteButton onClick={() => deleteEvent(event._id)}>Delete</DeleteButton>
              </EventActions>
            </EventCard>
          ))}
        </EventList>
      ) : (
        <Message>No events found.</Message>
      )}
    </Container>
  );
};

export default AdminDashboard;

// Styled-components for styling
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  text-align: center;
  color: #555;
  font-size: 18px;
  margin-top: 20px;
`;

const EventList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const EventCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const EventTitle = styled.h3`
  color: #333;
`;

const EventDate = styled.p`
  color: #777;
`;

const EventActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const EditButton = styled.button`
  background-color: #ffc107;
  color: white;
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e0a800;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;
