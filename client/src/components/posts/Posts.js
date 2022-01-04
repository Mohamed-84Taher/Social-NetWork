import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/post";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

function Posts() {
  const dispatch = useDispatch();

  const posts = useSelector(state => state.post.posts);
  const loading = useSelector(state => state.post.loading);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className='container'>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <i className='fas fa-user' /> Welcome to the community
          </p>
          <PostForm />
          <div className='posts'>
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default Posts;
