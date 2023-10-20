export default function paramsId() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.id) {
      return { id: user.id };
    } else {
      return {};
    }
  }