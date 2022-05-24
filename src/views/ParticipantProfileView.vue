<template>
    <v-main class="participant_profile">
        <h2 class = "white-color mb-5">Akun Saya</h2>
        <div class="table-content" v-if="isLoad == false">
            <v-row>
                <v-col cols=3>
                    <v-card height=200>
                        <v-list>
                            <v-list-item-group
                                class="mt-2"
                                style="border-bottom: 1px solid #C4C4C4;"
                                v-model="selectedMenu"
                                color="primary">                                                                        
                                <v-list-item                                    
                                    v-for="(item, i) in menus"
                                    :key="i"
                                    >                                        
                                    <v-list-item-content>
                                        <v-list-item-title v-if="item.nama != 'Logout'" class="font-weight-medium" v-text="item.nama"></v-list-item-title>
                                        <v-list-item-title v-else class="font-weight-medium" @click="handleLogout()" v-text="item.nama"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols=5>
                    <v-card height=420>
                        <div v-if="changeMenu(1)" class="participant-profile-card">
                            <v-row class="mt-1">
                                <v-col cols=6>
                                    <v-form ref="formProfil">
                                        <v-row class="form-participant-profile-row">
                                            <v-card-title>
                                                <h5 class="font-weight-bold">Nama</h5>
                                            </v-card-title>
                                            <v-card-subtitle>
                                                <v-text-field
                                                    dense
                                                    v-model="participant.nama_peserta"
                                                    single-line
                                                    :rules="[rules.namaRequired]"                                        
                                                    outlined
                                                    required
                                                ></v-text-field>
                                            </v-card-subtitle>
                                        </v-row>
                                        <v-row class="form-participant-profile-row">
                                            <v-card-title>
                                                <h5 class="font-weight-bold">Email</h5>
                                            </v-card-title>
                                            <v-card-subtitle>
                                                <v-text-field
                                                    disabled
                                                    dense
                                                    v-model="participant.email_peserta"
                                                    single-line                                        
                                                    outlined                                        
                                                ></v-text-field>
                                            </v-card-subtitle>
                                        </v-row>
                                        <v-row class="form-participant-profile-row">
                                            <v-card-title>
                                                <h5 class="font-weight-bold">No. Telp.</h5>
                                            </v-card-title>
                                            <v-card-subtitle>
                                                <v-text-field
                                                    dense
                                                    v-model="participant.telp_peserta"
                                                    single-line
                                                    :rules="[rules.telpRequired]"
                                                    type=number
                                                    outlined
                                                    required
                                                ></v-text-field>
                                            </v-card-subtitle>
                                        </v-row>
                                    </v-form>
                                </v-col>
                                <v-col cols=4>
                                    <div class="img-border-participant-profile ml-6">
                                        <v-img 
                                            class="img-kelas-beranda"
                                            :src="getImgFromDBOrFile(participant.foto_profil_peserta)">
                                        </v-img>
                                        <v-btn                                
                                            class="profil-participant-button font-weight-bold"
                                            x-small
                                            depressed
                                            @click="triggerUpdateImg"
                                        >
                                            Ganti Foto
                                        </v-btn>                                        
                                        <v-file-input
                                            ref="uploadImg" 
                                            class="d-none"
                                            v-model="participant.foto_profil_peserta"                                            
                                            accept="image/*">
                                        </v-file-input>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                        <div v-else-if="changeMenu(0)" class="participant-profile-card">                          
                            <v-form ref="formPassword">
                                <v-row style="display: block;" class="px-5 mt-1 form-participant-profile-row">
                                    <v-card-title>
                                        <h5 class="font-weight-bold">Kata Sandi Sekarang</h5>
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <v-text-field
                                            dense
                                            v-model="passwordForm.oldPass"
                                            single-line
                                            :type="isShow.oldPass ? 'text' : 'password'"
                                            :append-icon="isShow.oldPass ? 'mdi-eye' : 'mdi-eye-off'"
                                            @click:append="isShow.oldPass = !isShow.oldPass"
                                            :rules="[rules.oldPassRequired]"                                       
                                            outlined
                                            required
                                        ></v-text-field>
                                    </v-card-subtitle>
                                </v-row>
                                <v-row style="display: block;" class="px-5 form-participant-profile-row">
                                    <v-card-title>
                                        <h5 class="font-weight-bold">Kata Sandi Baru</h5>
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <v-text-field                                            
                                            dense
                                            v-model="passwordForm.newPass"
                                            :type="isShow.newPass ? 'text' : 'password'"
                                            :append-icon="isShow.newPass ? 'mdi-eye' : 'mdi-eye-off'"
                                            @click:append="isShow.newPass = !isShow.newPass"
                                            :rules="[rules.newPassRequired]" 
                                            single-line                                        
                                            outlined
                                            required
                                        ></v-text-field>
                                    </v-card-subtitle>
                                </v-row>
                                <v-row style="display: block;" class="px-5 form-participant-profile-row">
                                    <v-card-title>
                                        <h5 class="font-weight-bold">Konfirmasi Kata Sandi Baru</h5>
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <v-text-field
                                            dense
                                            v-model="passwordForm.confNewPass"
                                            :type="isShow.confNewPass ? 'text' : 'password'"
                                            :append-icon="isShow.confNewPass ? 'mdi-eye' : 'mdi-eye-off'"
                                            @click:append="isShow.confNewPass = !isShow.confNewPass"
                                            single-line
                                            :rules="[rules.confNewPassRequired]"                                            
                                            outlined
                                            required
                                        ></v-text-field>
                                    </v-card-subtitle>
                                </v-row>
                            </v-form>                               
                        </div>
                        <div class="mt-15 mr-10 text-right">                                
                            <v-btn
                                class="register-as-button font-weight-bold"
                                x-large
                                depressed
                                @click="selectedMenu == 0 ? handleUpdateCoach() : handleChangePassword()"
                            >
                                <span v-if="isLoad == false">Simpan</span>
                                <v-progress-circular 
                                    v-else
                                    indeterminate
                                ></v-progress-circular>
                            </v-btn>
                        </div>                        
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <div v-else class="loading-table">
            <v-progress-circular
                class="white-color"
                :size="100"
                :width="10"                                                   
                indeterminate
            ></v-progress-circular>
        </div>

    </v-main>
