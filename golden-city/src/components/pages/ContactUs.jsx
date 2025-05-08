import React from 'react'

const ContactUs = () => {
    return (
        <React.Fragment>
            <section className="content-container">
                <div className="textArea"> 
                    <h2>Contact Us</h2>
                    <p>
                        We would love to hear from you!.<br/>
                        For any enquiries, feel free to drop us an email!
                    </p>
                    <p>
                        How can we help you?
                    </p>
                </div>

                <div className="block">
                    <div className="row">
                        <div className="col-left">
                            <form id="contact" action="">
                                <h4>Leave us a message</h4>
                                <fieldset>
                                    <input placeholder="Your Name" type="text" tabIndex="1" required autoFocus />
                                </fieldset>
                                <fieldset>
                                    <input placeholder="Subject" type="text" tabIndex="2" required autoFocus />
                                </fieldset>
                                <fieldset>
                                    <input placeholder="Your Email Address" type="email" tabIndex="3" required />
                                </fieldset>
                                <fieldset>
                                    <input placeholder="Your Phone Number" type="tel" tabIndex="4" required />
                                </fieldset>
                                <fieldset>
                                    <textarea placeholder="Type your Message Here...." tabIndex="5" required></textarea>
                                </fieldset>
                                <fieldset>
                                    <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
                                </fieldset>
                            </form>
                        </div>
                        <div className="col-right">
                            <div id="details">
                                <h4>Drop by our Office</h4>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><i className="fa fa-map-marker fa- " ></i></td>
                                            <td>Your Company name,<br />
                                                G2 Dovedale Parc,<br />
                                                Random Street Name,<br />
                                                Post Code,<br />
                                                State. 
                                                <p></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><i className="fa fa-phone fa- " ></i></td>
                                            <td>Phone No : xx-xxxxxx</td>
                                        </tr>
                                        <tr>
                                            <td><i className="fa fa-clock-o fa- " ></i></td>
                                            <td>
                                                Operation Time:<br />
                                                9.00 am – 5.30 pm (Mon – Sat) <br />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><i className="fa fa-envelope fa- " ></i></td>
                                            <td>Email : rando@gmail.com</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default ContactUs;