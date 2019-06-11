import React, { Component } from "react";
import AuthService from '../components/authentication';
import { Link, Router } from '../routes';
import Head from 'next/head';
import ClipLoader from 'react-spinners/ClipLoader';
import Notifications, {notify} from 'react-notify-toast';

export default class LoginPage extends Component {

    state = {
        email: '',
        password: '',
        user: {},
        currentUser: {},
        loggedIn: false,
        loading: false
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
    linkActive = {
        backgroundColor: '#ff2211'
    };
    footer = {
        background: '-webkit-linear-gradient(to right, #f7b733, #fc4a1a)',
        background: 'linear-gradient(to right, #f7b733, #fc4a1a)',
        fontSize:'16px',
        color: 'aliceblue'
    };
    componentDidMount() {
        this.setState({ loggedIn: localStorage.getItem('currentUser') ? true: false , user: JSON.parse(localStorage.getItem('currentUser'))});
    }
    
    login = async (event) => {
        event.preventDefault();
        await this.setState({ email: $('#email').val(), password: $('#password').val() });
        this.setState({ loading: true });
        AuthService.login(this.state.email, this.state.password)
        .then((res) => {
            this.setState({ user: res.data });
            notify.show('Login successful', 'success', 20000);
            if (this.state.user && this.state.user.token) {
                this.setState({ loading: false });
                localStorage.setItem('currentUser', JSON.stringify(this.state.user));
                Router.pushRoute(`/user/${this.state.user.id}`);
            }
        }, (err) => {
            this.setState({ loading: false });
            notify.show(err.message, 'error', 20000);
        });

    }

    render() {
        if(!this.state.loggedIn) {
            return (
                <div>
                    <Notifications options={{zIndex: 500, top: '450px'}} />
                    <div style={this.busyIndicator}>
                            <ClipLoader
                                sizeUnit={'px'}
                                size={250}
                                color={'#000'}
                                css={this.busyIndicator}
                                loading={this.state.loading}
                            />
                    </div>
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
                                <li><Link route={`/`}><a href="#" style={this.navLogo}>Home</a></Link></li>
                                <li><a href="#contact" style={this.navLogo}>Contact us</a></li>
                                <li><Link route={`/allcontracts`}><a href="#" style={this.navLogo}>All Elections</a></Link></li>
                                <li><Link route={`/signup`}><a href="#" style={this.navLogo}>Sign up</a></Link></li>
                                <li style={this.linkActive}><Link route={`/login`}><a href="#" style={this.navLogo}>Login</a></Link></li>
                            </ul>
                            </div>
                        </div>
                    </nav>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="container" style={{width: 650}}>
                        <div className="row">
                            <div className="col-lg-8 col-md-10 col-sm-10 col-xs-12 center-block">
                        <form onSubmit={this.login} className="loginForm">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input className="form-control" id="email" name="email" autoComplete="email" id="email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input className="form-control" id="password" name="password" autoComplete="current-password" type="password" id="password"/>
                            </div>
                                <button type="submit" className="btn btn-success">Login</button>
                                <Link route={`/signup`} ><a style={{marginLeft: 10}} href="#">Sign up</a></Link>
                                <Link route={`/forgotPassword`}><a style={{marginLeft: 10}} href="#">Forgot password?</a></Link>
                        </form>
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
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <footer className="container-fluid text-center" style={this.footer}>
                        <p style={{color: 'aliceblue', paddingTop: '15px'}}>&copy;<a style={{color: 'aliceblue'}} href="https://tayyib-a60.github.io/Adesokan/" title="Visit Toyeeb Adesokan">Adesokan Toyeeb</a></p>
            </footer>
        </div>
            );
        } else {
            return (
                <div>
                    <Notifications options={{zIndex: 500, top: '450px'}} />
                    <div style={this.busyIndicator}>
                            <ClipLoader
                                sizeUnit={'px'}
                                size={250}
                                color={'#000'}
                                css={this.busyIndicator}
                                loading={this.state.loading}
                            />
                    </div>
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
                                <li><Link route={`/`}><a href="#" style={this.navLogo}>Home</a></Link></li>
                                <li><a href="#contact" style={this.navLogo}>Contact us</a></li>
                                <li><Link route={`/allcontracts`}><a href="#" style={this.navLogo}>All Elections</a></Link></li>
                                <li><Link route={`/user/${this.state.user.id}`}><a href="#" style={this.navLogo}>My Elections</a></Link></li>
                                <li><Link route={`/signup`}><a href="#" style={this.navLogo}>Sign up</a></Link></li>
                                <li style={this.linkActive}><Link route={`/login`}><a href="#" style={this.navLogo}>Login</a></Link></li>
                            </ul>
                            </div>
                        </div>
                    </nav>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="container" style={{width: 650}}>
                        <div className="row">
                            <div className="col-lg-8 col-md-10 col-sm-10 col-xs-12 center-block">
                                <h3>You're already logged in</h3>
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
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    <footer className="container-fluid text-center" style={this.footer}>
                    <p style={{color: 'aliceblue', paddingTop: '15px'}}>&copy;<a style={{color: 'aliceblue'}} href="https://tayyib-a60.github.io/Adesokan/" title="Visit Toyeeb Adesokan">Adesokan Toyeeb</a></p>
                    </footer>
                </div>
            );
        }
    }
}