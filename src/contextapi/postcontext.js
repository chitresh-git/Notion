import React from 'react';
import rootcontext from './rootcontext';
import { useState } from 'react';

const Postcontext = (props) => {
    const [selectedpost, setpost] = useState({post:""})
    const [user, setuser]=useState({author:""})
    const [flag,setflag]=useState(0);
    


    return (
        <div>
            <rootcontext.Provider value={{  selectedpost,setpost,user,setuser,setflag,flag}}>
                {props.children}
                {/* Downloadcontext api will provide the access of all the states and methods which are assigned to the value  } */}
            </rootcontext.Provider>
        </div>
    )
}

export default Postcontext
