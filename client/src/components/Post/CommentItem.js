import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  comment: { _id, text, name, avatar, user, date },
  postId,
  deleteComment,
  auth,
}) => {
  return (
    <div
      className={`post bg-white p-1 my-1 ${
        !auth.loading &&
        auth.isAuthenticated &&
        user === auth.user._id &&
        'my-post'
      }`}
    >
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt={name} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        {!auth.loading && auth.isAuthenticated && user === auth.user._id && (
          <i
            className="fas fa-trash-alt icon-danger"
            onClick={() => deleteComment(postId, _id)}
          ></i>
        )}{' '}
        <p className="post-date in">
          התגובה נוספה ב-<Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
