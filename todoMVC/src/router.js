import Login from './common/Login'
import Register from './common/Register'
import Home from './common/Home';
import UserInfo from './common/UserInfo'
import Todo from './redux'
// import Todo from './state/storage/LocalStorage'
// import Todo from './state/storage/DBStorage'

//创建路由
const routes = [
    {
        path: '/',
        component: Home,
        name: '首页',
        meta: {
            isMenu: true,
        },
    },
    {
        path: '/todolist',
        component: Todo,
        name: '待办列表',
        meta: {
            isMenu: true,
        },
    },
    {
        path: '/user',
        component: UserInfo,
        name: '我的',
        meta: {
            isMenu: true,
        },
    },
    {
        path: '/register',
        component: Register,
        name: '注册',
        meta: {
            isMenu: false,
        },
    },
    {
        path: '/login',
        component: Login,
        name: '登录',
        meta: {
            isMenu: false,
        },
    },
]
export { routes };
