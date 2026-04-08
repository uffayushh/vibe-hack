// AuthService.js

class AuthService {
    constructor() {
        this.tokenKey = 'jwt_token';
    }

    register(username, password) {
        // Send a request to register the user
        return fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }).then(response => response.json());
    }

    login(username, password) {
        // Send a login request
        return fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        }).then(response => response.json()).then(data => {
            if (data.token) {
                this.setToken(data.token);
            }
            return data;
        });
    }

    logout() {
        this.setToken(null);
    }

    setToken(token) {
        if (token) {
            localStorage.setItem(this.tokenKey, token);
        } else {
            localStorage.removeItem(this.tokenKey);
        }
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    isLoggedIn() {
        const token = this.getToken();
        return token != null;
    }
}

export default new AuthService();