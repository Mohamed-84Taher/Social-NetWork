import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../utils/formaDate";
import { Link } from "react-router-dom";
import { addLike, deleteLike, deletePost } from "../../redux/actions/post";

function PostItem({ post, showActions }) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <img className='round-img' src={post.avatar} alt='' />
        <h4>{post.name}</h4>
      </div>
      <div>
        <p className='my-1'>{post.text}</p>
        <p className='post-date'>Posted on {formatDate(post.date)} </p>

        {showActions && (
          <Fragment>
            <button
              onClick={() => dispatch(addLike(post._id))}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-up' />{" "}
              <span>
                {" "}
                {post.likes.length > 0 && <span>{post.likes.length}</span>}
              </span>
            </button>
            <button
              onClick={() => dispatch(deleteLike(post._id))}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-down' />
            </button>
            <Link to={`/posts/${post._id}`} className='btn btn-primary'>
              Discussion{" "}
              {post.comments.length > 0 && (
                <span className='comment-count'>{post.comments.length}</span>
              )}
            </Link>

            {!post.loading && auth.user._id === post.user && (
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => dispatch(deletePost(post._id))}
              >
                <i className='fas fa-times' />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}
PostItem.defaultProps = {
  showActions: true,
};

export default PostItem;
