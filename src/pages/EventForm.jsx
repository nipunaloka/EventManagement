import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { useSearchParams, useNavigate } from 'react-router-dom';

const EventForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [ticketsAvailable, setTicketsAvailable] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        try {
          const response = await axios.get(`/events/${eventId}`);
          const { name, date, location, description, price, ticketsAvailable } = response.data;
          setName(name);
          setDate(date);
          setLocation(location);
          setDescription(description);
          setPrice(price);
          setTicketsAvailable(ticketsAvailable);
        } catch (err) {
          setError('Error fetching event data!');
        }
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !date || !location || !price || !ticketsAvailable) {
      alert('All fields are required!');
      return;
    }

    setLoading(true); // Show loading indicator

    const eventData = { name, date, location, description, price, ticketsAvailable };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to create or update events!');
        navigate('/login');
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (eventId) {
        await axios.put(`/events/${eventId}`, eventData, { headers });
        alert('Event updated successfully!');
      } else {
        await axios.post('/events', eventData, { headers });
        alert('Event created successfully!');
      }

      navigate('/admin');
    } catch (err) {
      setError('Error saving event data!');
      console.error(err);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{eventId ? 'Edit Event' : 'Add Event'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Tickets Available"
        value={ticketsAvailable}
        onChange={(e) => setTicketsAvailable(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : eventId ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
};

export default EventForm;
