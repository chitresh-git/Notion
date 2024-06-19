// CreatePost.js

import React, { useState } from 'react';
import client from './gqlClient/graphClient.js';
import { CREATE_POST_MUTATION, PUBLISH_POST_MUTATION } from '../graphql/query7.js'; // query 
import { useNavigate } from 'react-router-dom'


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [warning, setWarning] = useState('');

  let navigate = useNavigate()


  const authorId = localStorage.getItem('userId') // fetching the author id from the local storage
  const picId = 'clxlqaank043s07pgg0uiwhdm';   // pic id for our post 

  // Function to format the current date as 'YYYY-MM-DD'
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    setWarning("");
    setLoading(true);
    e.preventDefault();

    const variables = {
      title,
      authorId,
      date: getCurrentDate(),
      picId,
      text,
    };

    try {
      const data = await client.request(CREATE_POST_MUTATION, variables);
      await handlePublish(data.createPost.id); // Call handlePublish with the post ID
    } catch (error) {
      setLoading(false);
    }


  };

  const handlePublish = async (postId) => {
    try {
      const variables = { id: postId };
      const data = await client.request(PUBLISH_POST_MUTATION, variables);
      setTitle("");
      setText("");
      setTimeout(() => {
        window.location.reload();
      }, 0);
      navigate("/")

    }
    catch (error) {
      setWarning("Some error occured , Try again")
    }
    setLoading(false);

  };

  return (
    <div>
      <div className="container my-3">
        <form className='bg-dark text-white p-1 rounded' onSubmit={handleSubmit}>
          <div className="form-group m-3">
            <label htmlFor="title">TITLE</label>
            <input
              type="text"
              className="form-control my-2"
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minLength={5}
              maxLength={30}
              required
            />
          </div>
          <div className="form-group m-3">
            <label htmlFor="content">CONTENT</label>
            <textarea
              className="form-control my-2"
              id="content"
              rows="15"
              placeholder="Enter content"
              value={text}
              onChange={(e) => setText(e.target.value)}
              minLength={10}
              required
            ></textarea>
          </div>
          <label className={`form-text text-capitalize text-danger bg-dark ${warning ? 'visible' : 'invisible'}`}>{warning}</label>
            <br />
            <button type="submit" className="btn btn-secondary m-3" disabled={loading}>
              {loading ? "Posting..." : "POST"}
            </button>
        </form>
      </div>

    </div>
  );
};

export default CreatePost;
