import React, { useState } from 'react';
import client from './gqlClient/graphClient.js';
import { CREATE_AUTHOR_MUTATION, PUBLISH_AUTHOR_MUTATION } from '../graphql/query6.js';
import './css/signup.css'

const CreateAuthor = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [insta, setInsta] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [city, setCity] = useState('');
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const avatarId = "clxlq1mxb03vo07o1dtlptuhl"

  const handleSubmit = async (e) => {
    setLoading(true);
    setWarning("");
    e.preventDefault();

    try {
      const variables = { name, email, bio, insta, linkedin, city, avatarId };
      const data = await client.request(CREATE_AUTHOR_MUTATION, variables);
      const newAuthorId = data.createAuthor.id;
      localStorage.setItem('userId', newAuthorId);
      await handlePublish(newAuthorId); // Pass the new author ID directly

    } catch (error) {
      setWarning("This Email is already in use , Try with another email");
      setLoading(false);
    }
  };

  const handlePublish = async (id) => {
    if (!id) return; // Check if id is null or undefined

    try {
      const variables = { id };
      const data = await client.request(PUBLISH_AUTHOR_MUTATION, variables);
    } catch (error) {
      setWarning("some error occured")
    }
    setLoading(false)
  };


  return (
    <>
    <div className="create">

      <div className="container p-2 my-3 signupcontainer">
        <h2 className='mx-2'>CREATE ACCOUNT</h2>

        <div className='text-white bg-dark p-3 rounded-4 my-2 signupform'>

          <form onSubmit={handleSubmit}>
            <div className="form-group my-3 text-uppercase">
              <label htmlFor="nameInput">Name</label>
              <input
                type="text"
                className="form-control my-3"
                id="nameInput"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                />
            </div>

            <div className="form-group my-3 text-uppercase">
              <label htmlFor="emailInput">Email address</label>
              <input
                type="email"
                className="form-control my-3"
                id="emailInput"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                />
              <small className="form-text text-light text-lowercase">
                We'll never share your email with anyone else.
              </small>
            </div>

            <div className="form-group my-3 text-uppercase">
              <label htmlFor="bioInput">Bio</label>
              <input
                type="text"
                className="form-control my-3"
                id="bioInput"
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                required
                />
            </div>

            <div className="form-group my-3 text-uppercase">
              <label htmlFor="instaInput">Instagram</label>
              <input
                type="text"
                className="form-control my-3"
                id="instaInput"
                placeholder="Instagram"
                onChange={(e) => setInsta(e.target.value)}
                value={insta}
                />
            </div>

            <div className="form-group my-3 text-uppercase">
              <label htmlFor="linkedinInput">LinkedIn</label>
              <input
                type="text"
                className="form-control my-3"
                id="linkedinInput"
                placeholder="LinkedIn"
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
                />
            </div>

            <div className="form-group my-3 text-uppercase">
              <label htmlFor="cityInput">City</label>
              <input
                type="text"
                className="form-control my-3"
                id="cityInput"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                />
            </div>
            <label className={`form-text text-capitalize text-danger bg-dark ${warning ? 'visible' : 'invisible'}`}>{warning}</label>
            <br />
            <button type="submit" className="btn btn-secondary my-1" disabled={loading}>
              {loading ? "Creating..." : "CREATE"}
            </button>
          </form>

        </div>
      </div>
                </div>
    </>
  );
};

export default CreateAuthor;
