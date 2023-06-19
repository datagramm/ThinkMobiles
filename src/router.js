import {createRouter, createWebHashHistory}  from 'vue-router';
import dashBoard from "@/components/dashboard.vue";
import registrationForm from "@/components/registrationForm.vue";
import {request} from "@/api/requests";
import loginMenu from "@/components/loginMenu";
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/dashboard',
            component: dashBoard,
           async beforeEnter(to,from,next){

             const allUsersRes = await request('/dashboard/getAllUsers', 'GET')
               if (allUsersRes.accessDenied) next()
               else next({path: '/registration'})

            }
        },
        {path: '/registration', component: registrationForm },
        {path: '/login', component: loginMenu},
    ]
})