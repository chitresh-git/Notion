import React from 'react'
import rootcontext from '../contextapi/rootcontext'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { GET_POSTS_BY_AUTHOR_ID } from '../graphql/query2';
import Items from './Items';

import './css/profile.css'

const Profile = () => {

    const context = useContext(rootcontext)
    const { user } = context
    const { author } = user
    const navigate=useNavigate();
    const { id, name, avatar, email, bio, city, insta, linkedin } = author

    const { loading, error, data } = useQuery(GET_POSTS_BY_AUTHOR_ID, {
        variables: { id },
    });
    if (loading) return <p> </p>;
    if (error){ }

    
    
    // console.log(data)
    if (data === undefined) {
        console.error("Error: 'data.posts' is undefined");
        setTimeout(() => { window.location.reload();  }, 0);

         navigate('/')
    }
    const temp=data.posts
    const developerId="clsd6tbz20ozg0aoahpfq40u5" 
    const reverseData=[...temp].reverse() // reversing the data of posts 

    return (
        <>
            <div className='dp   mt-3'>

                <Link to={avatar.url} target="_blank">
                    <img  src={avatar ? avatar.url : 'https://media.graphassets.com/output=format:jpg/resize=height:800,fit:max/zTID66Z7QXedgEHVn3dX'} alt="Avatar" class="avatarprofile " id='singleavatar'></img></Link>
                <div class="card  border-0" >


                    <div class="card-body">
                        <h5><small class="text-body-secondary mt-0 d-flex location" >
                            <i class="fa-solid fa-location-dot"></i>
                            &nbsp;   {city}</small> </h5>
                        <h5>
                            <a class="name text-dark  dpname ">{name}
                               
                                {developerId===id ? (
                                    <small className="text-body-secondary ms-0 follow">&nbsp;Developer</small>
                                ) : (
                                    <small class="text-body-secondary ms-0 follow"> &nbsp;Author</small>                                )}
                            </a>
                        </h5>

                        <h6 class="card-title bio">{bio}</h6>
                        <h6 class="card-title text-muted notion">NOTIONS : {data.posts.length}</h6>
                        <div className="contact">

                            <Link to={`mailto:${email}`}>
                                <i class="fa-regular fa-envelope icon "></i>
                            </Link>
                            <Link to={linkedin} target="_blank">
                                <i class="fa-brands fa-linkedin-in icon ms-4"></i>
                            </Link>
                            <Link to={insta} target="_blank">
                                <i class="fa-brands fa-instagram icon ms-4"></i>
                            </Link>

                            <hr />
                        </div>

                    </div>
                </div>

            </div>

            <div >
                {data.posts.length > 0 && (
                    <h1 className='heading mt-1'>Recent Notions</h1>
                )}

                <div className='ms-5 me-5 '>
                    {reverseData?.map((post) => { // this will call Noteitem component htmlFor each note 
                        return <Items post={post} />
                    })}
                </div>

            </div>

        </>
    )
}

export default Profile
