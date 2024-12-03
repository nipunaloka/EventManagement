import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import EventCard from '../components/EventCard';
import styled from 'styled-components';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events');
        setEvents(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <Message>Loading events...</Message>;
  }

  if (error) {
    return <Message>{error}</Message>;
  }

  return (
    <Container>
      <Title>Welcome to Event Discovery</Title>
      <Subtitle>Find and explore events near you!</Subtitle>
      <EventsWrapper>
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onView={(id) => alert(`View details for event ID: ${id}`)}
            />
          ))
        ) : (
          <Message>No events found. Please check back later!</Message>
        )}
      </EventsWrapper>
    </Container>
  );
};

export default Home;

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

const Subtitle = styled.p`
  text-align: center;
  color: #777;
  margin-bottom: 20px;
`;

const EventsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const Message = styled.p`
  text-align: center;
  color: #555;
  font-size: 18px;
  margin-top: 20px;
`;
