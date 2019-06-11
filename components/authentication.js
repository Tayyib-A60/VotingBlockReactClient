import React, { Component } from "react";
import axios from 'axios';
import { Router } from '../routes';

class AuthService extends Component {
    
    componentDidMount() {
        if(localStorage.getItem('currentUser')) {
            this.setState({ loggedIn: true });
        }
    }

    static login(email, password) {
       return axios.post('http://localhost:5000/api/voting/user/authenticate', { UserEmail: email, Password: password});
    }
    static isAuthenticated() {
        const isNode = typeof module !== 'undefined'
        if (!isNode) {
            return localStorage.getItem('currentUser') ? true : false;
        }
    }
    static forgotPassword(user) {
        return axios.post('http://localhost:5000/api/voting/user/forgotPassword', user);
    }
    static getUserByEmail(email) {
        return axios.get(`http://localhost:5000/api/voting/user/${email}`);
    }
    static logout() {
        // event.preventDefault();
        console.log('logout clicked');
        const isNode = typeof module !== 'undefined'
        if (!isNode) {
            console.log('logout clicked');
            localStorage.removeItem('currentUser');
            Router.replaceRoute(`/login`);
        }
    }
    static contactUs(contactUs) {
        return axios.post(`http://localhost:5000/api/voting/user/contactUs`, contactUs);
    }


}
export default AuthService;