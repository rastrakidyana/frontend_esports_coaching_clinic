<template>
    <div class="admin_sidebar">
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
                    v-for="item in items_admin"
                    :key="item.title"
                    link
                    tag="router-link"
                    :to="item.to">
                    <v-icon>{{ item.icon }}</v-icon>
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
                            <span class="font-weight-bold grey-color">ADMIN</span>
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
    name: "admin_sidebar",
    data() {
        return {
            my: JSON.parse(localStorage.getItem('admin')),
            drawer: true,
            items_admin: [
                {title: "Dashboard", icon: "mdi-view-dashboard", to: "/admin_dashboard"},
                {title: "Coach", icon: "mdi-account-tie", to: "/verify_coach"},
                {title: "Coaching Clinic", icon: "mdi-checkbook", to: "/list_coaching_clinic"},
                {title: "Laporan", icon: "mdi-file-document", to: "/admin_report"},                
            ],
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            this.$router.push('/login_admin');
        }, 
        getLogo() {
            return this.$baseUrl + '/images/logo_ecc.png'
        },
    }
}
</script>