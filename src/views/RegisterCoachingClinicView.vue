<template>
    <v-main class="register_coaching_clinic">
        <h2 v-if="inputType != 'Ubah'" class = "white-color mb-5">Pendaftaran Coaching Clinic</h2>
        <h2 v-else class = "white-color mb-5">{{formTitle}} Pendaftaran Coaching Clinic</h2>
        <div class="table-content" v-if="isLoad.all == false">
            <v-card height=600 style="overflow-x: hidden;">
                <div class="register-card">
                    <v-row>
                        <v-col cols=3 style="text-align: -webkit-center;">
                            <div class="img-border-kelas-detail">
                                <v-img 
                                    class="img-kelas-beranda"
                                    :src="getImgFromDB(coachingClinic.gambar_coaching_clinic)">
                                </v-img>
                            </div>
                        </v-col>
                        <v-col cols=5 style="padding-right: 50px !important;">
                            <v-row class="detail-list">
                                <v-card-title>
                                    <h3 class="font-weight-bold">{{ coachingClinic.judul_coaching_clinic}}</h3>
                                </v-card-title>
                            </v-row>
                            <v-row class="detail-list">
                                <v-col md="auto">
                                    <v-avatar
                                        class="ml-1"
                                        size="35"                                
                                    >
                                        <v-img :src="getImgFromDB(coachingClinic.foto_profil_coach)"></v-img>
                                    </v-avatar>
                                </v-col>
                                <v-col md="auto" style="padding-left: 0px !important;">
                                    <h4 style="transform: translateY(20%);">Coach {{ coachingClinic.nama_coach }}</h4>
                                </v-col>
                                <v-col md="auto" style="padding-left: 0px !important;">
                                    <h4 class="star-color" style="transform: translateY(20%);">{{ coachingClinic.total_rate }}</h4>
                                </v-col>
                                <v-col class="mt-1" style="padding-left: 0px !important;">
                                    <star-rating
                                        style="transform: translateY(5%);"
                                        :increment="0.5"
                                        :rating="coachingClinic.total_rate"
                                        :show-rating="false"
                                        :read-only="true"
                                        :star-size="16"
                                    ></star-rating>
                                </v-col>
                            </v-row>
                            <v-row class="detail-list">
                                <v-col md="auto" class="no-padding">
                                    <v-card-subtitle>
                                        <h3>{{ coachingClinic.game_coaching_clinic }}</h3>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col md="auto">
                                    |
                                </v-col>
                                <v-col cols=5 class="no-padding">
                                    <v-card-subtitle>
                                        <h3 class="light-blue-color">{{ getCurrency(coachingClinic.harga_coaching_clinic) }} / Kuota</h3>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="detail-list" v-if="coachingClinic.tipe_coaching_clinic == 'Online'">
                                <v-col md="auto" class="no-padding">
                                    <v-card-subtitle>
                                        <h3>Via {{ coachingClinic.at_coaching_clinic }}</h3>
                                    </v-card-subtitle>
                                </v-col>                            
                                <v-col cols=8 class="no-padding">
                                    <v-card-subtitle>
                                        <span style="font-size:10px;" class="grey-color font-weight-normal">* Tautan dibagikan setelah terdaftar mengikuti coaching clinic</span>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="detail-list" v-else>
                                <v-col md="auto" class="no-padding">
                                    <v-card-subtitle>
                                        <h3>Lokasi {{ coachingClinic.at_coaching_clinic }}</h3>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="detail-list">
                                <v-card-text style="font-size:12px;">
                                    {{coachingClinic.desc_coaching_clinic}}
                                </v-card-text>
                            </v-row>
                        </v-col>
                        <v-col cols=4>
                            <v-row class="detail-list">
                                <v-card-title>
                                    <h5 class="font-weight-bold">Pilih Jadwal</h5>
                                </v-card-title>
                            </v-row>
                            <v-row class="enable-scroll-y-register">
                                <v-data-iterator                                    
                                    :items="schedules"
                                    disable-pagination
                                    hide-default-footer>                        
                                        <template v-slot:default="props">
                                            <div
                                                class="schedule-register-padding"
                                                v-for="item in props.items"
                                                :key="item.tgl_coaching_clinic">
                                                <v-row class="mt-1 mb-7">
                                                    <v-card @click="selectSchedule(item)" v-if="checkSchedules(item)" width=350>
                                                        <v-card-subtitle class="justify-center">
                                                            <v-row>
                                                                <v-col>
                                                                    <h5 class="black-color">{{ getIdDate(item.tgl_coaching_clinic) }}</h5>
                                                                </v-col>
                                                                <v-col>
                                                                    <h5 v-if="item.berakhir_coaching_clinic != null" class="black-color">{{ getIdTime(item.mulai_coaching_clinic) }} - {{ getIdTime(item.berakhir_coaching_clinic) }} WIB</h5>
                                                                    <h5 v-else class="black-color">{{ getIdTime(item.mulai_coaching_clinic) }} WIB</h5>
                                                                </v-col>
                                                                <v-col v-if="selected.schedule == item.id"  cols=2>
                                                                    <v-icon class="btn-check" small>mdi-check-bold</v-icon>
                                                                </v-col>
                                                                <v-col v-else cols=2>                                                                    
                                                                </v-col>
                                                            </v-row>                                                            
                                                        </v-card-subtitle>
                                                    </v-card>                                                
                                                </v-row>
                                            </div>
                                        </template>
                                </v-data-iterator>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row class="mt-5 mb-3 form-register-coaching-clinic-row">
                        <v-card-title>
                            <h5 class="font-weight-bold">Detail Pendaftaran</h5>
                        </v-card-title>
                    </v-row>
                    <v-form ref="form">
                        <v-row>
                            <v-col cols=2 class="no-padding">
                                <v-card-title>
                                    <h6 class="font-weight-bold">Jumlah Kuota Beli</h6>
                                </v-card-title>
                                <v-card-subtitle class="padding-row-register">
                                    <v-text-field                                        
                                        dense
                                        v-model="form.jml"
                                        single-line
                                        :rules="[rules.jmlRequired]"
                                        :hint="selected.jml != null ? 'Tersisa ' + (selected.jml-form.jml) + ' Kuota' : undefined"
                                        persistent-hint
                                        type=number
                                        min=1
                                        :max="selected.jml >= 5 ? 5 : selected.jml"
                                        outlined
                                        required
                                    ></v-text-field>
                                </v-card-subtitle>
                            </v-col>
                            <v-col cols=8 class="no-padding ml-6">
                                <v-row>
                                    <v-col cols=4 class="padding-peserta">
                                        <v-card-title>
                                            <h6 class="font-weight-bold">Peserta</h6>
                                        </v-card-title>
                                        <v-card-subtitle class="padding-row-register">
                                            <v-text-field                                            
                                                dense
                                                v-model="form.p1"
                                                single-line
                                                :rules="[rules.pRequired]"                                            
                                                outlined
                                                required
                                            ></v-text-field>
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col cols=4 class="padding-peserta" v-if="form.jml >= 2">
                                        <v-card-title>
                                            <h6 class="font-weight-bold">Peserta</h6>
                                        </v-card-title>
                                        <v-card-subtitle class="padding-row-register">
                                            <v-text-field                                        
                                                dense
                                                v-model="form.p2"
                                                single-line
                                                :rules="[rules.pRequired]"                                            
                                                outlined
                                                required
                                            ></v-text-field>
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col cols=4 class="padding-peserta" v-if="form.jml >= 3">
                                        <v-card-title>
                                            <h6 class="font-weight-bold">Peserta</h6>
                                        </v-card-title>
                                        <v-card-subtitle class="padding-row-register">
                                            <v-text-field                                        
                                                dense
                                                v-model="form.p3"
                                                single-line
                                                :rules="[rules.pRequired]"                                            
                                                outlined
                                                required
                                            ></v-text-field>
                                        </v-card-subtitle>
                                    </v-col>                                
                                </v-row>                                                    
                            </v-col>
                        </v-row>
                        <v-row v-if="form.jml >= 4">
                            <v-col cols=2 class="no-padding">                            
                            </v-col>
                            <v-col cols=8 class="no-padding ml-6">
                                <v-row>
                                    <v-col cols=4 class="padding-peserta" v-if="form.jml >= 4">
                                        <v-card-title class="padding-row-register-bottom">
                                            <h6 class="font-weight-bold">Peserta</h6>
                                        </v-card-title>
                                        <v-card-subtitle>
                                            <v-text-field                                            
                                                dense
                                                v-model="form.p4"
                                                single-line
                                                :rules="[rules.pRequired]"                                            
                                                outlined
                                                required
                                            ></v-text-field>
                                        </v-card-subtitle>
                                    </v-col>
                                    <v-col cols=4 class="padding-peserta" v-if="form.jml >= 5">
                                        <v-card-title class="padding-row-register-bottom">
                                            <h6 class="font-weight-bold">Peserta</h6>
                                        </v-card-title>
                                        <v-card-subtitle>
                                            <v-text-field                                        
                                                dense
                                                v-model="form.p5"
                                                single-line
                                                :rules="[rules.pRequired]"                                            
                                                outlined
                                                required
                                            ></v-text-field>
                                        </v-card-subtitle>
                                    </v-col>                                                               
                                </v-row>                            
                            </v-col>
                        </v-row>                    
                    </v-form>
                    <v-row class="form-register-coaching-clinic-row">
                        <v-col cols=2 class="px-3">
                            <v-card-title>
                                <v-row>
                                    <h5 class="font-weight-bold">Total Biaya</h5>
                                    <v-spacer></v-spacer>
                                    <h5 class="font-weight-bold">{{ getCurrency(form.harga*form.jml) }}</h5>
                                </v-row>
                            </v-card-title>
                        </v-col>                        
                    </v-row>
                </div>
                <div class="mt-4 mb-5 register-card">
                    <v-row class="px-3">
                        <v-btn
                                class="cancel-button font-weight-bold"
                                x-large
                                depressed
                                @click="inputType == 'Tambah' ? $router.push('home') : $router.push('participant_payment_transaction')"
                            >
                                <span v-if="isLoad.btn == false">Batal</span>
                                <v-progress-circular 
                                    v-else
                                    indeterminate
                                ></v-progress-circular>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                                class="register-as-button font-weight-bold"
                                x-large
                                depressed
                                @click="inputType == 'Tambah' ? handleAddRegisterCoachingClinic() : handleUpdateRegisterCoachingClinic()"
                            >
                                <span v-if="isLoad.btn == false">Daftar</span>
                                <v-progress-circular 
                                    v-else
                                    indeterminate
                                ></v-progress-circular>
                        </v-btn>
                    </v-row>
                </div>
            </v-card>
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

