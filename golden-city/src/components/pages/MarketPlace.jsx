import React from 'react'
import "./About.css";
import Property from '../misc/Property';
import properties from "../../datas/properties"
// import comingSoon from "../../images/coming-soon-p.png"
import { useEffect } from 'react';

const MarketPlace = () => {

  useEffect(() => {
        window.scrollTo(0, 0)
    })
    return (
        <React.Fragment>
            <section className="about">
                <h1 className='page-heading'>MarketPlace</h1>
                <div className="market-contents">
                {/* <div className='coming-soon' style={{ backgroundImage: `url(${comingSoon})` }}></div> */}
                  <div className="pr-header">
                    <h3 id="properties">Among our properties already financed</h3>
                    <h3 className="cl-blue">View All</h3>
                  </div>
                  <div className="properties">
                  {properties.map((property) => <Property property={property}/>)}
                  </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default MarketPlace;