</template>

<style scoped>
    .v-list .v-list-item--active {
        color: #7BD2F8;
        background-color: #FFFFFF;
        border-top: 1px solid #C4C4C4;
        border-right: 5px solid #7BD2F8;
    }
    .v-list .v-list-item {        
        border-top: 1px solid #C4C4C4;        
    }
    .theme--light.v-list-item--active:before, 
    .theme--light.v-list-item--active:hover:before, 
    .theme--light.v-list-item:focus:before {
        opacity: 0;
    }
</style>

<script>

export default {
    name: "participant_profile",
    data() {
        return{
            isLoad: false,
            my: JSON.parse(localStorage.getItem('participant')),
            selectedMenu: 0,           
            menus: [
                {nama: 'Profil'},
                {nama: 'Ubah Kata Sandi'},
                {nama: 'Logout'},
            ],
            participant: [],
            passwordForm: {
                oldPass: null,
                newPass: null,
                confNewPass: null,
            },
            isShow: {
                oldPass: false,
                newPass: false,
                confNewPass: false,
            },
            rules: {
                namaRequired: value => !!value || 'Nama lengkap tidak boleh kosong',
                telpRequired: value => !!value || 'No telp. tidak boleh kosong',            
                oldPassRequired: value => !!value || 'Kata sandi sekarang tidak boleh kosong',
                newPassRequired: value => !!value || 'Kata sandi baru tidak boleh kosong',
                confNewPassRequired: value => !!value || 'Konfirmasi kata sandi sekarang tidak boleh kosong',                
            },
        };
    },
    methods: {
        loadParticipantById() {
            this.isLoad = true;
            var url = this.$api + '/participant/get_participant/' + this.my.id;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.participant = response.data.data_participant;                
                this.isLoad = false;
            })
        },
        handleUpdateCoach() {
            if (this.$refs.formProfil.validate()) {
                this.isLoad = true;
                let data = new FormData;
                                    
                data.append('nama_peserta', this.participant.nama_peserta);
                data.append('telp_peserta', this.participant.telp_peserta);
                if (this.participant.foto_profil_peserta == null) this.data.append('foto_profil_peserta', '');
                else data.append('foto_profil_peserta', this.participant.foto_profil_peserta);
                
                var url = this.$api + '/participant/update_participant/' + this.my.id;
                this.$http.post(url, data, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.loadParticipantById()
                    localStorage.setItem('participant',JSON.stringify(response.data.data_participant));
                    this.isLoad = false;
                    this.$refs.formPassword.reset();
                    this.$popup.success(response.data.message);
                }).catch(error => {
                    this.$popup.warning(error.response.data.message);
                    this.isLoad = false;
                })
            }
        },
        handleChangePassword() {
            if (this.$refs.formPassword.validate()) {
                this.isLoad = true;
                let data = {
                    old_pass: this.passwordForm.oldPass,
                    new_pass: this.passwordForm.newPass,
                    confirm_new_pass: this.passwordForm.confNewPass,
                }

                var url = this.$api + '/participant/change_password'
                this.$http.put(url, data, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.loadParticipantById()
                    this.$refs.formPassword.reset();                
                    this.$popup.success(response.data.message);
                    this.isLoad = false;                    
                }).catch(error => {
                    this.$popup.warning(error.response.data.message);
                    this.isLoad = false;
                })
            }
        },
        handleLogout() {
            // this.selectedMenu = 1
            this.$popup.question(
                'Apakah anda yakin ingin logout ?',
                () => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('participant');
                    this.$router.push('/');       
                },
                () => {
                    this.selectedMenu = 1
                },
            )
        },
        triggerUpdateImg() {            
            window.addEventListener('focus', () => {
                
            }, { once: true });
            this.$refs.uploadImg.$refs.input.click()
        },
        getImgFromDBOrFile(img) {
            if (typeof img === "string") {
                return this.$baseUrl + '/images/' + img
            } else {
                return URL.createObjectURL(img)
            }
        },
        changeMenu(value) {            
            if (this.selectedMenu != value) {
                return true
            } return false
        }
    },
    mounted() {
        this.loadParticipantById()
    }
}
</script>