<script>
import moment from "moment";
export default {
    name: "register_coaching_clinic",    
    data() {
        return {
            my: JSON.parse(localStorage.getItem('participant')),
            isLoad: {
                all: false,
                btn: false,
            },
            register: [],
            coachingClinic: [],
            schedules: [],            
            selected: {
                schedule: null,
                jml: null,
            },
            inputType: 'Tambah',
            form: {
                jml: 1,
                harga: null,
                p1: null,
                p2: null,
                p3: null,
                p4: null,
                p5: null,
            },
            rules: {
                jmlRequired: value => !!value || 'Jumlah beli kuota tidak boleh kosong',
                pRequired: value => !!value || 'Peserta tidak boleh kosong',                
            }
        };
    },
    methods: {
        loadRegisterCoachingClinicById() {
            this.isLoad.all = true;
            var url = this.$api + '/participant/get_register_coaching_clinic/' + this.$route.query.registerId
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.register = response.data.data_register;
                this.form.jml = this.register.jml_beli_kuota;
                this.selected = {
                    schedule: this.register.id_jadwal_coaching_clinic,
                    jml: this.register.kuota_coaching_clinic,
                }
                for (let i = 0; i < this.register.jml_beli_kuota; i++) {
                    if (this.register.status_pendaftaran == 'Other') {
                        if (i == 0) {
                            this.form.p1 = this.register.data_participant[i]
                        }
                        else if (i == 1) {
                            this.form.p2 = this.register.data_participant[i]
                        }
                        else if (i == 2) {
                            this.form.p3 = this.register.data_participant[i]
                        }
                        else if (i == 3) {
                            this.form.p4 = this.register.data_participant[i]
                        }
                        else if (i == 4) {
                            this.form.p5 = this.register.data_participant[i]
                        }                    
                    } else {
                        if (i == 0) {
                            this.form.p1 = this.register.data_participant[this.register.jml_beli_kuota-1]
                        }
                        else if (i == 1) {
                            this.form.p2 = this.register.data_participant[i-1]
                        }
                        else if (i == 2) {
                            this.form.p3 = this.register.data_participant[i-1]
                        }
                        else if (i == 3) {
                            this.form.p4 = this.register.data_participant[i-1]
                        }
                        else if (i == 4) {
                            this.form.p5 = this.register.data_participant[i-1]
                        }
                    }
                }                
                this.isLoad.all = false;
            })
        },
        loadCoachingClinicById() {
            this.isLoad.all = true;
            var url = this.$api + '/participant/get_coaching_clinic/' + this.$route.query.coachingClinicId
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.coachingClinic = response.data.data_coaching_clinic;
                this.form.harga = this.coachingClinic.harga_coaching_clinic
                this.isLoad.all = false;
            })
        },
        loadListScheduleByIdCoachingClinic() {            
            var url = this.$api + '/participant/get_coaching_clinic_schedules/' + this.$route.query.coachingClinicId
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.schedules = response.data.data_coaching_clinic.daftar_jadwal_coaching_clinic;                
            })
        },
        handleAddRegisterCoachingClinic() {
            if (this.$refs.form.validate() && this.selected.schedule != null) {
                this.isLoad.btn = true;

                let data = new FormData
                let status = null
                
                data.append('jml_beli_kuota', this.form.jml);
                data.append('harga_pendaftaran', this.form.jml * this.coachingClinic.harga_coaching_clinic);
                if (this.form.p1 == this.my.nama_peserta) {                    
                    data.append('status_pendaftaran', 'Personal');
                    status = 'Personal';
                } else {
                    data.append('status_pendaftaran', 'Other');
                    status = 'Other';
                }
                data.append('id_peserta', this.my.id);
                data.append('id_coaching_clinic', this.coachingClinic.id);
                data.append('id_jadwal_coaching_clinic', this.selected.schedule);
                if (this.form.jml > 1 || status == 'Other') {
                    if (status == 'Other') {
                        for (let i = 1; i <= this.form.jml; i++) {
                            if (i == 1) {
                                data.append('nama_peserta_' + i, this.form.p1);                                
                            }
                            else if (i == 2) {
                                data.append('nama_peserta_' + i, this.form.p2);                                
                            }
                            else if (i == 3) {
                                data.append('nama_peserta_' + i, this.form.p3);
                            }
                            else if (i == 4) {
                                data.append('nama_peserta_' + i, this.form.p4);
                            }
                            else if (i == 5) {
                                data.append('nama_peserta_' + i, this.form.p5);
                            }
                        }
                    } else if (status != 'Other') {
                        for (let i = 1; i <= this.form.jml-1; i++) {
                            if (i == 1) {
                                data.append('nama_peserta_' + i, this.form.p2);                                
                            }
                            else if (i == 2) {
                                data.append('nama_peserta_' + i, this.form.p3);                                
                            }
                            else if (i == 3) {
                                data.append('nama_peserta_' + i, this.form.p4);
                            }
                            else if (i == 4) {
                                data.append('nama_peserta_' + i, this.form.p5);
                            }
                        }
                    }
                }                                
                                
                var url = this.$api + '/participant/add_register_coaching_clinic'
                this.$http.post(url, data, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {                    
                    this.isLoad.btn = false;
                    this.$popup.success(response.data.message);
                    this.$router.push({name : "Home"})
                }).catch(error => {
                    this.$popup.warning(error.response.data.message);
                    this.isLoad.btn = false;
                })
            } else {
                this.$popup.warning('Jadwal Belum Dipilih');
            }
        },
        handleUpdateRegisterCoachingClinic() {
            if (this.$refs.form.validate() && this.selected.schedule != null) {
                this.isLoad.btn = true;

                let data = new FormData
                let status = null
                
                data.append('jml_beli_kuota', this.form.jml);
                data.append('harga_pendaftaran', this.form.jml * this.coachingClinic.harga_coaching_clinic);
                if (this.form.p1 == this.my.nama_peserta) {                    
                    data.append('status_pendaftaran', 'Personal');
                    status = 'Personal';
                } else {
                    data.append('status_pendaftaran', 'Other');
                    status = 'Other';
                }
                data.append('id_peserta', this.my.id);
                data.append('id_coaching_clinic', this.coachingClinic.id);
                data.append('id_jadwal_coaching_clinic', this.selected.schedule);
                if (this.form.jml > 1 || status == 'Other') {
                    if (status == 'Other') {
                        for (let i = 1; i <= this.form.jml; i++) {
                            if (i == 1) {
                                data.append('nama_peserta_' + i, this.form.p1);                                
                            }
                            else if (i == 2) {
                                data.append('nama_peserta_' + i, this.form.p2);                                
                            }
                            else if (i == 3) {
                                data.append('nama_peserta_' + i, this.form.p3);
                            }
                            else if (i == 4) {
                                data.append('nama_peserta_' + i, this.form.p4);
                            }
                            else if (i == 5) {
                                data.append('nama_peserta_' + i, this.form.p5);
                            }
                        }
                    } else if (status != 'Other') {
                        for (let i = 1; i <= this.form.jml-1; i++) {
                            if (i == 1) {
                                data.append('nama_peserta_' + i, this.form.p2);                                
                            }
                            else if (i == 2) {
                                data.append('nama_peserta_' + i, this.form.p3);                                
                            }
                            else if (i == 3) {
                                data.append('nama_peserta_' + i, this.form.p4);
                            }
                            else if (i == 4) {
                                data.append('nama_peserta_' + i, this.form.p5);
                            }
                        }
                    }
                }                                
                                
                var url = this.$api + '/participant/update_register_coaching_clinic/' + this.$route.query.registerId
                this.$http.post(url, data, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {                    
                    this.isLoad.btn = false;
                    this.$popup.success(response.data.message);
                    this.$router.push({name : "Participant Payment Transaction"})
                }).catch(error => {
                    this.$popup.warning(error.response.data.message);
                    this.isLoad.btn = false;
                })
            } else {
                this.$popup.warning('Jadwal Belum Dipilih');
            }
        },
        selectSchedule(item) {
            this.selected = {
                schedule: item.id,
                jml: item.kuota_coaching_clinic,
            }            
            this.form.jml = 1
            this.form.p1 = this.my.nama_peserta
        },
        checkSchedules(item) {
            var fulldt = item.tgl_coaching_clinic + ' ' + item.mulai_coaching_clinic;
            if (item.kuota_coaching_clinic > 0 && moment().format("YYYY-MM-DD HH:mm:ss") < fulldt) {
                return true
            } else return false
        },
        getIdDate(dt) {
            moment.locale("id");
            return moment(dt).format("D MMMM YYYY");
        },
        getIdTime(time) {                    
            return moment(moment(time,'HH:mm:ss')).format("HH:mm");
        },
        getImgFromDB(img) {
            return this.$baseUrl + '/images/' + img
        },
        getCurrency(harga) {
            var temp = new Number(harga)
            var setRupiah = {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }
            return temp.toLocaleString("id-ID", setRupiah)
        },        
    },
    computed: {
        formTitle() {
            return this.inputType
        },            
    },
    mounted() {
        this.loadCoachingClinicById()
        this.loadListScheduleByIdCoachingClinic()
        if (this.$route.query.registerId) {
            this.inputType = 'Ubah';           
            this.loadRegisterCoachingClinicById()
        }else{
            this.form.p1 = this.my.nama_peserta
        }
    }
}
</script>