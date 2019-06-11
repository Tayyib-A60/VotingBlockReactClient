import React, { Component } from "react";
import Election from '../../ethereum/election';
import web3 from "../../ethereum/web3";
import { Router, Link } from '../../routes';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import Head from 'next/head';
import Notifications, {notify} from 'react-notify-toast';

class Vote extends Component {

    state = {
        candidateName: '',
        errorMessage: '',
        choice: '',
        loggedIn: false,
        loading: true,
        currentUser: {}
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
        const { address } = props.query;
        const election = Election(address);
        // election.address = props.query.address;
        const description = await election.methods.electionDescription().call();
        const numOfCandidates = await election.methods.candidatesCount().call();
        
        let candidates = [];
        for(let i = 1; i <= parseInt(numOfCandidates); i++) {
            const candidate = await election.methods.candidates(i).call();
            candidates.push(candidate);
        }
        
        return { description: description, address: address, election: election, candidates: candidates };
    }

    async componentDidMount() {
        await this.setState({ loggedIn: localStorage.getItem('currentUser') ? true: false, currentUser: JSON.parse( localStorage.getItem('currentUser')), loading: false });
    }

    logout = (event) => {
        event.preventDefault();
        localStorage.removeItem('currentUser');
        Router.pushRoute('/login');
    }

    addCandidate = async (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const election = this.props.election;
        await this.setState({ candidateName: $('#candidateName').val() });
        const candidateName = this.state.candidateName;
        console.log(candidateName);
        try {
            const accounts = await web3.eth.getAccounts();
            await election.methods.addCandidate(candidateName).send({
                from: accounts[0]
            });
            await this.setState({ loading: false });
            Router.replaceRoute(`/elections/${this.props.address}`);
            notify.show('Candidate added successfully', 'success', 20000);
        } catch (error) {
            this.setState({ loading: false });
            notify.show(error.message, 'success', 20000);
        }
    }

    renderCandidates() {
        if(this.state.loggedIn) {
            let items = [];
            this.props.candidates.forEach((candidate, index) => {
                console.log( candidate[1], parseInt(candidate[2]));
                const candidateData = <tr key={index}>
                    <td>{parseInt(candidate[0])}</td>
                    <td>{candidate[1]}</td>
                    <td>{parseInt(candidate[2])}</td>
                    </tr>;
                items.push(candidateData);
            });
            return items;
        }
    }
    getElectionResult = (event) => {
        event.preventDefault();
        const userEmail = this.state.currentUser.email;
        let results = [];
        results.push({candidateName: userEmail, voteCount: 0});
        this.props.candidates.forEach(candidate => {
            results.push({candidateName: candidate[1], voteCount: parseInt(candidate[2])});
        });
        axios.post(`https://votingblockapi.herokuapp.com/api/voting/user/sendResults`, results).then((res) => {
            notify.show('Election results has been sent to your email', 'success', 20000);
        }, (err) => {
            notify.show(err.message, 'error', 20000);
        });
    }
    renderOptions() {
        if(this.state.loggedIn) {
            let items = [];
            this.props.candidates.forEach((candidate, index) => {
                const optionData = <option key={index} value={parseInt(candidate[0])}>{candidate[1]}</ option>;
                items.push(optionData);
            });
            return items;
        }
    }

    castVote = async (event) => {
        event.preventDefault();
        await this.setState({ loading: true });
        if(this.state.loggedIn) {
            try {
                const accounts = await web3.eth.getAccounts();
                const election = this.props.election;
                await election.methods.vote((this.state.choice)).send({from: accounts[0]});
                this.setState({ loading: false });
                Router.replaceRoute(`/elections/${this.props.address}`);
                notify.show('Vote casted successfully', 'success', 20000);
            } catch (error) {
                notify.show(error.message, 'error', 20000);
                this.setState({ loading: false });
            }
        }
    }

    render() {
        if(this.state.loggedIn) {
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
                    <nav className="navbar navbar-fixed-top" style={this.navbar} >
                        <div className="container">
                            <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>                        
                            </button>
                            <Link route={`/`}>
                            <a className="navbar-brand" href="#" style={this.navLogo}>VotingBlock</a>
                            </Link>
                            </div>
                            <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right" style={this.navItem}>
                                <li><Link route={`/`}><a href="#" style={this.navLogo}>Home</a></Link></li>
                                <li><Link route={`/allcontracts`}><a href="#" style={this.navLogo}>All Elections</a></Link></li>
                                <li><Link route={`/user/${this.state.currentUser.id}`}><a href="#" style={this.navLogo}>My Elections</a></Link></li>
                                <li><Link route={`/new`}><a href="#" style={this.navLogo}>Deploy new</a></Link></li>
                                <li><a href="#" style={this.navLogo} onClick={this.logout}>Logout</a></li>
                            </ul>
                            </div>
                        </div>
                    </nav>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                <div className="container" style={{width: 800}}>
                    <div className="row">
                        <div className="col-lg-8 col-md-10 col-sm-10 col-xs-12 center-block">
                       <h2>{this.props.description}</h2>
                       <br></br>
                        <div>
                        <form onSubmit={this.addCandidate}>
                            <div className="form-group">
                                <label htmlFor="candidateName">Candidate Name</label>
                                <input className="form-control" id="candidateName"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Candidate</button>
                            <hr/>
                        </form>
                        </div>
                        <br></br>
                        <br></br>
                        <div id="content">
                            <h3>Candidates</h3>
                            <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Votes</th>
                                </tr>
                                {this.renderCandidates()}
                            </thead>
                            <tbody id="candidatesResults">
                            </tbody>
                            </table>
                        </div>
                        <form onSubmit={this.castVote}>
                        <div className="form-group">
                            <label htmlFor="candidatesSelect">Select Candidate</label>
                            <select onChange={ event => this.setState({ choice: event.target.value })} className="form-control" id="candidatesSelect">
                            <option key="" value=""></ option>
                                {this.renderOptions()}
                            </select>
                            <br></br>
                            <button type="submit" className="btn btn-primary">Vote</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className="container" style={{width: 800}}>
                <div className="row">
                    <div className="col-lg-8 col-md-10 col-sm-10 col-xs-12 center-block">
                        <h3>Click the button below to get election results</h3>
                        <hr></hr>
                        <button className="btn btn-success" onClick={this.getElectionResult}>Get Results</button>
                    </div>
                </div>
            </div>
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
            // Router.pushRoute('/login');
            return(
                <div>
                    <Notifications options={{zIndex: 500, top: '450px'}} />
                    <Head>
                        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
                        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"></link>
                        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossOrigin="anonymous"></script>
                    </Head>
                    <nav className="navbar navbar-fixed-top" style={this.navbar} >
                        <div className="container">
                            <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>                        
                            </button>
                            <Link route={`/`}>
                            <a className="navbar-brand" href="#" style={this.navLogo}>VotingBlock</a>
                            </Link>
                            </div>
                            <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right" style={this.navItem}>
                                <li><Link route={`/`}><a href="#" style={this.navLogo}>About</a></Link></li>
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
                    <div className="container" style={{width: 650}}>
                        <div className="row">
                            <div className="col-lg-8 col-md-10 col-sm-10 col-xs-12 center-block">
                                <h3>Please login</h3>
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
                    <footer className="container-fluid text-center" style={this.footer}>
                    <p style={{color: 'aliceblue', paddingTop: '15px'}}>&copy;<a style={{color: 'aliceblue'}} href="https://tayyib-a60.github.io/Adesokan/" title="Visit Toyeeb Adesokan">Adesokan Toyeeb</a></p>
                    </footer>
                </div>
            )
        }
    }
}

export default Vote;