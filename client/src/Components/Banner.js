import React from 'react'

function Banner({bigheader, subtext}) {

    return (
        <div className="hero-image">
            <div className="hero-text">
                <h1>{bigheader}</h1>
                <p>{subtext}</p>
            </div>
        </div>
    )
}

export default Banner
