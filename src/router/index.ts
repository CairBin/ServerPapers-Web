import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { ElMessage } from 'element-plus'

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

/*
    global before guards
    please refer to https://router.vuejs.org/guide/advanced/navigation-guards.html
*/
router.beforeEach((to, _from, next) => {
    if (to.meta.isAuth) {
        if (localStorage.getItem('token'))  //check token
            next()
        else {
            ElMessage({ type: 'warning', message: 'Please login first' })
            next('/')
        }
    } else
        next()
});

export default router;