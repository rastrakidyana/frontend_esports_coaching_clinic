<template>
    <div class="participant_navbar">
        <v-app-bar id="navbar" class="navbar-style" flat app fixed>
            <v-toolbar-title @click="$router.push('home')">
                <v-img
                    class="mx-auto navbar-logo pointer" 
                    :src="getLogo()"
                ></v-img>
            </v-toolbar-title>
            <h4 @click="$router.push({path: '/home', replace: true})" class="pointer ml-5 grey-color">Beranda</h4>
            <v-spacer></v-spacer>
            <h4 @click="$router.push({path: '/participant_payment_transaction', replace: true})" class="pointer mr-7 grey-color">Transaksi</h4>
            <h4 @click="$router.push({ path: '/my_coaching_clinic', replace: true })" class="pointer mr-7 grey-color">Kelas Saya</h4>
            <v-menu                
                open-on-hover
                bottom
                offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon                            
                        v-bind="attrs"
                        v-on="on">
                        <div class="img-border-avatar">
                            <v-img
                                class="img-coach-detail"
                                :src="getImgFromDB(my.foto_profil_peserta)">
                            </v-img>
                        </div>                        
                    </v-btn>                    
                </template>
                <!-- <v-list>
                    <v-list-item>
                        <v-list-item-title>                            
                            <v-btn text router @click.prevent="logout">
                                <span style="text-transform: none;">Logout</span>
                            </v-btn>
                        </v-list-item-title>
                    </v-list-item>
                </v-list> -->
            </v-menu>
            <h4 @click="$router.push({ path: '/participant_profile', replace: true })" class="font-weight-medium pointer ml-4 mr-7 grey-color">{{my.nama_peserta}}</h4>
        </v-app-bar>

        <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
    #navbar {
        background-color: #FFFFFF;
    }
</style>

<script>
export default {
    name: "participant_navbar",
    data() {
        return {
            my: JSON.parse(localStorage.getItem('participant')),
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('participant');
            this.$router.push('/');
        },
        getLogo() {
            return this.$baseUrl + '/images/logo_navbar.png'
        },
        getImgFromDB(img) {
            return this.$baseUrl + '/images/' + img
        },
    }
}
</script>