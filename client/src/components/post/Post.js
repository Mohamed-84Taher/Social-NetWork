import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPost } from "../../redux/actions/post";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = () => {
  const post = useSelector(state => state.post.post);
  const loading = useSelector(state => state.post.loading);

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPost(id));
  }, [getPost, id]);

  return loading || post === null ? (
    <h2>Loading...</h2>
  ) : (
    <Fragment>
      <section className='container'>
        <Link to='/posts' className='btn'>
          Back To Posts
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div className='comments'>
          {post.comments.map(comment => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Post;
