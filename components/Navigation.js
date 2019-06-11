import React from 'react';
import Head from 'next/head';
import { Link } from '../routes';

export default props => {
    return (
      <div>
        <Head>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous"></link>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossOrigin="anonymous"></script>
        </Head>
        <div>
        <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link route={`/`}>
            <a className="navbar-brand" href="#">Election DAPP</a>
            </Link>
          </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Vote <span className="sr-only">(current)</span></a></li>
              <li><Link route={`/allcontracts`}><a href="#">Elections</a></Link></li>
              <li><Link route={`/new`}><a href="#">Create New Election</a></Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><Link route={`/signup`}><a href="#">Sign up</a></Link></li>
              <li><Link route={`/login`}><a href="#">Login</a></Link></li>
            </ul>
            </div>
        </div>
    </nav>
    {props.children}
    </div>
    </div>
    );
};