import React, { useState } from 'react'
/// React router dom
import {Switch, Route } from 'react-router-dom'
/// Css
import './index.css'
import './chart.css'
import './step.css'

import Booking from './booking/Booking'
import BookingManager from './booking/BookingManager'

const Markup = () => {
    let path = window.location.pathname
    path = path.split('/')
    path = path[path.length - 1]
    let pagePath = path.split('-').includes('page')
    const [activeEvent, setActiveEvent] = useState(!path)

    const routes = [
        /// Booking System
        { url: '', component: Booking },
        { url: 'booking', component: Booking },
        { url: 'booking-manager', component: BookingManager },
        { url: 'page-login', component: Booking }
    ]

    return (
        <> 
            <div className={`${!pagePath ? 'container-fluid' : ''}`} style={{ minHeight: window.screen.height - 60 }}>
                <Switch>
                {routes.map((data, i) => (
                    <Route key={i} exact path={`/${data.url}`} component={data.component} />
                ))}
                </Switch>
            </div>
        </>
    )
}

export default Markup
