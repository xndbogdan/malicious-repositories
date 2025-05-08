import React from 'react'
import { useEffect } from 'react';

const NotFound = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return (
        <React.Fragment>
            <section className="not-found">
                <h1 className='page-heading'>Page not found</h1>
	    <p>Error 404: The page your're looking for does not exist!</p>
            </section>
        </React.Fragment>
    )
}

export default NotFound;
