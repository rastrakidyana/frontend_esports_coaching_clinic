<template>
    <v-main class="login-admin" id="landing-page">
        <v-card class="landing-page-card">
            <v-row>
            <div class="background-img">
                <v-img
                    class="mx-auto landing-page-img" 
                    :src="getImgLandingPage()"
                ></v-img>    
            </div>
            <div class="login-form">
                <div class="judul-login-admin">
                    <h3 class="text-left grey-color">LOGIN ADMIN</h3>
                    <h2 class="text-left grey-color">ESPORTS COACHING CLINIC</h2>
                </div>
                <div class="login-form-top">
                    <v-form ref="form">
                        <v-text-field
                            v-model="loginForm.username"
                            class="login-form-field"
                            label="Username"
                            :rules="[rules.usernameRequired]"
                            outlined
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="loginForm.password"
                            :type="isShow ? 'text' : 'password'"
                            :append-icon="isShow ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.passwordRequired]"
                            @click:append="isShow = !isShow"
                            class="login-form-field"
                            label="Kata Sandi"
                            outlined
                            required
                        ></v-text-field>
                    </v-form>
                </div>
                <div class="login-form-middle">
                    <v-btn
                        class="login-form-field login-button font-weight-bold"
                        x-large
                        depressed
                        @click="handleLoginAdmin"
                    >
                        <span v-if="isLoad == false">
                            Login
                        </span>
                        <v-progress-circular 
                            v-else
                            indeterminate
                        ></v-progress-circular>
                    </v-btn>                    
                    
                </div>                
            </div>                        
            </v-row>            
        </v-card>
        
    </v-main>
</template>

<script>
export default {
    name: "login-admin",
    data() {
        return {
            isShow: false,
            isLoad: false,            
            loginForm: {
                username: null,
                password: null,
            },          
            rules: {
                usernameRequired: value => !!value || 'Username tidak boleh kosong',
                passwordRequired: value => !!value || 'Kata sandi tidak boleh kosong',                
            },
        };
    },
    methods: {
        handleLoginAdmin() {
            if (this.$refs.form.validate()) {
                    this.isLoad = true;
                    this.$http.post(this.$api+ '/login', {
                        username: this.loginForm.username,
                        password: this.loginForm.password,
                        }).then(response =>{                            
                            this.isLoad = false;
                            this.clear();
                            this.$popup.success(response.data.message);
                            if (response.data.admin != null) {
                                localStorage.setItem('admin',JSON.stringify(response.data.admin));
                                localStorage.setItem('token',response.data.access_token);
                                this.$router.push({
                                    name: 'Admin Dashboard'
                                });                              
                            }                     
                        }).catch(error => {                            
                            this.$popup.warning(error.response.data.message);
                            this.isLoad = false;                                                                            
                        })
                }
            },
            clear() {
                this.$refs.form.reset();                
            },
            getImgLandingPage() {
                return this.$baseUrl + '/images/ecc_landing_page.png'
            },
    }
}
</script>