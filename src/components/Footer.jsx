import React from 'react'
import Container from './shared/Container'
import { FaFacebookF, FaTwitter, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router';

function Footer() {
  return (
    <div className=' bg-[#0B0500] text-white p-5 font-bold'>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 justify-center'>
            <div className='space-y-5'>
                <h1>SaRya</h1>
                <p>Your one-stop shop for all things fashion.</p>
            </div>
            <div className='space-y-4'>
                <h2>Quick Links</h2>
                <ul className='space-y-3'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="products">Shop</Link></li>
                    <li><Link to="About">About Us</Link></li>
                    <li><Link to="Contact">Contact Us</Link></li>
                </ul>
            </div>
            <div className='space-y-5 justify-start'>
                <h1>Follow Us</h1>
                <ul className='space-y-2 flex justify-start gap-5'>
                    <li><a href=""><FaFacebookF size={35} /></a></li>
                    <li><a href=""><FaTwitter size={35} /></a></li>
                    <li><a href=""><FaInstagramSquare size={35} /></a></li>
                    <li><a href=""><FaLinkedin size={35} /></a></li>
                </ul>
            </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
