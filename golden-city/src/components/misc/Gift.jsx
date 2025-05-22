import React from 'react'
import './Gift.css'
import building from "../../images/building.jpg"

const Gift = () => {
    return (
        <React.Fragment>
          <div className="gift">
            <div className="text">
              <h3>Lots of gifts to be won!</h3>
              <p>
                Please join our group where we can talk about the various current and future properties. In addition, there will be prizes to be won.
              </p>
              <a href=" https://discord.gg">
                <button className="gift-button">
                  Join the discord
                </button>
              </a>
            </div>
            <img className="building" src={building} alt="building"/>
          </div>
        </React.Fragment>
    )
}

export default Gift;