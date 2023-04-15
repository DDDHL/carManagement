import { createStore } from 'vuex'
const store = createStore({
  state: {
    "clickItem": {},
    "loginInfo": {
      isLogin: false,
      info: {
        userName: '未登录',
        avatar: '/static/avatar.png',
        openId: '',
        carId: []
      }
    }
  }
})
export default store