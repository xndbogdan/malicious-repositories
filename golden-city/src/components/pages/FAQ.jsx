import React from 'react'
import "./FAQ.css";
import how from "../../datas/faqs/how.js";
import marketPlace from "../../datas/faqs/marketPlace.js";
import propertyManagement from "../../datas/faqs/propertyManagement.js";
import accounting from "../../datas/faqs/accounting.js";
import financial from "../../datas/faqs/financial.js";
import legal from "../../datas/faqs/legal.js";
import QnA from "../misc/QnA";
import { useEffect } from 'react';

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return (
        <React.Fragment>
            <section className="faq">
                <h1 className='page-heading'>FAQ</h1>
	    	<div>
	    	  <h2>General Information</h2>
	          {how.map((how, i) => <QnA n={i+1} q={how} />)}
	    	  <h2>Marketplace</h2>
        	  {marketPlace.map((m, i) => <QnA n={i+1} q={m} />)}
	          <h2>Property Management</h2>
                  {propertyManagement.map((p, i) => <QnA n={i+1} q={p} />)}
	          <h2>Accounting</h2>
                  {accounting.map((a, i) => <QnA n={i+1} q={a} />)}
	          <h2>Financial</h2>
                  {financial.map((f, i) => <QnA n={i+1} q={f} />)}
            <h2>Legal</h2>
                  {legal.map((l, i) => <QnA n={i+1} q={l} />)}
	    	</div>
	        <br/>
	        <br/>
            </section>
        </React.Fragment>
    )
}

export default About;
