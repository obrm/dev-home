import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { delExEdu } from '../../actions/profile';

const ProfileExperience = ({
  isUser,
  delExEdu,
  experience: { _id, company, title, from, to, description },
}) => {
  return (
    <div>
      <h3 className="text-dark in">{company}</h3>{' '}
      {isUser && (
        <i
          className="fas fa-trash-alt icon-danger"
          onClick={() => {
            delExEdu(_id, 'experience', 'ניסיון תעסוקתי נמחק בהצלחה');
            alert('ניסיון תעסוקתי נמחק בהצלחה');
            window.location.reload();
          }}
        />
      )}
      <p>
        <Moment format="DD/MM/YYYY">{from}</Moment> -{' '}
        {to === null ? ' נוכחי' : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </p>
      <p>
        <strong>תפקיד: </strong>
        {title}
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

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
  delExEdu: PropTypes.func.isRequired,
  isUser: PropTypes.bool.isRequired,
};

export default connect(null, { delExEdu })(ProfileExperience);
