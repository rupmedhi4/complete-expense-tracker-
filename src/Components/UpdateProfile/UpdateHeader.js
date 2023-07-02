import React from 'react'
import './UpdateHeader.css'

export default function UpdateHeader() {
  return (
    <div className='maindiv'>
    <div className="update-form">
        <div className="container">
            <div className="left-column">
                <div>
                    <div className="title">Winner never quit,Quitters never win.</div>
                </div>


                <div className="profile-info">
                    <p className='para'>         
                        Your profile is 64% completed. A complete Profile has higher chances of landing a job. <span className="complete-now">Complete now</span>
                    </p>
                </div>
            </div>
            <div className="right-column"></div>
        </div>
        <hr className="horizontal-line" />
    </div>
</div>
  )
}
