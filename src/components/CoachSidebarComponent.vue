<template>
    <div class="coach_sidebar">
        <v-navigation-drawer class="fullheight" v-model="drawer" app>
            <v-list-item>
                <v-list-item-content class="no-padding" style="height:110px;">
                    <v-img
                        class="mx-auto sidebar-logo" 
                        :src="getLogo()"
                    ></v-img>
                </v-list-item-content>
            </v-list-item>

            <v-divider class="my-5"></v-divider>

            <v-list nav class="text-left sidebar-item">
                <v-list-item
                    :class="detailSidebar(item.title)"
                    v-for="item in items_coach"
                    :key="item.title"
                    link
                    tag="router-link"
                    :to="item.to">
                    <v-icon :class="detailSidebar(item.title)">{{ item.icon }}</v-icon>
                    <v-list-item-content class="ml-4">                        
                        <v-list-item-title>
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar id="navbar" flat app fixed>
            <v-app-bar-nav-icon id="drawer" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>            
            <v-spacer></v-spacer>
            <v-menu                
                open-on-hover
                bottom
                offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            class="mr-1"
                            icon                            
                            v-bind="attrs"
                            v-on="on">
                            <div class="img-border-avatar">
                                <v-img
                                    class="img-coach-detail"
                                    :src="getImgFromDB(my.foto_profil_coach)">
                                </v-img>
                            </div>
                        </v-btn>
                    </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title>                            
                            <v-btn text router @click.prevent="logout">
                                <span style="text-transform: none;">Logout</span>
                            </v-btn>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>        
        </v-app-bar>

        <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
    #navbar {
        background-color: #757676;
    }

    #drawer {
        color: #C4C4C4;
    }
</style>

<script>
export default {
    name: "coach_sidebar",
    data() {
        return {
            my: JSON.parse(localStorage.getItem('coach')),
            drawer: true,
            items_coach: [
                {title: "Dashboard", icon: "mdi-view-dashboard", to: "/coach_dashboard"},
                {title: "Coaching Clinic", icon: "mdi-checkbook", to: "/coaching_clinic"},
                {title: "Transaksi Pembayaran", icon: "mdi-receipt", to: "/coach_payment_transaction"},
                {title: "Laporan", icon: "mdi-file-document", to: "/coach_report"},
                {title: "Profil", icon: "mdi-account", to: "/coach_profile"},
            ],
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('coach');
            this.$router.push('/');
        },
        detailSidebar(title) {
            if (document.title == 'Detail Coaching Clinic' && title == 'Coaching Clinic') {
                return 'detail-sidebar-color'
            }
        },
        getLogo() {
            return this.$baseUrl + '/images/logo_ecc.png'
        },
        getImgFromDB(img) {
            return this.$baseUrl + '/images/' + img
        },
    }
}
</script>