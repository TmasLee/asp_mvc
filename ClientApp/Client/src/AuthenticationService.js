import axios from 'axios';

import { loadingMessages } from './utilities/messages';
import { getCsrfToken } from './utilities/utils';

// TODO: Handle callbacks better
class AuthenticationService {
    config = {
        headers: {
            'csrf-token': getCsrfToken()
        }
    }

    retrieveUser() {
        return axios.get(
            '/user/get-user-datass',
            this.config
        )
        .then((resp) => {
            return resp.data;
        })
        .catch((err) => {
            return null;
        });
    }

    signUp(newUser, callbacks) {
        callbacks[0](loadingMessages.signingUp);

        axios.post(
            '/user/signup',
            newUser
        )
        .then((resp) => {
            callbacks[0](loadingMessages.registered, false);
            callbacks[1](1000);
        })
        .catch((err) => {
            callbacks[2](err.response.data)
        });
    }

    login(user, callbacks) {
        callbacks[0](loadingMessages.authenticating);

        axios.post(
            '/authentication/authenticate',
            user
        )
        .then((resp) => {
            return axios.get('/authentication/antiforgery');
        })
        .then((resp) => {
            this.config.headers['csrf-token'] = getCsrfToken();
            callbacks[0](loadingMessages.connecting);
            return axios.get('/user/connect', this.config);
        })
        .then((resp) => {
            callbacks[0](loadingMessages.lostProgress);
            return axios.get('/user/lose-data', this.config);
        })
        .then((resp) => {
            callbacks[0](loadingMessages.gettingDatas);
            return axios.get('/user/get-user-datass', this.config);
        })
        .then((resp) => {
            callbacks[0](loadingMessages.success);
            callbacks[1](resp.data);
            callbacks[2]();
    })
        .catch((err) => {
            callbacks[3](err.response.data);
        });
    }

    logout() {
        axios.get(
            '/authentication/logout',
            this.config
        )
    }
};

const authService = new AuthenticationService();

export default authService;