import './css/navbar.css'
import { Link,useNavigate } from 'react-router-dom'

import { useQuery } from '@apollo/client';
import { GET_POST_BY_ID } from '../graphql/query4'; // Importing the GraphQL query
import { GET_AUTHOR_BY_ID } from '../graphql/query9'; // Importing the GraphQL query
import React, { useContext } from 'react'
import postcontext from '../contextapi/rootcontext'
import client from './gqlClient/graphClient.js';


const Navbar = () => {
    const contextapi = useContext(postcontext)
    const { setpost, setuser, setflag } = contextapi
    const postId = "cly3ex28t0uym07pf9rjazvyo" // about post id (DND)
    const navigate=useNavigate();



    const { loading, error, data } = useQuery(GET_POST_BY_ID, {
        variables: { postId },
    });
    if (loading) return <p> </p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleAbout = () => {   // set data of about post 
        setpost({ post: data.post })
    }

    const handleLogout = () => { // will logout and remove userid from the local cache 
        localStorage.removeItem('userId')
        setTimeout(() => { window.location.reload(); }, 0);
        setflag(0);
    }
    const handleflag = () => { // it helps in where to after login/signup , if flag-1 then it will rout to createpost after signin/up
        setflag(1);
    }
    const handleProfile = async () => {  // will fetch the data of current logged in user 
        const authorId = localStorage.getItem('userId')
        const variables = { authorId }
        const data2 = await client.request(GET_AUTHOR_BY_ID, variables);
        setuser({ author: data2.author })
        navigate('/profile')

    }
    return (
        <div>


            <nav class="navbar navbar-expand-lg navbar-dark navbarmain">
                <div class="container-fluid">
                    <Link className='nav-class' to="/">
                        <a class="navbar-brand navtitle " >Notion</a>
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item ">
                                <Link to="/" className='nav-class'>
                                    <a class="nav-link active" aria-current="page">Home</a>
                                </Link>
                            </li>
                            <Link to="/contributor" className='custom-no-decoration nav-class'>   <li class="nav-link active nav-item custom-no-decoration">
                                Happy Clients
                            </li> </Link>

                                        {/* below three lines need to be removed  */}
            
                                 <Link to="https://forms.visme.co/fv/meqq7ndn-emxj6pr" className='custom-no-decoration nav-class'>   <li class="nav-link active nav-item custom-no-decoration">
                                Happy Clients
                            </li> </Link>

                            {/* all below buttons depends whether the user is logged in or not  */}

                            <Link
                                to={localStorage.getItem('userId') ? "/createPost" : "/login"}
                                className='custom-no-decoration nav-class'
                            >
                                <li className="nav-link active nav-item custom-no-decoration" onClick={() => { handleflag() }} >
                                    Post Something
                                </li>
                            </Link>

                            {!localStorage.getItem('userId') && (
                                <Link to="/createAuth" className='custom-no-decoration nav-class'>   <li class="nav-link active nav-item custom-no-decoration">
                                    Signup
                                </li> </Link>
                            )}

                            {!localStorage.getItem('userId') && (
                                <Link to="/login" className='custom-no-decoration nav-class'>   <li class="nav-link active nav-item custom-no-decoration">
                                    Login
                                </li> </Link>
                            )}

                            {localStorage.getItem('userId') && (
                                <Link to="/" className='custom-no-decoration nav-class'>
                                    <li className="nav-link active nav-item custom-no-decoration" onClick={() => { handleLogout() }}>
                                        Logout
                                    </li>
                                </Link>
                            )}

                            {localStorage.getItem('userId') && (
                                <Link to="#" className='custom-no-decoration nav-class'>
                                    <li className="nav-link active nav-item custom-no-decoration" onClick={() => { handleProfile() }}>
                                        Profile
                                    </li>
                                </Link>
                            )}

                            <Link className='custom-no-decoration nav-class' to="/expandpost">
                                <li><a class="nav-link active nav-item custom-no-decoration" onClick={() => { handleAbout() }}>About</a></li>
                            </Link>


                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    More Products
                                </a>
                                <ul class="dropdown-menu">
                                    <li className='nav-class' to="">
                                        <li><a class="dropdown-item" href='https://one-note-zeta.vercel.app/' target='_blank' >OneNote</a></li>
                                        <li><a class="dropdown-item" href='https://global-post.vercel.app/'target='_blank' >Global Post</a></li>
                                        <li><a class="dropdown-item" href='https://ad-shield.vercel.app/' target='_blank' >Ad_Shield</a></li>
                                        <li><a class="dropdown-item" href='https://show-gen.vercel.app/' target='_blank' >ShowGen</a></li>
                                    </li>
                                  {/*
                                   // <Link className='nav-class' to="/contact">
                               
                                        //<li><a class="dropdown-item" >Contact Us</a></li>
                                    //</Link>
                                    */}
                                </ul>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
