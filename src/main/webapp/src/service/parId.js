export default function paramsUsername() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.username) {
      return { username: user.username };
    } else {
      return {};
    }
  }