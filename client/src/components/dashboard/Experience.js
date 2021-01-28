import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { delExEdu } from '../../actions/profile';

const Experience = ({ experience, delExEdu }) => {
  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          ' נוכחי'
        ) : (
          <Moment format="DD/MM/YYYY">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() =>
            delExEdu(exp._id, 'experience', 'ניסיון תעסוקתי נמחק בהצלחה')
          }
          className="btn btn-danger center-btn"
        >
          מחיקה
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">ניסיון תעסוקתי</h2>
      <table className="table">
        <thead>
          <tr>
            <th>חברה</th>
            <th className="hide-sm">תפקיד</th>
            <th className="hide-sm">תקופה</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experiences: PropTypes.array,
  delExEdu: PropTypes.func.isRequired,
};

export default connect(null, { delExEdu })(Experience);
