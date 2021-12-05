import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import TicketTable from '../../components/TicketTable/TicketTable';
import './ViewTickets.css';

const ViewTickets = ({ user }) => (
  <>
    {user.name ? <TicketTable user={user} /> : <Navigate to="/login" />}
  </>
);

ViewTickets.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

ViewTickets.defaultProps = {
  user: null,
};

export default ViewTickets;
