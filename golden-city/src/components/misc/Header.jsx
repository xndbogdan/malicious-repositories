import React from 'react'
//import { Link } from "react-router-dom"
import './Header.css'

const Header = () => {
    return (
        <React.Fragment>
            <header className="bg-image">
                <div className="bg-container">
                    <h1 style={{ color: 'white', fontSize: '60px' }}>
                      Invest and Trade in Real Estate with Cryptocurrency
                    </h1>                
                    {/* <p style={{ color: 'blue', fontSize: '30px' }}>
                        NFTs & Web3 for transparency, authenticity and sustainability
                    </p> */}
                    <a href="#properties" className="action">
                      See Our Properties
                    </a>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header;