import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries';
import Items from './Items';
import './css/home.css'


const Home = () => {


  const { loading, error, data } = useQuery(GET_POSTS);
  


  if (loading) return <p> </p>;
  if (error) return <p>Error: {error.message}</p>;
  
  
  const temp=data.posts
  const reverseData=[...temp].reverse() // reversing the data of posts 

  
  return (
    <div>
  
      <div className='justify-content-center item'>
        <h1 className='home-heading mt-4'>Top  Notions </h1>
        <div className=' justify-content-center homeItemsWidth'>
          {reverseData.map((post) => { // this will call Noteitem component htmlFor each note 
            return <Items  post={post} />
          })}
        </div>


  </div>



    </div>
  );
}

export default Home
