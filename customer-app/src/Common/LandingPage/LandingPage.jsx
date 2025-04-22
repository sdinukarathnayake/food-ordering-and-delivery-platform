import React from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <div className='landing-page-container'>
            <section className='hero-section'>
                <h2 className='hero-heading'>Order.Eat and Repeat!!!</h2>
                <p className='hero-paragraph'>Deliciuos food delivered at your door step</p>
                <button className='hero-button'>Order now</button>
            </section>

            <section className='features-section'>
                <div className='feature-card'>
                    <h3>Fresh food</h3>
                    <p>We deliver fresh food at your door step</p>
                </div>

                <div className='feature-card'>
                    <h3>Track your food delivery</h3>
                    <p>Our real time food delivery tracker allows you to track the location of your food</p>
                </div>

                <div className='feature-card'>
                    <h3>Secure Payments</h3>
                    <p>Your payment details are secure with us.</p>
                </div>
            </section>

        </div>
    )
}

export default LandingPage
