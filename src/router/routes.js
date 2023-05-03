const routes = [
    {
        path: '/',
        name: 'home',
        meta: { title: 'home', isAuth: false },     //User need the token to acess this page, when isAuth is true
        component: () => import('./../views/home.vue'),
        children: [
            {
                path: '/',
                name: 'list',
                meta: { title: 'list', isAuth: false },
                component:()=>import('./../components/serverList.vue')
            }
        ]
    }
]

export default routes