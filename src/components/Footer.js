import React from 'react'
import './css/footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
    const email="chitresh.cm@gamil.com"
    return (
        <div>
            <div class="card footer-outer" >
                <div class="card-header footer" >
                    <Link to={`mailto:${email}`} className='footer-text'>
                        <a >chitresh.cm@gamil.com</a>
                    
                    </Link> 
                </div>

            </div>
        </div>
    )
}

export default Footer
