import React, { Component } from "react";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Router, Link } from '../routes';
import Head from 'next/head';
import Notifications, {notify} from 'react-notify-toast';

class ResetPassword extends Component {

    state = {
        email: '',
        password: '',
        userName: '',
        user: {}
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
    
    static async getInitialProps(props) {
        let isDisabled = false;
        const token = props.query;
        const user = jwt_decode(token.token);
        if (Date.now() >= user.exp * 1000) {
            isDisabled = true;
        }
        return { user, isDisabled };
    }
    componentDidMount() {
        if(this.props.isDisabled) {
            notify.show('Your token has expired', 'warning', 20000);
            Router.pushRoute('/login');
        }
    }
    
    updateUser = async (event) => {
        event.preventDefault();
        const user = {
            userId: this.props.user.primarysid,
            userName: this.props.user.unique_name,
            userEmail: this.props.user.nameid,
            password: this.state.password
        };
        axios.put(`http://localhost:5000/api/voting/user/${this.props.user.primarysid}`, user)
        .then((res) => {
            notify.show('User parameters updated', 'success', 20000);
            Router.pushRoute('/login');
        });
    }

    render() {
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
                                <li><Link route={`/`}><a href="#" style={this.navLogo}>Home</a></Link></li>
                                <li><a href="#contact" style={this.navLogo}>Contact us</a></li>
                                <li><Link route={`/allcontracts`}><a href="#" style={this.navLogo}>All Elections</a></Link></li>
                                <li><Link route={`/signup`}><a href="#" style={this.navLogo}>Sign up</a></Link></li>
                                <li><Link route={`/login`}><a href="#" style={this.navLogo}>Login</a></Link></li>
                            </ul>
                            </div>
                        </div>
                    </nav>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="container" style={{width: 650}}>
                    <div className="row">
                        <div className="col-lg-8 col-md-10 col-sm-10 col-xs-12 center-block">
                    <form onSubmit={this.updateUser}>
                        <div className="form-group">
                            <label htmlFor="userName">Full Name</label>
                            <input className="form-control" autoComplete="username" disabled={true} value={this.props.user.unique_name} id="userName"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" autoComplete="email" disabled={true} value={this.props.user.nameid} id="email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" autoComplete="current-password" onChange={event => this.setState({ password: event.target.value})} id="password"/>
                        </div>
                            <button type="submit" disabled={this.props.isDisabled} className="btn btn-success">Submit</button>
                    <Link route={`/forgotPassword`} ><a style={{marginLeft: 10}} href="#">Forgot password?</a></Link>
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
        <footer className="container-fluid text-center" style={this.footer}>
        <p style={{color: 'aliceblue', paddingTop: '15px'}}>&copy;<a style={{color: 'aliceblue'}} href="https://tayyib-a60.github.io/Adesokan/" title="Visit Toyeeb Adesokan">Adesokan Toyeeb</a></p>
        </footer>
            </div>
        )
    }
}
export default ResetPassword;