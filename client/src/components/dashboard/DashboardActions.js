import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-primary">
        <i className="fas fa-user-circle text-light" /> עריכת פרופיל
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

export default DashboardActions;
