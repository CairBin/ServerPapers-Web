const routes = [
    {
        path: '/',
        name: 'login',
        meta: {title:'login', isAuth:false},
        component: () => import('./../views/Login.vue')
    },
    {
        path: '/home',
        name: 'home',
        meta: { title: 'home', isAuth: true },     //User need the token to acess this page, when isAuth is true
        component: () => import('./../views/Home.vue'),
    }
]


export default routes;