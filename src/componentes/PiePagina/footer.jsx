import React from 'react';

function Footer() {
    return (
        <footer className="bg-dark text-white py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h3 className="text-lg font-bold mb-4">About Us</h3>
                        <p className="text-gray-400 mb-4">
                            We are a leading real estate company dedicated to helping our clients find their dream properties.
                        </p>
                        <a href="/" className="btn btn-primary">
                            Learn More
                        </a>
                    </div>
                    <div className="col-md-3">
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="list-unstyled text-gray-400">
                            <li>
                                <a href="/">Properties</a>
                            </li>
                            <li>
                                <a href="/">Agents</a>
                            </li>
                            <li>
                                <a href="/">About</a>
                            </li>
                            <li>
                                <a href="/">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <p className="text-gray-400 mb-2">123 Main Street, Anytown USA</p>
                        <p className="text-gray-400 mb-2">Phone: (123) 456-7890</p>
                        <p className="text-gray-400 mb-2">Email: info@realestatecompany.com</p>
                    </div>
                    <div className="col-md-3">
                        <h3 className="text-lg font-bold mb-4">Newsletter</h3>
                        <p className="text-gray-400 mb-4">
                            Subscribe to our newsletter to stay up-to-date with the latest news and listings.
                        </p>
                        <form className="d-flex">
                            <input type="email" placeholder="Enter your email" className="form-control me-2" />
                            <button type="submit" className="btn btn-primary">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
