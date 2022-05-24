<template>
    <v-main class="landing-pg" id="landing-page">
        <v-card class="landing-page-card">
            <v-row>
            <div class="background-img">
                <v-img
                    class="mx-auto landing-page-img" 
                    :src="getImgLandingPage()"
                ></v-img>                
            </div>
            <div class="login-form">
                <div class="login-form-top">
                    <v-form ref="form">
                        <v-text-field
                            v-model="loginForm.email"                    
                            class="login-form-field"
                            label="Email"
                            :rules="[rules.emailRequired, rules.checkEmail]"
                            outlined
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="loginForm.password"
                            :type="isShow.login ? 'text' : 'password'"
                            :append-icon="isShow.login ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.passwordRequired]"
                            @click:append="isShow.login = !isShow.login"
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
                        @click="handleLogin"
                    >
                        <span v-if="isLoad == false">
                            Login
                        </span>
                        <v-progress-circular 
                            v-else
                            indeterminate
                        ></v-progress-circular>
                    </v-btn>
                    <div class="forget-pass">
                        <span class="forget-pass-text">Lupa Kata Sandi ?</span>
                    </div>
                    
                </div>
                <div class="login-form-bottom">
                    <v-divider class="login-form-field my-5"></v-divider>
                    <v-btn
                        class="login-form-field register-button font-weight-bold"
                        x-large
                        depressed
                        @click="dialog.register = true"
                    >
                        Buat Akun Baru
                    </v-btn>
                </div>
            </div>                        
            </v-row>            
        </v-card>

        <v-dialog width="900" persistent v-model="dialog.register">
            <v-card class="card-custom">
                <v-card-title>
                    <span class="headline font-weight-bold">Daftar Akun</span>
                    <v-spacer></v-spacer>
                    <v-btn class="btn-close" text @click="close">
                        <v-icon large>mdi-close-circle</v-icon>
                    </v-btn>
                </v-card-title>
                <div class="tab-register">
                    <v-row>
                        <div :class="tabSelected(tab.coach)"><h3 style="cursor:pointer;" class="mt-3" @click="setTabStatus(tab.coach)">Coach</h3></div>
                        <div :class="tabSelected(tab.participant)"><h3 style="cursor:pointer;" class="mt-3" @click="setTabStatus(tab.participant)">Peserta</h3></div>
                    </v-row>
                    <div class="form-register mx-6">
                        <v-form ref="formRegister">
                            <v-row class="form-register-row">
                                <v-col>
                                    <v-text-field
                                    v-model="registerForm.nama"
                                    label="Nama Lengkap"
                                    :rules="[rules.namaRequired]"
                                    outlined
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                    v-model="registerForm.email"
                                    label="Email"
                                    :rules="[rules.emailRequired]"
                                    outlined
                                    required
                                    ></v-text-field>
                                </v-col>                                                        
                            </v-row>
                            <v-row class="form-register-row">
                                <v-col>
                                    <v-text-field
                                    v-model="registerForm.telp"
                                    label="No Telp."
                                    :rules="[rules.telpRequired]"
                                    outlined
                                    required
                                    type="number"
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                    v-model="registerForm.password"
                                    :type="isShow.register ? 'text' : 'password'"
                                    :append-icon="isShow.register ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.passwordRequired]"
                                    @click:append="isShow.register = !isShow.register"
                                    label="Kata Sandi"
                                    outlined
                                    required
                                    ></v-text-field>
                                </v-col>                                                        
                            </v-row>
                            <v-row class="form-register-row" v-if="tabStatus == 'coach'">
                                <v-col>
                                    <v-text-field
                                    v-model="registerForm.domisili"
                                    label="Domisili"
                                    :rules="[rules.domisiliRequired]"
                                    outlined
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                    v-model="registerForm.tgl_lahir"
                                    label="Tanggal Lahir"
                                    :rules="[rules.tglLahirRequired]"
                                    outlined
                                    required
                                    type="date"
                                    ></v-text-field>
                                </v-col>                                                        
                            </v-row>
                            <v-row class="form-register-row" v-if="tabStatus == 'coach'">
                                <v-col>
                                    <label style="color: black;" class="" for="jenis_kelamin">Jenis Kelamin</label>
                                    <v-radio-group                                    
                                        v-model="registerForm.jk"
                                        :rules="[rules.jkRequired]"                                    
                                        row>
                                        <v-radio                                    
                                            label="Laki-laki"
                                            value="Laki-laki">
                                        </v-radio>
                                        <v-radio                           
                                            label="Perempuan"
                                            value="Perempuan">
                                        </v-radio>
                                    </v-radio-group>
                                </v-col>                             
                            </v-row>  
                        </v-form>                      
                    </div>
                    <div class="mb-5 text-center" :class="tabStatus == 'participant' ? 'login-form-bottom' : ''">
                        <v-divider class="my-5"></v-divider>
                        <v-btn
                            class="register-as-button font-weight-bold"
                            x-large
                            depressed
                            @click="handleRegister"
                        >
                            <span v-if="tabStatus == 'coach' && isLoad == false">Daftar Sebagai Coach</span>
                            <span v-else-if="tabStatus == 'participant' && isLoad == false">Daftar Sebagai Peserta</span>
                            <v-progress-circular 
                                v-else
                                indeterminate
                            ></v-progress-circular>
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </v-main>
</template>

