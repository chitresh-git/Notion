import React from 'react'
import './css/accounts.css'
import { Link } from 'react-router-dom'
import  { useContext } from 'react'
import postcontext from '../contextapi/rootcontext'
import { useNavigate } from 'react-router-dom'


const Accounts = (props) => {
    const { author } = props
    const { name, avatar, bio } = author
    const contextapi = useContext(postcontext)
    const {setuser} = contextapi
    
    
    let navigate = useNavigate()
    const handle2 = () => {
        setuser({ author: author})
        navigate("/profile")
      }

    return (
        <div className='justify-content-center account-outer' onClick={()=>{handle2()}}>

            <div class="card mt-3 account-body text-light" >
                <div class="card-body text-light">
                    <img src={avatar.url} alt="Avatar" class="account-avatar   ms-3 "></img>
                    <a className='account-name ms-2 '> {name}</a>

                    <h6 class="card-subtitle mb-2  account-bio ms-3 mt-3 ">{bio}</h6>

                </div>
            </div>

        </div>
    )
}

export default Accounts
