import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const EventCard = ({ event, onEdit, onDelete, onView }) => {
  return (
    <Card>
      <h3>{event.name}</h3>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>{event.description}</p>
      <p>Price: ${event.price}</p>
      <ButtonGroup>
        {onView && <Button onClick={() => onView(event._id)} aria-label={`View event: ${event.name}`}>View</Button>}
        {onEdit && <Button onClick={() => onEdit(event._id)} aria-label={`Edit event: ${event.name}`}>Edit</Button>}
        {onDelete && <Button onClick={() => onDelete(event._id)} aria-label={`Delete event: ${event.name}`}>Delete</Button>}
      </ButtonGroup>
    </Card>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onView: PropTypes.func
};

export default EventCard;

// Styled-components for styling
const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  h3 {
    margin: 0 0 8px;
    color: #333;
  }

  p {
    margin: 4px 0;
    color: #555;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }

  &:active {
    background-color: #004085;
  }
`;
