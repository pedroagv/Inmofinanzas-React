import React from 'react';
import './RedSocial.css'
import { socialMediaData } from './SocialMediaData';

const RedSocial = () => {
    return (
        <div className="container p-3 contenedor-red-social">
            <div className="row">
                <div className="col-md-12 ">
                    <h3 className="font-bold my-4 border-bottom border-2">Nuestras redes sociales</h3>
                </div>

                {socialMediaData.map((button, index) => (
                    <div key={index} className="col-md-12 text-center mb-2">
                        <a className={`btn btn-red-social ${button.className} w-75`} href={button.href} target="_blank" rel="noopener noreferrer" id={`link-${button.name}`}>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 35 24">
                                <g id={`ic_${button.name}`}>
                                    <path id={button.name} d={button.svgPath}></path>
                                </g>
                            </svg>
                            InmoFinanzas AGV
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RedSocial;
