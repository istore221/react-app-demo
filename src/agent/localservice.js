
const LocalService = {
  getToken : () => {
    return window.localStorage.getItem('token')
  },
  getUser : () => {
    return JSON.parse(window.localStorage.getItem('user'))
  },
  setToken : (token) => {
    window.localStorage.setItem('token',token)
  },
  removeToken : () => {
    window.localStorage.removeItem('token')
  },
  setUser : (user) => {
    window.localStorage.setItem('user',JSON.stringify(user))
  },
  removeUser : () => {
    window.localStorage.removeItem('user')
  }
};

export default LocalService;
