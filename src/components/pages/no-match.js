import React from 'react'
import { Link } from 'react-router-dom'

export default function() {
    return (
        <div>
            <h2>Sorry! We could not find that page!</h2>
            <div>
            <Link to='/'>Return to homepage</Link>
            </div>
        </div>
    )
}