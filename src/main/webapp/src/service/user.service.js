import axios from 'axios';
import authHeader from './auth-header';
// import paramsId from './parId';

const API_URL = 'http://localhost:8080/test/';

class UserService {
  getUserBoard() { //к нему дописан then в board user
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
  getUserId() {
    return axios.get(API_URL + 'new', { headers: authHeader() });//, params: paramsId() 
  }
  
  // при каждом запросе на сервер, будет использоваться header с токеном

  // printAllProjects() { //к нему дописан then в board user
  //   return axios.get(API_URL + 'all', { headers: authHeader() });
  // }

  // addProject(nameProject) {//надо ли еще давать на вход id?
  //   return axios //к нему дописан then в board user
  //     .post(API_URL + 'add', {
  //       headers: authHeader(),
  //       nameProject,
  //     })
  //     .then(
  //       response => {
  //         if (response.data.success == true) {
  //           return true;
  //         }
  //         else return false;
  //       }
  //     );
  // }

}

export default new UserService();