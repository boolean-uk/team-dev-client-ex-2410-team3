import { useEffect, useState } from 'react';
import Post from '../post';
import { getPosts } from '../../service/apiClient';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
    console.log(getPosts());
  }, []);

  return (
    <>
      {posts
        .slice()
        .reverse()
        .map((post) => {
          return (
            <Post
              key={post.id}
              name={`${post.author.firstName} ${post.author.lastName}`}
              date={post.createdAt}
              content={post.content}
              comments={post.comments}
            />
          );
        })}
    </>
  );
};

export default Posts;