<script>
export default {
    name: "landing-pg",
    data() {
        return {
            isShow: {
                login: false,
                register: false,
            },
            isLoad: false,
            dialog: {
                register: false,
                forgetPassword: false,
            },
            loginForm: {
                email: null,
                password: null,
            },
            registerForm: {
                    nama: null,
                    email: null,
                    password: null,
                    telp: null,
                    domisili: null,
                    tgl_lahir: null,
                    jk: null,                                
            },
            tabStatus: 'coach',
            tab: {
                coach: 'coach',
                participant: 'participant',
            },
            rules: {
                emailRequired: value => !!value || 'Email tidak boleh kosong',
                passwordRequired: value => !!value || 'Kata sandi tidak boleh kosong',
                namaRequired: value => !!value || 'Nama lengkap tidak boleh kosong',
                telpRequired: value => !!value || 'No telp. tidak boleh kosong',
                domisiliRequired: value => !!value || 'Domisili tidak boleh kosong',
                tglLahirRequired: value => !!value || 'Tanggal lahir tidak boleh kosong',
                jkRequired: value => !!value || 'Jenis kelamin tidak boleh kosong',
                checkEmail: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Email tidak valid'
                },
            },
        };
    },
    methods: {
        handleLogin() {
            if (this.$refs.form.validate()) {
                    this.isLoad = true;
                    this.$http.post(this.$api+ '/login', {
                        email: this.loginForm.email,
                        password: this.loginForm.password,
                        }).then(response =>{                            
                            this.isLoad = false;
                            this.clear();
                            this.$popup.success(response.data.message);
                            if (response.data.coach != null) {
                                localStorage.setItem('coach',JSON.stringify(response.data.coach));
                                localStorage.setItem('token',response.data.access_token);
                                this.$router.push({
                                    name: 'Coach Dashboard'
                                });                              
                            } else {
                                localStorage.setItem('participant', JSON.stringify(response.data.participant));
                                localStorage.setItem('token',response.data.access_token);
                                this.$router.push({
                                    name: 'Home'
                                });
                            }                     
                        }).catch(error => {                            
                            this.$popup.warning(error.response.data.message);
                            this.isLoad = false;                                                                            
                        })
                }
            },
            handleRegister() {
                if (this.$refs.formRegister.validate()) {
                    this.isLoad = true;
                    if (this.tabStatus == 'coach') {
                            let register_data = {
                                nama_coach: this.registerForm.nama,
                                email_coach: this.registerForm.email,
                                password: this.registerForm.password,
                                telp_coach: this.registerForm.telp,
                                domisili_coach: this.registerForm.domisili,
                                tgl_lahir_coach: this.registerForm.tgl_lahir,
                                jk_coach: this.registerForm.jk,
                            }
                            this.$http.post(this.$api+ '/register', register_data).then(response =>{                            
                                this.isLoad = false;
                                this.clear();
                                this.close();
                                this.$popup.success(response.data.message);
                            }).catch(error => {                            
                                this.$popup.warning(error.response.data.message);
                                this.isLoad = false;                                                     
                            })
                    } else if (this.tabStatus == 'participant') {
                            let register_data = {
                                nama_peserta: this.registerForm.nama,
                                email_peserta: this.registerForm.email,
                                password: this.registerForm.password,
                                telp_peserta: this.registerForm.telp,                                
                            }
                            this.$http.post(this.$api+ '/register', register_data).then(response =>{                            
                                this.isLoad = false;
                                this.clear();
                                this.close();
                                this.$popup.success(response.data.message);       
                            }).catch(error => {                            
                                this.$popup.warning(error.response.data.message);
                                this.isLoad = false;                                                     
                            })
                    }
                }
            },
            tabSelected(tab) {                
                if (tab == this.tabStatus) {
                    return 'tab-register-active'
                } else {
                    return 'tab-register-inactive'
                }
            },
            setTabStatus(status) {
                this.$refs.formRegister.reset();
                this.tabStatus = status;
            },
            close() {                
                this.dialog.register = false;
                this.$refs.formRegister.reset();
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