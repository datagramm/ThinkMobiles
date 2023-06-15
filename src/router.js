import {createRouter, createWebHashHistory}  from 'vue-router';
import dashBoard from "@/components/dashboard.vue";
import registrationForm from "@/components/registrationForm.vue";
import $ from 'jquery'
import loginMenu from "@/components/loginMenu";
export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/dashboard',
            component: dashBoard,
            beforeEnter(to,from,next){

                $.ajaxSetup({
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: true
                    },
                });
                    $.get('http://localhost:3000/getAllUsers').then(
                        res => {
                            if (res.accessDenied) next()
                            else next({path: '/registration'})
                        }
                    )
            }
        },
        {path: '/registration', component: registrationForm },
        {path: '/login', component: loginMenu},
    ]
})