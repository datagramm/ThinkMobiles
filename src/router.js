import {createRouter, createWebHashHistory}  from 'vue-router';
import dashBoard from "@/components/dashboard.vue";
import registrationForm from "@/components/registrationForm.vue";
import $ from 'jquery'
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/',
            component: dashBoard,
            beforeEnter(to,from,next){

                    $.get('http://localhost:3000/getAllUsers').then(
                        res => {
                            if (res.accessDenied) next()
                            else next({path: '/registration'})
                        }
                    )
            }
        },
        {path: '/registration', component: registrationForm }
    ]
})