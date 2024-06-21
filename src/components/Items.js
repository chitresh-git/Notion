import './css/items.css'
import { useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'
import postcontext from '../contextapi/rootcontext'


const Items = (props) => {
    const { post } = props
    const { author, title, date, pic, content, text } = post
    const contextapi = useContext(postcontext)
    const { setpost, setuser } = contextapi
    let navigate = useNavigate()
    const handlclick = () => {
        setpost({ post: post })
        navigate("/expandpost")
    }
    
    if (!author) {
        return null; // Return nothing if author is null
      }
    const handle2 = () => {
        setuser({ author: author })
        navigate("/profile")
    }

    var date2 = new Date(date);

    // Convert the Date object to a string
    var dateString = date2.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });


    let plainText = '';

    if (content && content.html) {
        const html = content.html;
        plainText = html.replace(/<[^>]*>?/gm, '');  // Removing HTML tags
    } else if (text) {
        plainText = text;
    }

    const maxLength = window.innerWidth < 768 ? 0 : 200; // set the text length according to window size 
    if (plainText.length > maxLength) {
        plainText = plainText.substring(0, maxLength).trim();  // Truncating the content of post
        plainText += '. . .';
    }
    if(maxLength==0){ plainText=""}

    return (

        <div className='col-md-0 my-0 justify-content-center' id='item'>



            <a className='name fs-6 avatar-body ' onClick={() => { handle2() }}>

                <img src={author.avatar.url} alt="Avatar" class="avatar "></img>
            </a>

                <a class=" text-dark mx-2 author-name pt-3 mt-5">{author.name}</a>
            <div class="row g-0 bg-light position-relative box" onClick={() => { handlclick(title, post) }}>

                <div class="col-md-5 mb-md-5 p-md-3" id='outer'>

                    <img src={pic.url} class="w-100" alt="..." id='img' />
                </div>
                <div class="col-md-6 p-2 ps-md-0 " id='inner'>
                    <h5 class="mt-0 mb-0" id='title'>{title}</h5>
                    <p class="card-text"><small class="text-body-secondary">Updated On &nbsp;{dateString}</small></p>

                    <p className='mb-0'>{plainText}</p>
                    {/* <p className='text-muted mt-0'>Click To Read More</p> */}
                </div>
            </div>

            <hr />

        </div>

    )
}

export default Items
