import axios from 'axios'
const API_URL = "http:/localhost:8080/auth/"

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "segnin", { username, password })
            .then(responce => {
                if (responce.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(responce.data))
                }
                return responce.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios
            .post(API_URL + "signup", { username, email, password });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();