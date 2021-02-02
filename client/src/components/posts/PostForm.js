import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
  });

  const { title, text } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <Helmet>
        <title>בית המפתחים | יצירת פוסט חדש</title>
      </Helmet>
      <section className="container">
        <div className="post-form bg-light">
          <h3 className="text-primary m-1 mr-2">יצירת פוסט חדש</h3>
          <form
            className="form my-1"
            onSubmit={e => {
              e.preventDefault();
              addPost(formData, history);
              setFormData({
                title: '',
                text: '',
              });
            }}
          >
            <input
              style={{ width: '93%' }}
              type="text"
              className="m-1 mr-2"
              name="title"
              placeholder="כותרת הפוסט..."
              value={title}
              onChange={onChange}
              required
            />

            <textarea
              style={{ width: '93%', height: '170px' }}
              className="m-1 mr-2"
              name="text"
              cols={30}
              rows={5}
              required
              placeholder="תוכן הפוסט..."
              value={text}
              onChange={onChange}
            />
            <input
              type="submit"
              className="btn btn-primary m-1 mr-2"
              value="שליחה"
            />
            <Link className="btn btn-white mr-n" to="/posts">
              חזרה
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, { addPost })(withRouter(PostForm));
