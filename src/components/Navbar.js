import './css/navbar.css'
import { Link } from 'react-router-dom'

import { useQuery } from '@apollo/client';
import { GET_POST_BY_ID } from '../graphql/query4'; // Importing the GraphQL query
import React, { useContext } from 'react'
import postcontext from '../contextapi/rootcontext'

const Navbar = () => {
    const contextapi = useContext(postcontext)
    const {setpost ,setuser} = contextapi
    const postId="clshtr33f36140aoaw4kgbveg"
    const { loading, error, data } = useQuery(GET_POST_BY_ID, {
        variables: { postId },
      });
       
    //   console.log(data.post.author)
      if (loading) return <p> </p>;
      if (error) return <p>Error: {error.message}</p>;

    const handle=()=>{
          setpost({post:data.post})
    }
    const handle2=()=>{
          setuser({author:data.post.author})
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
                                Authors
                            </li> </Link>
                            <Link to="/createAuth" className='custom-no-decoration nav-class'>   <li class="nav-link active nav-item custom-no-decoration">
                                Signup
                            </li> </Link>
                            <Link to="/createPost" className='custom-no-decoration nav-class'>   <li class="nav-link active nav-item custom-no-decoration">
                                 Post Something
                            </li> </Link>


                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    More
                                </a>
                                <ul class="dropdown-menu">
                                  <Link className='nav-class' to="/expandpost">
                                  <li><a class="dropdown-item" onClick={()=>{handle()}}>About</a></li>
                                  </Link> 
                                  <Link className='nav-class' to="/profile">
                                  <li><a class="dropdown-item" onClick={()=>{handle2()}}>Contact</a></li>
                                  </Link> 
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
