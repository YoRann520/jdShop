// axios 拦截器
import axios from 'axios'
import store from './store'
import router from './router'
import { Toast } from 'vant'

export default function setAxios() {
    // 添加响应拦截器
    axios.interceptors.request.use(config => {
        // 将token带个后端 , token已经存在vuex里了就不用再次获取了
        if (store.state.token) {
            config.headers.token = store.state.token
        }
        return config
    })

    // 添加响应拦截器
    axios.interceptors.response.use(response => {
        if (response.status == 200) {
            if (response.data.code == -101) {
                Toast('登录过期')
                // 清空浏览器和vuex里的token
                store.commit('token','')
                localStorage.removeItem('token')
                router.push({
                    path: '/login'
                })
            }
        }
        return response
    })
}