import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DashboardActions = ({ user }) => {
  return (
    <div className="dash-buttons">
      <Link to={`/profile/${user._id}`} className="btn btn-primary">
        <i className="fas fa-user-circle text-light" /> הצגת פרופיל
      </Link>
      <Link to="/edit-profile" className="btn btn-primary mr">
        <i className="fas fa-user-edit text-light" /> עריכת פרופיל
      </Link>
      <Link to="/add-experience" className="btn btn-primary mr">
        <i className="fab fa-black-tie text-light" /> הוספת ניסיון תעסוקתי
      </Link>
      <Link to="/add-education" className="btn btn-primary mr">
        <i className="fas fa-graduation-cap text-light" /> הוספת השכלה
      </Link>
    </div>
  );
};

DashboardActions.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(DashboardActions);
