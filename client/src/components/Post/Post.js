import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import Alert from '../layout/Alert';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getPost, addLike, removeLike } from '../../actions/post';

const Post = ({
  getPost,
  post: { post, loading },
  match,
  isAuthenticated,
  addLike,
  removeLike,
}) => {
  useEffect(() => {
    getPost(match.params.id);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>{`בית המפתחים | ${
          !loading && post !== null ? post.title : 'פוסט'
        }`}</title>
      </Helmet>
      <section className="container">
        <Alert />
        {!loading || post !== null ? (
          <>
            <PostItem post={post} isShowPost={true} />
            {isAuthenticated && (
              <div className="mx-2">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => addLike(post._id)}
                >
                  {post !== null && !loading && (
                    <span key={post.likes.length}>{post.likes.length}</span>
                  )}{' '}
                  <i className="fas fa-thumbs-up" />
                </button>
                <button
                  type="button"
                  className="btn btn-white mr"
                  style={{ width: '4.5rem' }}
                  onClick={() => removeLike(post._id)}
                >
                  <i className="fas fa-thumbs-down" />
                </button>
              </div>
            )}
            <div className="line"></div>
            <div className="comments">
              {post !== null && post.comments.length > 0 ? (
                <>
                  <h2 className="mx-2 text-primary">
                    <strong>תגובות</strong>
                  </h2>
                  {post.comments.map(comment => (
                    <CommentItem
                      key={comment._id}
                      comment={comment}
                      postId={post._id}
                    />
                  ))}
                </>
              ) : (
                <>
                  <h3 className="mx-2">טרם נוספו תגובות לפוסט זה</h3>
                  <div className="line"></div>
                </>
              )}
            </div>
            {isAuthenticated && post !== null && (
              <CommentForm postId={post._id} />
            )}
            <Link to="/posts" className="btn btn-light my-1">
              חזרה
            </Link>
          </>
        ) : (
          <Spinner />
        )}
      </section>
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getPost, addLike, removeLike })(Post);
