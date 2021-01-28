import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { delExEdu } from '../../actions/profile';

const Education = ({ education, delExEdu }) => {
  const educations = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td className="hide-sm">
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          ' נוכחי'
        ) : (
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => delExEdu(edu._id, 'education', 'השכלה נמחקה בהצלחה')}
          className="btn btn-danger center-btn"
        >
          מחיקה
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">השכלה</h2>
      <table className="table">
        <thead>
          <tr>
            <th>מוסד לימודים / קורס</th>
            <th className="hide-sm">תואר / תעודה</th>
            <th className="hide-sm">תקופה</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array,
  delExEdu: PropTypes.func.isRequired,
};

export default connect(null, { delExEdu })(Education);
