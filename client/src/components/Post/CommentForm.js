import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className="post-form">
      <h3 className="text-primary m-1 mr-2">הוספת תגובה</h3>
      <form
        className="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          style={{ width: '93%' }}
          className="m-1 mr-2"
          name="text"
          cols={30}
          rows={5}
          required
          placeholder="תוכן התגובה..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input
          type="submit"
          className="btn btn-primary m-1 mr-2"
          value="שליחה"
        />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
