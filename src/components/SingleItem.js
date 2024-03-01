import React from 'react'
import rootcontext from '../contextapi/rootcontext'
import { useContext } from 'react'
import './css/singleCard.css'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { GET_POSTS_BY_AUTHOR } from '../graphql/query5'; // Importing the GraphQL query
import Items from './Items'



const SingleItem = () => {

  const navigate = useNavigate();
  const context = useContext(rootcontext)
  const { selectedpost, setuser } = context
  const { title, pic, date, content, author, id } = selectedpost.post
  var date2 = new Date(date);

  // Convert the Date object to a string
  var dateString = date2.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  const handle2 = () => {
    setuser({ author: author })
    navigate("/profile")
  }



  const addTargetBlank = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const links = doc.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        links[i].setAttribute('target', '_blank');
        links[i].setAttribute('rel', 'noopener noreferrer');
    }

    // Center images
    const images = doc.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        images[i].style.display = 'block';
        images[i].style.margin = 'auto';

        images[i].style.maxWidth = '100%';
        images[i].style.height = 'auto';
    }

    return doc.documentElement.innerHTML;
};


  // Add target="_blank" to anchor tags in the HTML content
  const sanitizedHTML = addTargetBlank(content.html);




  const authorId = author.id
  const postIdToExclude = id

  const { loading, error, data } = useQuery(GET_POSTS_BY_AUTHOR, {
    variables: { authorId, postIdToExclude },
  });
  if (loading) return <p> </p>;
  if (error) return <p>Error: {error.message}</p>;
  
  // ___________________________________________________________________________
  
  



  return (
    <>



      <div className='' id='singleitem'>

        <div class="card border-0 " id='singleInner' >

          <p className=' title p-2 my-0 ms-4 ' id='uppertitle'>{title}</p>
          <Link to={pic.url} target='_blank'>

            <img src={pic.url} class="card-img-top  p-3" alt="..." id='img' />
          </Link>

          <div class="card-body card-item "   >
            <hr />

            <a className='user' onClick={() => { handle2() }}>

              <img src={author.avatar.url} alt="Avatar" class="avatar" id='singleavatar'></img>
              <a class="name text-dark mx-2 single-name">{author.name}
                <small class="text-body-secondary mr-3 follow" > &nbsp; &nbsp;Follow</small>
              </a>
            </a>

            <h4 class="card-title title  lower-title">{title}</h4>
            <p class="card-text "><small class="text-body-secondary">Written on {dateString}</small></p>
            <p class="card-text singlecontent " dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></p>

            <h3>Written By </h3>
            <a className='user' onClick={() => { handle2() }}>

              <a class="name text-dark mx-0 single-name">{author.name}
                <small class="text-body-secondary  " > &nbsp;On {dateString}</small>
          
              </a>
            </a>





        <hr />
          </div>
        </div>
      </div>
      <div >
        {data.posts.length > 0 && (
          <h1 className='heading heading-single mt-1'>More From {author.name}</h1>
        )}
        <div className='ms-5 me-5 '>
          {data.posts?.map((post) => { // this will call Noteitem component htmlFor each note 
            return <Items post={post} />
          })}
        </div>

      </div>
    </>
  )
}

export default SingleItem
