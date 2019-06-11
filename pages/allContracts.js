import React, { Component } from "react";
import { Router, Link } from '../routes';
import factory from '../ethereum/factory';
import ClipLoader from 'react-spinners/ClipLoader';
import Head from 'next/head';

class AllElections extends Component {
    state = {
        loggedIn: false,
        currentUser: {},
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
    linkActive = {
        backgroundColor: '#ff2211'
    }
    footer = {
        background: '-webkit-linear-gradient(to right, #f7b733, #fc4a1a)',
        background: 'linear-gradient(to right, #f7b733, #fc4a1a)',
        fontSize:'16px',
        color: 'aliceblue'
    }
    async componentDidMount() {
        await this.setState({ loggedIn: localStorage.getItem('currentUser') ? true: false, currentUser: JSON.parse(localStorage.getItem('currentUser')), loading: false });
    }
    static async getInitialProps(props) {
        const userId = props.query.id;
        const elections = await factory.methods.getCreatedElections().call();
        console.log('Elections', elections);
        return { elections, userId };
    }

    logout = (event) => {
        event.preventDefault();
        localStorage.removeItem('currentUser');
        Router.pushRoute('/login');
    }

    renderElections() {
            let items = [];
            this.props.elections.forEach((element,i) => {
                const disp =  <tr key={i}>
                <td>{i + 1}</td>
                <td>{element}</td>
                <td>
                    <Link route={`/elections/${element}`}>
                        <a href="#" className="centered" >goto election</a>
                    </Link>
                </td>
            </tr>;
                    items.push(disp);
                });
            return items;
    }
    render() {
        if (this.state.loggedIn && this.state.currentUser.roles == "Admin") {
            return (
                <div>
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
                                <li style={this.linkActive}><Link route={`/allcontracts`}><a href="#" style={this.navLogo}>All Elections</a></Link></li>
                                <li><Link route={`/user/${this.state.currentUser.id}`}><a href="#" style={this.navLogo}>My Elections</a></Link></li>
                                <li><Link route={`/signup`}><a href="#" style={this.navLogo}>Sign up</a></Link></li>
                                <li><a href="#" onClick={this.logout} style={this.navLogo}>Logout</a></li>
                            </ul>
                            </div>
                        </div>
                    </nav>
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
                <div className="container" style={{width: 650}}>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-10 col-xs-12">
                            <div className="center-block">
                            <h3 className="text-center text--cap">Hi there, These are are all Deployed Elections on this contract</h3>
                            <div className="panel panel-default">
                                    <div className="panel-heading text-center">Deployed Election</div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Election Address</th>
                                                <th>Go To</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                    {this.renderElections()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
                <footer className="container-fluid text-center" style={this.footer}>
                        <p style={{color: 'aliceblue', paddingTop: '15px'}}>&copy;<a style={{color: 'aliceblue'}} href="https://tayyib-a60.github.io/Adesokan/" title="Visit Toyeeb Adesokan">Adesokan Toyeeb</a></p>
                </footer>
                 </div>
            );
        } else {
            return (
                <div>
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
                                <li style={this.linkActive}><Link route={`/allcontracts`}><a href="#" style={this.navLogo}>All Elections</a></Link></li>
                                <li><a href="#" onClick={this.logout} style={this.navLogo}>Login</a></li>
                                <li><Link route={`/signup`}><a href="#" style={this.navLogo}>Sign up</a></Link></li>
                            </ul>
                            </div>
                        </div>
                    </nav>
                    <div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h2 style={{textAlign: 'center', padding: '5rem', fontSize: '700'}}>Error 404:Page Not Found</h2>
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
                <footer className="container-fluid text-center" style={this.footer}>
                        <p style={{color: 'aliceblue', paddingTop: '15px'}}>&copy;<a style={{color: 'aliceblue'}} href="https://tayyib-a60.github.io/Adesokan/" title="Visit Toyeeb Adesokan">Adesokan Toyeeb</a></p>
                </footer>
                </div>
                
            );
        }
    }
}
export default AllElections;