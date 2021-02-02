import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { delExEdu } from '../../actions/profile';

const ProfileEducation = ({
  isUser,
  delExEdu,
  education: { _id, school, degree, fieldofstudy, from, to, description },
}) => {
  return (
    <div>
      <h3 style={{ fontWeight: '400' }} className="in">
        <strong>מוסד לימודים / קורס: </strong>
        {school}
      </h3>{' '}
      {isUser && (
        <i
          className="fas fa-trash-alt icon-danger"
          onClick={() => {
            delExEdu(_id, 'education', 'השכלה נמחקה בהצלחה');
            alert('השכלה נמחקה בהצלחה');
            window.location.reload();
          }}
        />
      )}
      <p>
        <Moment format="DD/MM/YYYY">{from}</Moment> -{' '}
        {to === null ? ' נוכחי' : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </p>
      {degree && (
        <p>
          <strong>תואר / תעודה: </strong>
          {degree}
        </p>
      )}
      <p>
        <strong>תחום לימודים: </strong>
        {fieldofstudy}
      </p>
      {description && (
        <p>
          <strong>תיאור: </strong>
          {description}
        </p>
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
  delExEdu: PropTypes.func.isRequired,
  isUser: PropTypes.bool.isRequired,
};

export default connect(null, { delExEdu })(ProfileEducation);
