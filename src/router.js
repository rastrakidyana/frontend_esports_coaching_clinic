import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function importComponent(path) {
    return () =>
        import (`./components/${path}.vue`)
}

function importView(path) {
    return () =>
        import (`./views/${path}.vue`)
}

Vue.use(VueRouter);

const router = new VueRouter ({
    mode : "history",
    routes : [
        {
            path : "/coach_sidebar",
            name : "Coach Sidebar",            
            meta : { requiresAuthCoach: true },
            component : importComponent ('CoachSidebarComponent'),
            children : [                
                {   
                    path : "/coach_dashboard",
                    name : "Coach Dashboard",
                    meta: {title: 'Coach Dashboard'},
                    component : importView ('DashboardView') ,
                } ,                
                {
                    path : "/coach_profile",
                    name : "Coach Profile",
                    meta: {title:'Coach Profile'},
                    component : importView ( 'CoachProfileView' ) ,                    
                } ,
                {
                    path : "/coaching_clinic",
                    name : "Coaching Clinic",
                    meta: {title:'Coaching Clinic'},
                    component : importView ( 'CoachingClinicView' ) ,                    
                } ,
                {
                    path : "/detail_coaching_clinic/:coachingClinicId",
                    name : "Detail Coaching Clinic",
                    meta: {title:'Detail Coaching Clinic'},
                    component : importView ( 'DetailCoachingClinicView' ),
                } ,
                {
                    path : "/coach_payment_transaction",
                    name : "Coach Payment Transaction",
                    meta: {title:'Payment Transaction'},
                    component : importView ( 'PaymentTransactionCoachView' ) ,                    
                } ,
                {
                    path : "/coach_report",
                    name : "Coach Report",
                    meta: {title:'Coach Report'},
                    component : importView ( 'ReportView' ) ,                    
                } ,    
            ]
        },
        {
            path : "/participant_navbar",
            name : "Participant Navbar",            
            meta : { requiresAuthParticipant: true },
            component : importComponent ('ParticipantNavbarComponent'),
            children : [                
                {   
                    path : "/home",
                    name : "Home",
                    meta: {title: 'Beranda'},
                    component : importView ('HomeView') ,
                },
                {   
                    path : "/detail_coach/:coachId",
                    name : "Detail Coach",
                    meta: {title: 'Detail Coach'},
                    component : importView ('DetailCoachView') ,
                },
                {   
                    path : "/register_coaching_clinic",
                    name : "Register Coaching Clinic",
                    meta: {title: 'Pendaftaran Coaching Clinic'},
                    component : importView ('RegisterCoachingClinicView') ,
                },   
                {   
                    path : "/participant_payment_transaction",
                    name : "Participant Payment Transaction",
                    meta: {title: 'Transaksi Pembayaran'},
                    component : importView ('PaymentTransactionParticipantView') ,
                },
                {   
                    path : "/participant_profile",
                    name : "Participant Profile",
                    meta: {title: 'Profil Saya'},
                    component : importView ('ParticipantProfileView') ,
                },
                {   
                    path : "/my_coaching_clinic",
                    name : "My Coaching Clinic",
                    meta: {title: 'Coaching Clinic Saya'},
                    component : importView ('MyCoachingClinicView') ,
                },
                {   
                    path : "/upload_payment/:paymentId",
                    name : "Upload Payment",
                    meta: {title: 'Unggah Bukti Pembayaran'},
                    component : importView ('UploadPaymentView') ,
                },
            ]
        },
        {
            path : "/admin_sidebar",
            name : "Admin Sidebar",            
            meta : { requiresAuthAdmin: true },
            component : importComponent ('AdminSidebarComponent'),
            children : [                
                {   
                    path : "/admin_dashboard",
                    name : "Admin Dashboard",
                    meta: {title: 'Admin Dashboard'},
                    component : importView ('DashboardView') ,
                },
                {   
                    path : "/verify_coach",
                    name : "Verify Coach",
                    meta: {title: 'Daftar Coach'},
                    component : importView ('VerifyCoachView') ,
                },
                {
                    path : "/list_coaching_clinic",
                    name : "List Coaching Clinic",
                    meta: {title:'Daftar Coaching Clinic'},
                    component : importView ( 'CoachingClinicAdminView' ) ,                    
                } , 
                {
                    path : "/admin_report",
                    name : "Admin Report",
                    meta: {title:'Admin Report'},
                    component : importView ( 'ReportView' ) ,                    
                } ,    
            ]
        },         
        {
            path: "/",
            name: "Landing Page",
            meta: {title: 'Landing Page', authDone: true},            
            component: importView('LandingPageView'),
        },
        {
            path: "/login_admin",
            name: "Login Admin",
            meta: {title: 'Login Admin', authDone: true},
            component: importView('LoginAdminView'),
        },
        // {
        //     path: '*',
        //     redirect: '/'
        // },
    ],
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.matched.some(record => record.meta.requiresAuthCoach) || to.matched.some(record => record.meta.requiresAuthParticipant)) {
        if (localStorage.getItem('token') === null) {
            next({ name: 'Landing Page'})
        } else
            next()
    } else if (to.matched.some(record => record.meta.requiresAuthAdmin)) {
        if (localStorage.getItem('token') === null) {
            next({ name: 'Login Admin'})
        } else
            next()
    } else if (to.matched.some(record => record.meta.authDone)) {
        if (localStorage.getItem('token') != null && localStorage.getItem('coach') != null) {
            next({ name: 'Coach Dashboard'})
        } else if (localStorage.getItem('token') != null && localStorage.getItem('participant') != null) {
            next({ name: 'Home'})
        } else if (localStorage.getItem('token') != null && localStorage.getItem('admin') != null) {
            next({ name: 'Admin Dashboard'})
        } else
            next()
    }else
        next()
});

export default router ;