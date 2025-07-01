import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../graphql/query3';
import Accounts from './Accounts';
import './css/contributor.css'

const Contributers = () => {


    const { loading, error, data } = useQuery(GET_AUTHORS);
    if (loading) return <p>...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div>
            <div className='contributor '>
              
                <h1 className=' d-flex justify-content-center mt-3'>   TOP Clients </h1>
                <div>
                    <div className='m-5 justify-content-center '>
                        {data.authors.map((author) => { // this will call Noteitem component htmlFor each note 
                            return <Accounts author={author} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Contributers
