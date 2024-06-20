import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_POST_BY_ID } from '../graphql/query4'; // Importing the GraphQL query
import postcontext from '../contextapi/rootcontext'

const Contact = () => {
  const navigate = useNavigate();
  const contextapi = useContext(postcontext);
  const { setuser } = contextapi;
  const postId = "clshtr33f36140aoaw4kgbveg"; // about post id (DND)

  const { data } = useQuery(GET_POST_BY_ID, {
    variables: { postId },
  });

  useEffect(() => {
    if (data && data.post && data.post.author) {
      setuser({ author: data.post.author });
      navigate('/profile');
    }
  }, [data, setuser, navigate]);

  // Intentionally not returning anything
  return null;
};

export default Contact;
