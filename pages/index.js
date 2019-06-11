import React, { Component } from "react";
import { Router, Link } from '../routes';
import Head from 'next/head';
import AuthService from "../components/authentication";
import ClipLoader from 'react-spinners/ClipLoader';
import Notifications, {notify} from 'react-notify-toast';

class HomePage extends Component {
    state = {
        loggedIn: false,
        currentUser: {},
        contactUs: {},
        loading: true
    };
    busyIndicator = {
        display: 'flex',
        justifyContent: 'center',
        top: '50%',
        left: '40%',
        marginTop: '-15rem',
        zIndex: 1877,
        position: 'fixed'
    }
    navbar = {
            marginBottom: 0,
            background: '#fc4a1a',
            background: '-webkit-linear-gradient(to right, #fc4a1a, #f7b733)',
            background: 'linear-gradient(to right, #fc4a1a, #f7b733)',
            zIndex: 999,
            border: 0,
            lineHeight: '1.42857143 !important',
            letterSpacing: '4px',
            borderRadius: 0,
            fontFamily: 'Montserrat, sans-serif'
    };
    aboutSection = {
        background: '#e65c00',
        fontSize: 'larger',
        background: '-webkit-linear-gradient(to right, #e65c00, #f9d423)',
        background: 'linear-gradient(to right, #e65c00, #f9d423)',
        marginTop: '-20rem',
        paddingTop: '15rem',
        color: 'aliceblue',
        paddingBottom: '18rem',
        WebkitClipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 87%)',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 87%))'
    };
    contactSection = {
        color: 'aliceblue',
        fontSize: 'larger',
        background: '#ff512f',
        background: '-webkit-linear-gradient(to right, #ff512f, #f09819)',
        background: 'linear-gradient(to right, #ff512f, #f09819)',
        marginTop: '-38rem',
        paddingTop: '24rem',
        paddingBottom: '10rem'
    };

    headerImage = {
        height: '90vh',
        backgroundImage: 'linear-gradient(to right bottom,rgba(247, 183, 51, .5), rgba(252, 74, 26, .5)),url(static/ballot.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'auto',
        position: 'relative',
        WebkitClipPath: 'polygon(0 0, 100% 0, 100% 81vh, 0 100%)', clipPath: 'polygon(0 0, 100% 0, 100% 81vh, 0 100%)'
        , zIndex: 100
    };

    navLogo = {
        color: 'aliceblue',
        fontSize: 'large',
        fontWeight: '500',
        zIndex: 1009
    };
    navItem = {
        fontSize: 'medium',
        fontWeight: '300'
    }
     bgColor = {
        color: '#f4511e !important',
        backgroundColor: 'transparent'
    };
    nameEmailRow = {
        paddingBottom: '3rem',
        display: 'flex',
        justifyContent: 'center'
    };
    messageRow = {
        display: 'flex',
        justifyContent: 'center'
    };
    submitButton = {
        marginLeft: '22.5rem',
        color: 'aliceblue',
        padding: '.75rem',
        fontSize: '16px',
        background: 'linear-gradient(to right, #ff512f, #f09819)',
        border: '1px solid transparent'
        // boxShadow: '-1px -2px #000'
    };
    slide = {
        animationName: 'slide',
        WebkitAnimationName: 'slide',
        animationDuration: '1s',
        WebkitAnimationDuration: '1s',
        visibility: 'visible'
    }
    linkActive = {
        backgroundColor: '#ff2211'
    }
    footer = {
        background: '-webkit-linear-gradient(to right, #f7b733, #fc4a1a)',
        background: 'linear-gradient(to right, #f7b733, #fc4a1a)',
        fontSize:'16px',
        color: 'aliceblue'
    }

    componentDidMount() {
        this.setState({ loggedIn: localStorage.getItem('currentUser') ? true: false, currentUser: JSON.parse( localStorage.getItem('currentUser')), loading: false});
        console.log((new Date()).toLocaleTimeString());
        
    }

    logout = (event) => {
        event.preventDefault();
        localStorage.removeItem('currentUser');
        Router.pushRoute('/login');
    }
    slideAnimation() {
    }
    sendMessage = async (event) => {
        event.preventDefault();
        await this.setState({ loading: true });
        const name = $('#name').val();
        const email = $('#email').val();
        const message = $('#message').val();
        await this.setState({ contactUs : {fromName: name,
            fromEmail: email,
            fromMessage: message} });
            
            AuthService.contactUs(this.state.contactUs).then((res) => {
                notify.show(`Success, we'll be in touch`, 'success', 20000);
                document.getElementById('contactForm').reset();
                this.setState({ loading: false });
            }, (err) => {
                notify.show(`err.message`, 'error', 20000);
                console.log(`An unexpected error occured`, );
                this.setState({ loading: false });
        }, () => {
            console.log('Sent');
        })
    }
    showLoading = async (event) => {
        event.preventDefault();
        this.setState({loading: true});
    }
    hoverButton() {
        document.getElementById('submitButton').style.background = 'linear-gradient(to right, #ff512f, #ff512f)';
    }
    resetButton() {
        document.getElementById('submitButton').style.background = 'linear-gradient(to right, #ff512f, #f09819)';
    }
    render() {
        if(this.state.loggedIn) {

            return (
                <div>
                    <Notifications options={{zIndex: 500, top: '450px'}} />
                    <Head>
                        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"></link>
                        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossOrigin="anonymous"></script>
                    </Head>
                    <nav className="navbar navbar-fixed-top" style={this.navbar}>
                        <div className="container">
                            <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar" style={{backgroundColor: 'aliceblue'}}></span>
                                <span className="icon-bar" style={{backgroundColor: 'aliceblue'}}></span>
                                <span className="icon-bar" style={{backgroundColor: 'aliceblue'}}></span>                        
                            </button>
                            <Link route={`/`}>
                            <a className="navbar-brand" href="#" style={this.navLogo}>VotingBlock</a>
                            </Link>
                            </div>
                            <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li style={this.linkActive}><Link route={`/`}><a href="#" style={this.navLogo}>Home</a></Link></li>
                                <li><a href="#contact" style={this.navLogo} onClick={this.slideAnimation()}>Contact us</a></li>
                                <li><Link route={`/allcontracts`}><a href="#" style={this.navLogo}>All Elections</a></Link></li>
                                <li><Link route={`/user/${this.state.currentUser.id}`}><a href="#" style={this.navLogo}>My Elections</a></Link></li>
                                <li><Link route={`/signup`}><a href="#" style={this.navLogo}>Sign up</a></Link></li>
                                <li><a href="#" onClick={this.logout} style={this.navLogo}>Logout</a></li>
                            </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="page-header" className="img-responsive" style={this.headerImage}>
                    </div>
                    <div style={this.busyIndicator}>
                            <ClipLoader
                                sizeUnit={'px'}
                                size={250}
                                color={'#000'}
                                css={this.busyIndicator}
                                loading={this.state.loading}
                            />
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div id="services" style={this.aboutSection} className="container-fluid text-center">
                        <div style={{marginTop: '10 !important'}}>
                        <h2>SERVICES</h2>
                        <h4>What we offer</h4>
                        <br></br>
                        </div>
                        <br></br>
                        <div className="row slideanim">
                            <div className="col-sm-4">
                            <span className="glyphicon glyphicon-off logo-small"></span>
                            <h4>POWER</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                            <div className="col-sm-4">
                            <span className="glyphicon glyphicon-heart logo-small"></span>
                            <h4>LOVE</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                            <div className="col-sm-4">
                            <span className="glyphicon glyphicon-lock logo-small"></span>
                            <h4>JOB DONE</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                        </div>
                        <br></br><br></br>
                        <br></br><br></br>
                        <br></br><br></br>
                        <div className="row slideanim">
                            <div className="col-sm-4">
                            <span className="glyphicon glyphicon-leaf logo-small"></span>
                            <h4>GREEN</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                            <div className="col-sm-4">
                            <span className="glyphicon glyphicon-certificate logo-small"></span>
                            <h4>CERTIFIED</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                            <div className="col-sm-4">
                            <span className="glyphicon glyphicon-wrench logo-small"></span>
                            <h4>HARD WORK</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                        </div>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div id="contact" style={this.contactSection} className="container-fluid bg-grey slideanim">
                        <h2 className="text-center" style={{ paddingBottom: '5rem' }}>CONTACT</h2>
                        <div className="row" style={{ paddingBottom: '3rem', display: 'flex', justifyContent: 'center !important'}}>
                            <div className="col-sm-8 col-xs-12" style={{ margin: '0 auto', display: 'flex', flexWrap: 'nowrap' }}>
                            <p style={{ paddingRight: '1rem'}}>Do you have something for us?</p>
                            <p style={{ paddingRight: '1rem'}}><span className="glyphicon glyphicon-map-marker"></span> Lagos, Nigeria</p>
                            <p style={{ paddingRight: '1rem'}}><span className="glyphicon glyphicon-phone"></span> +234 8030951913</p>
                            <p style={{ paddingRight: '1rem'}}><span className="glyphicon glyphicon-envelope"></span> adesokantayyib@gmail.com</p>
                            </div>
                        </div>
                        <form onSubmit={this.sendMessage} id="contactForm">
                        <div className="row" style={this.nameEmailRow}>
                                <div className="col-sm-4 col-xs-6 form-group">
                                <input className="form-control" id="name" name="name" placeholder="Name" type="text" required></input>
                                </div>
                                <div className="col-sm-4 col-xs-6 form-group">
                                <input className="form-control" id="email" name="email" placeholder="Email" type="email" required></input>
                                </div>
                        </div>
                        <div className="row" style={this.messageRow}>
                            <div className="col-sm-8 col-xs-8 form-group" >
                            <textarea className="form-control" id="message" name="comments" placeholder="Your message" rows="8"></textarea><br></br>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8 col-xs-8 form-group">
                            <button className="btn btn-default" id="submitButton" onMouseOver={this.hoverButton} onMouseLeave={this.resetButton} style={this.submitButton} type="submit">Submit</button>
                            </div>
                        </div>
                        </form>
                        </div>
                        <footer className="container-fluid text-center" style={this.footer}>
                        <p style={{color: 'aliceblue', paddingTop: '15px'}}>&copy;<a style={{color: 'aliceblue'}} href="https://tayyib-a60.github.io/Adesokan/" title="Visit Toyeeb Adesokan">Adesokan Toyeeb</a></p>
                        </footer>
                </div>
            );
        } else {
            return (
                <div>
                    <Notifications options={{zIndex: 500, top: '450px'}} />
                    <Head>
                        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"></link>
                        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossOrigin="anonymous"></script>
                    </Head>
                    <nav className="navbar navbar-fixed-top" style={this.navbar}>
                        <div className="container">
                            <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar" style={{backgroundColor: 'aliceblue'}}></span>
                                <span className="icon-bar" style={{backgroundColor: 'aliceblue'}}></span>
                                <span className="icon-bar" style={{backgroundColor: 'aliceblue'}}></span>                        
                            </button>
                            <Link route={`/`}>
                            <a className="navbar-brand" href="#" style={this.navLogo}>VotingBlock</a>
                            </Link>
                            </div>
                            <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li style={this.linkActive}><Link route={`/`}><a href="#" style={this.navLogo}>Home</a></Link></li>
                                <li><a href="#contact" style={this.navLogo} onClick={this.slideAnimation()}>Contact us</a></li>
                                <li><Link route={`/allcontracts`}><a href="#" style={this.navLogo}>All Elections</a></Link></li>
                                <li><Link route={`/signup`}><a href="#" style={this.navLogo}>Sign up</a></Link></li>
                                <li><Link route={`/login`}><a href="#" style={this.navLogo}>Login</a></Link></li>
                            </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="page-header" className="img-responsive" style={this.headerImage}>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div id="services" style={this.aboutSection} className="container-fluid text-center">
                        <div style={{marginTop: '10 !important'}}>
                        <h2>SERVICES</h2>
                        <h4>What we offer</h4>
                        <br></br>
                        </div>
                        <br></br>
                        <div className="row slideanim">
                            <div className="col-sm-4">
                            <span className="glyphicon glyphicon-off logo-small"></span>
                            <h4>POWER</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                            <div className="col-sm-4">
                            <span className="glyphicon glyphicon-heart logo-small"></span>
                            <h4>LOVE</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                            <div className="col-sm-4">
                            <span className="glyphicon glyphicon-lock logo-small"></span>
                            <h4>JOB DONE</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                        </div>
                        <br></br><br></br>
                        <br></br><br></br>
                        <br></br><br></br>
                        <div className="row slideanim">
                            <div className="col-sm-4">
                            <span className="glyphicon glyphicon-leaf logo-small"></span>
                            <h4>GREEN</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                            <div className="col-sm-4">
                            <span className="glyphicon glyphicon-certificate logo-small"></span>
                            <h4>CERTIFIED</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                            <div className="col-sm-4">
                            <span className="glyphicon glyphicon-wrench logo-small"></span>
                            <h4>HARD WORK</h4>
                            <p>Lorem ipsum dolor sit amet..</p>
                            </div>
                        </div>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div id="contact" style={this.contactSection} className="container-fluid bg-grey slideanim">
                        <h2 className="text-center" style={{ paddingBottom: '5rem' }}>CONTACT</h2>
                        <div className="row" style={{ paddingBottom: '3rem', display: 'flex', justifyContent: 'center !important'}}>
                            <div className="col-sm-8 col-xs-12" style={{ margin: '0 auto', display: 'flex', flexWrap: 'nowrap' }}>
                            <p style={{ paddingRight: '1rem'}}>Do you have something for us?</p>
                            <p style={{ paddingRight: '1rem'}}><span className="glyphicon glyphicon-map-marker"></span> Lagos, Nigeria</p>
                            <p style={{ paddingRight: '1rem'}}><span className="glyphicon glyphicon-phone"></span> +234 8030951913</p>
                            <p style={{ paddingRight: '1rem'}}><span className="glyphicon glyphicon-envelope"></span> adesokantayyib@gmail.com</p>
                            </div>
                        </div>
                        <form onSubmit={this.sendMessage} id="contactForm">
                        <div className="row" style={this.nameEmailRow}>
                                <div className="col-sm-4 col-xs-6 form-group">
                                <input className="form-control" id="name" name="name" placeholder="Name" type="text" required></input>
                                </div>
                                <div className="col-sm-4 col-xs-6 form-group">
                                <input className="form-control" id="email" name="email" placeholder="Email" type="email" required></input>
                                </div>
                        </div>
                        <div className="row" style={this.messageRow}>
                            <div className="col-sm-8 col-xs-8 form-group" >
                            <textarea className="form-control" id="message" name="comments" placeholder="Your message" rows="8"></textarea><br></br>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8 col-xs-8 form-group">
                            <button className="btn btn-default" id="submitButton" onMouseOver={this.hoverButton} onMouseLeave={this.resetButton} style={this.submitButton} type="submit">Submit</button>
                            </div>
                        </div>
                        </form>
                        </div>
                        <footer className="container-fluid text-center" style={this.footer}>
                        <p style={{color: 'aliceblue', paddingTop: '15px'}}>&copy;<a style={{color: 'aliceblue'}} href="https://tayyib-a60.github.io/Adesokan/" title="Visit Toyeeb Adesokan">Adesokan Toyeeb</a></p>
                        </footer>
                </div>
                );
        }
    }
}
export default HomePage;