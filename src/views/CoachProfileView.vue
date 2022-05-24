<template>
    <v-main class="coach_profile">
        <h2 class = "white-color mb-5">Profil Coach</h2>
        <div class="table-content" v-if="isLoad == false">
            <v-row>
                <v-col cols=8>
                    <v-card height=600 style="overflow-x: hidden;">
                        <v-form ref="formProfil">
                            <v-row class="form-register-row">
                                <v-col>
                                    <v-card-title>
                                        <h5 class="font-weight-bold">Nama</h5>
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <v-text-field
                                            dense
                                            v-model="coach.nama_coach"
                                            single-line
                                            :rules="[rules.namaRequired]"                                        
                                            outlined
                                            required
                                        ></v-text-field>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col>
                                    <v-card-title>
                                        <h5 class="font-weight-bold">Email</h5>
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <v-text-field
                                            disabled
                                            dense
                                            v-model="coach.email_coach"
                                            single-line                                        
                                            outlined                                        
                                        ></v-text-field>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="form-register-row">
                                <v-col>
                                    <v-card-title>
                                        <h5 class="font-weight-bold">Domisili</h5>
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <v-text-field
                                            dense
                                            v-model="coach.domisili_coach"
                                            single-line
                                            :rules="[rules.domisiliRequired]"
                                            outlined
                                            required
                                        ></v-text-field>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col>
                                    <v-card-title>
                                        <h5 class="font-weight-bold">No Telp.</h5>
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <v-text-field                                        
                                            dense
                                            v-model="coach.telp_coach"
                                            single-line
                                            :rules="[rules.domisiliRequired]"
                                            type=number
                                            outlined
                                            required
                                        ></v-text-field>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="form-register-row">
                                <v-col>
                                    <v-card-title>
                                        <h5 class="font-weight-bold">Jenis Kelamin</h5>
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <v-radio-group                                    
                                            v-model="coach.jk_coach"
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
                                    </v-card-subtitle>
                                </v-col>
                                <v-col>
                                    <v-card-title>
                                        <h5 class="font-weight-bold">Tanggal Lahir</h5>
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <v-text-field                                        
                                            dense
                                            v-model="coach.tgl_lahir_coach"
                                            single-line
                                            :rules="[rules.tglLahirRequired]"
                                            type="date"
                                            outlined
                                            required
                                        ></v-text-field>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="form-register-row-ubah-sandi">
                                <v-col cols=4>
                                    <v-card-subtitle class="text-left">                                
                                        <h4 class="font-weight-regular grey-color ubah-sandi" @click="dialog.password = true">Ubah Kata Sandi ?</h4>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="form-register-row-desc">
                                <v-col>
                                    <v-card-title>
                                        <h5 class="font-weight-bold">Deskripsi</h5>
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <v-textarea 
                                            v-model="coach.desc_coach"
                                            no-resize
                                            rows="4"
                                            label="Deskripsi"
                                            outlined
                                            single-line
                                        ></v-textarea>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="form-register-row">
                                <v-col>
                                    <v-card-title>
                                        <h5 class="font-weight-bold">Rekening Atas Nama</h5>
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <v-text-field
                                            v-if="coach.akun_bank != null"
                                            dense
                                            v-model="coach.akun_bank.an_no_rek"
                                            single-line
                                            :rules="[rules.anRekRequired]"
                                            outlined
                                            required
                                        ></v-text-field>
                                        <v-text-field
                                            v-else
                                            dense
                                            v-model="bankForm.an"
                                            single-line
                                            :rules="[rules.anRekRequired]"
                                            outlined
                                            required
                                        ></v-text-field>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col>
                                    <v-card-title>
                                        <h5 class="font-weight-bold">Bank</h5>
                                    </v-card-title>
                                    <v-card-subtitle>                                    
                                        <v-select
                                            v-if="coach.akun_bank != null"
                                            dense
                                            v-model="coach.akun_bank.nama_bank"
                                            single-line                                        
                                            :items="optionsBank"
                                            item-text="nama"
                                            item-value="nama"                               
                                            :rules="[rules.bankRequired]"                                        
                                            outlined
                                            required
                                        ></v-select>
                                        <v-select
                                            v-else
                                            dense
                                            v-model="bankForm.bank"
                                            single-line                                        
                                            :items="optionsBank"
                                            item-text="nama"
                                            item-value="nama"                               
                                            :rules="[rules.bankRequired]"                                        
                                            outlined
                                            required
                                        ></v-select>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="form-register-row">
                                <v-col>
                                    <v-card-title>
                                        <h5 class="font-weight-bold">No. Rekening</h5>
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <v-text-field
                                            v-if="coach.akun_bank != null"
                                            dense
                                            v-model="coach.akun_bank.no_rek"
                                            single-line
                                            :rules="[rules.noRekRequired]"
                                            type="number"
                                            outlined
                                            required
                                        ></v-text-field>
                                        <v-text-field
                                            v-else
                                            dense
                                            v-model="bankForm.no"
                                            single-line
                                            :rules="[rules.noRekRequired]"
                                            type="number"
                                            outlined
                                            required
                                        ></v-text-field>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col class="text-center" style="transform: translateY(30%);">
                                    <v-btn
                                        class="register-as-button font-weight-bold"
                                        x-large
                                        depressed
                                        @click="handleUpdateCoach"
                                    >
                                        <span v-if="isLoad == false">Simpan</span>
                                        <v-progress-circular 
                                            v-else
                                            indeterminate
                                        ></v-progress-circular>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card>
                </v-col>
                <v-col class="img-coach-profil">
                    <v-card height=250>
                        <div class="img-border-profil-coach">
                            <v-img
                                class="img-form-detail"
                                :src="getImgFromDBOrFile(coach.foto_profil_coach)">
                            </v-img>
                            <v-btn                                
                                class="profil-coach-button font-weight-bold"
                                x-small
                                depressed
                                @click="triggerUpdateImg"
                            >
                                Ganti Foto
                            </v-btn>
                            <input 
                                ref="uploadImg" 
                                class="d-none" 
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                @change="handleUpdateCoach"
                            >
                        </div>
                    </v-card>
                    <v-card class="mt-7" height=320>
                        <v-card-title>
                            <h5 class="font-weight-bold">Prestasi</h5>
                            <v-spacer></v-spacer>
                            <v-btn class="light-blue-color" text @click="dialog.achievement = true">
                                <v-icon class="btn-add" large>mdi-plus-circle</v-icon>
                            </v-btn>
                        </v-card-title>
                        <div class="enable-scroll-y achievement-card">
                            <v-data-iterator
                                disable-pagination
                                hide-default-footer
                                :items="achievements">                        
                                    <template v-slot:default="props">                                        
                                        <v-row
                                        class="info-detail"
                                            v-for="item in props.items"
                                            :key="item.nama_prestasi">                           
                                                <v-card-subtitle class="text-left">
                                                    {{ item.nama_prestasi }}
                                                </v-card-subtitle>
                                                <v-card-text>                                                    
                                                    <v-btn x-small text>
                                                        <v-icon medium color="black-color" @click="updateData(item)">mdi-pencil</v-icon> 
                                                    </v-btn>
                                                    <v-btn x-small text>
                                                        <v-icon medium color="black-color" @click="handleDeleteAchievement(item.id)">mdi-delete</v-icon> 
                                                    </v-btn>
                                                </v-card-text>
                                        </v-row>
                                    </template>
                            </v-data-iterator>
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

        <v-dialog v-model="dialog.achievement" persistent width="500">
            <v-card class="card-custom-schedule">
                <v-card-title>
                    <span class="headline font-weight-bold">{{ formTitle }} Prestasi</span>
                    <v-spacer></v-spacer>
                    <v-btn class="btn-close" text @click="close">
                        <v-icon large>mdi-close-circle</v-icon>
                    </v-btn>
                </v-card-title>
                <div class="tab-form">
                    <div class="mx-9">
                        <v-form ref="formAchievement">
                            <v-row class="form-register-row">
                                <v-text-field
                                    v-model="achievementForm.judul"
                                    label="Judul"
                                    :rules="[rules.judulRequired]"
                                    outlined
                                    required
                                ></v-text-field>
                            </v-row>                            
                            <v-row class="form-register-row">
                                <v-file-input                                    
                                    v-model="image.form"
                                    prepend-icon=""
                                    accept="image/*"
                                    label="Gambar"                                    
                                    @change="previewImg"
                                    outlined>
                                </v-file-input>
                            </v-row>
                            <v-row v-if="showImg()" class="form-register-row-img">
                                <div class="img-border">
                                    <v-img
                                        class="img-form"                                         
                                        :src="image.show">
                                    </v-img>
                                </div>
                            </v-row>
                        </v-form>
                    </div>
                    <div class="mb-5 text-center">
                        <v-divider class="my-5"></v-divider>
                        <v-btn
                            class="register-as-button font-weight-bold"
                            x-large
                            depressed
                            @click="inputType == 'Tambah' ? handleAddAchievement() : handleUpdateAchievement()"
                        >
                            <span v-if="isLoad == false">{{ inputType }}</span>
                            <v-progress-circular 
                                v-else
                                indeterminate
                            ></v-progress-circular>
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog.password" persistent width="500">
            <v-card class="card-custom-password">
                <v-card-title>
                    <span class="headline font-weight-bold">Ubah Kata Sandi</span>
                    <v-spacer></v-spacer>
                    <v-btn class="btn-close" text @click="close">
                        <v-icon large>mdi-close-circle</v-icon>
                    </v-btn>
                </v-card-title>
                <div class="tab-form">
                    <div class="mx-9">
                        <v-form ref="formPassword">
                            <v-row class="form-register-row">
                                <v-text-field
                                    v-model="passwordForm.oldPass"
                                    :type="isShow.oldPass ? 'text' : 'password'"
                                    :append-icon="isShow.oldPass ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="isShow.oldPass = !isShow.oldPass"
                                    label="Kata Sandi Sekarang"
                                    :rules="[rules.oldPassRequired]"
                                    outlined
                                    required
                                ></v-text-field>
                            </v-row>
                            <v-row class="form-register-row">
                                <v-text-field
                                    v-model="passwordForm.newPass"
                                    :type="isShow.newPass ? 'text' : 'password'"
                                    :append-icon="isShow.newPass ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="isShow.newPass = !isShow.newPass"
                                    label="Kata Sandi Baru"
                                    :rules="[rules.newPassRequired]"
                                    outlined
                                    required
                                ></v-text-field>
                            </v-row>
                            <v-row class="form-register-row">
                                <v-text-field
                                    v-model="passwordForm.confNewPass"
                                    :type="isShow.confNewPass ? 'text' : 'password'"
                                    :append-icon="isShow.confNewPass ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append="isShow.confNewPass = !isShow.confNewPass"
                                    label="Konfirmasi Kata Sandi Baru"
                                    :rules="[rules.confNewPassRequired]"
                                    outlined
                                    required
                                ></v-text-field>
                            </v-row>
                        </v-form>
                    </div>
                    <div class="mb-5 text-center">
                        <v-divider class="my-5"></v-divider>
                        <v-btn
                            class="register-as-button font-weight-bold"
                            x-large
                            depressed
                            @click="handleChangePassword()"
                        >
                            <span v-if="isLoad == false">Perbaharui Kata Sandi</span>
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
    name: "coach_profile",
    data() {
        return{
            my: JSON.parse(localStorage.getItem('coach')),
            inputType: 'Tambah',
            isLoad: false,
            dialog: {
                password: false,
                achievement: false,
            },
            image: {
                form: null,
                show: null,
            },
            editId: null,
            isChangeImg: false,
            coach: [],            
            achievement: new FormData,
            achievements: [],
            bank: new FormData,
            passwordForm: {
                oldPass: null,
                newPass: null,
                confNewPass: null,
            },
            bankForm: {
                an: null,
                no: null,
                bank: null,
            },
            isShow: {
                oldPass: false,
                newPass: false,
                confNewPass: false,
            },
            achievementForm: {
                judul: null,
                gambar: null,
            },
            optionsBank: [
                {nama: 'BRI'},
                {nama: 'BCA'},
                {nama: 'BNI'},
                {nama: 'Mandiri'},
            ],
            rules: {
                namaRequired: value => !!value || 'Nama lengkap tidak boleh kosong',
                telpRequired: value => !!value || 'No telp. tidak boleh kosong',
                domisiliRequired: value => !!value || 'Domisili tidak boleh kosong',
                tglLahirRequired: value => !!value || 'Tanggal lahir tidak boleh kosong',
                jkRequired: value => !!value || 'Jenis kelamin tidak boleh kosong',
                noRekRequired: value => !!value || 'No rekening tidak boleh kosong',
                anRekRequired: value => !!value || 'Rekening atas nama tidak boleh kosong',
                bankRequired: value => !!value || 'Bank tidak boleh kosong',
                judulRequired: value => !!value || 'Judul tidak boleh kosong',
                oldPassRequired: value => !!value || 'Kata sandi sekarang tidak boleh kosong',
                newPassRequired: value => !!value || 'Kata sandi baru tidak boleh kosong',
                confNewPassRequired: value => !!value || 'Konfirmasi kata sandi sekarang tidak boleh kosong',                
            },
            
        };
    },
    methods: {
        loadCoachById() {
            this.isLoad = true;
            var url = this.$api + '/coach/get_coach/' + this.my.id;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.coach = response.data.data_coach;
                this.isLoad = false;
            })
        },
        loadListAchievementByIdCoach() {
            this.isLoad = true;
            var url = this.$api + '/coach/get_coach_achievements/' + this.my.id;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.achievements = response.data.data_coach.daftar_prestasi;
                this.isLoad = false;
            })
        },
        handleUpdateCoach(e) {
            if (this.$refs.formProfil.validate() || this.isChangeImg) {
                this.isLoad = true;
                let data = new FormData;
                if (this.isChangeImg) {
                    const files = e.target.files || e.dataTransfer.files
                    data.append('foto_profil_coach', files[0]);
                } else {
                    data.append('nama_coach', this.coach.nama_coach);
                    data.append('telp_coach', this.coach.telp_coach);
                    data.append('domisili_coach', this.coach.domisili_coach);
                    data.append('jk_coach', this.coach.jk_coach);
                    data.append('tgl_lahir_coach', this.coach.tgl_lahir_coach);                
                    data.append('desc_coach', this.coach.desc_coach);
                    if (this.coach.akun_bank != null) {
                        data.append('no_rek', this.coach.akun_bank.no_rek);
                        data.append('an_no_rek', this.coach.akun_bank.an_no_rek);
                        data.append('nama_bank', this.coach.akun_bank.nama_bank);
                    } else {
                        data.append('no_rek', this.bankForm.no);
                        data.append('an_no_rek', this.bankForm.an);
                        data.append('nama_bank', this.bankForm.bank);
                    }
                }
                var url = this.$api + '/coach/update_coach/' + this.my.id;
                this.$http.post(url, data, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.loadCoachById()
                    localStorage.setItem('coach',JSON.stringify(response.data.data_coach));                    
                    this.isLoad = false;
                    this.close();
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

                var url = this.$api + '/coach/change_password'
                this.$http.put(url, data, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.loadCoachById()
                    this.loadListAchievementByIdCoach()
                    this.close();
                    this.$popup.success(response.data.message);
                    this.isLoad = false;                    
                }).catch(error => {
                    this.$popup.warning(error.response.data.message);
                    this.isLoad = false;
                })
            }
        },
        handleAddAchievement() {
            if (this.$refs.formAchievement.validate()) {
                this.isLoad = true;
                this.achievement.append('nama_prestasi', this.achievementForm.judul);
                if (this.image.form == null) this.achievement.append('gambar_prestasi', '');
                else this.achievement.append('gambar_prestasi', this.image.form);
                this.achievement.append('id_coach', this.my.id);

                var url = this.$api + '/coach/add_achievement'
                this.$http.post(url, this.achievement, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.loadCoachById()
                    this.loadListAchievementByIdCoach()
                    this.close();
                    this.isLoad = false;
                    this.$popup.success(response.data.message);
                }).catch(error => {
                    this.$popup.warning(error.response.data.message);
                    this.isLoad = false;
                })
            }
        },
        handleUpdateAchievement() {
            if (this.$refs.formAchievement.validate()) {
                this.isLoad = true;
                let data = new FormData;
                if (this.image.form != null) {
                    data.append('nama_prestasi', this.achievementForm.judul);
                    data.append('gambar_prestasi', this.image.form);
                } else {
                    data.append('nama_prestasi', this.achievementForm.judul);
                }

                var url = this.$api + '/coach/update_achievement/' + this.editId;
                this.$http.post(url, data, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.loadCoachById()
                    this.loadListAchievementByIdCoach()
                    this.close();
                    this.isLoad = false;
                    this.$popup.success(response.data.message);
                }).catch(error => {
                    this.$popup.warning(error.response.data.message);
                    this.isLoad = false;
                })
            }
        },
        handleDeleteAchievement(id) {
            this.$popup.question(
                'Apakah anda yakin menghapus prestasi ini ?',
                () => {
                    this.isLoad = true;
                    var url = this.$api + '/coach/delete_achievement/' + id;
                    this.$http.get(url, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {                                        
                        this.loadCoachById()
                        this.loadListAchievementByIdCoach()
                        this.isLoad = false;
                        this.$popup.success(response.data.message);
                    }).catch(error => {
                        this.$popup.warning(error.response.data.message);                
                    })       
                },
            )
        },
        updateData(item) {            
            this.inputType = 'Ubah';
            this.editId = item.id;
            this.achievementForm = {
                judul: item.nama_prestasi,
                gambar: item.gambar_prestasi,
            };
            if (item.gambar_prestasi != null) {
                this.image.show = this.getImgFromDBOrFile(item.gambar_prestasi);
            }            
            this.dialog.achievement = true;
        },
        previewImg() { 
            if (this.image.form != null) {
                this.image.show = this.getImgFromDBOrFile(this.image.form)
            } else{
                if (this.formTitle == 'Tambah') {
                    this.image.show = null
                } else {
                    this.image.show = this.getImgFromDBOrFile(this.form.gambar)
                }                
            }
        },
        showImg(){
            if (this.formTitle == 'Tambah') {
                if (this.image.form != null) {
                    return true
                } else {
                    return false
                }                    
            } else {
                if (this.image.form != null) {                    
                    return true
                } else {
                    if (this.achievementForm.gambar == null) {
                        return false
                    }
                    return true
                }                
            }
        },
        getImgFromDBOrFile(img) {
            if (typeof img === "string") {
                return this.$baseUrl + '/images/' + img
            } else {
                return URL.createObjectURL(img)
            }
        },
        triggerUpdateImg() {
            this.isChangeImg = true;
            window.addEventListener('focus', () => {
                this.isChangeImg = false
            }, { once: true });
            this.$refs.uploadImg.click();
        },
        close() {                
            this.dialog = {
                password: false,
                achievement: false,
            };
            this.inputType = 'Tambah';
            this.clear();
        },
        clear() {
            this.$refs.formPassword.reset();
            this.$refs.formAchievement.reset();            
            this.image = {
                form: null,
                show: null,
            };
            this.bankForm = {
                an: null,
                bank: null,
                no: null,
            }
            this.isChangeImg = false;
        }
    },
    computed: {
        formTitle() {
            return this.inputType
        },            
    },
    mounted() {
        this.loadCoachById()
        this.loadListAchievementByIdCoach()
    }
}
</script>