<template>
    <v-main class="my_class">
        <h2 class = "white-color mb-5">Coaching Clinic Saya</h2>
        <div class="table-content">
            <v-row>
                <v-col cols=3>
                    <v-card height=400>
                        <v-card-title>
                            <v-text-field
                                dense                            
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Cari"
                                outlined
                                hide-details>
                            </v-text-field>
                        </v-card-title>
                        <v-list>
                            <v-list-item-group
                                class="mt-2"
                                style="border-bottom: 1px solid #C4C4C4;"
                                v-model="selectedMenu"
                                color="primary">                                                                        
                                <v-list-item                                
                                    @click="changeMenu(selectedMenu)"
                                    v-for="(item, i) in menus"
                                    :key="i"
                                    >                                        
                                    <v-list-item-content>                                        
                                        <v-list-item-title class="font-weight-bold mb-6" v-text="item.judul">{{i}}</v-list-item-title>
                                        <v-row class="pl-3 mb-1">
                                            <span style="font-size: 13px; color:#C4C4C4;" class="font-weight-medium mr-3" v-text="item.game"></span>
                                            <span style="font-size: 13px; width:20%;" class="font-weight-medium ml-4" :class="getTipeColor(item.tipe)" v-text="item.tipe"></span>
                                        </v-row>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols=8>
                    <v-card height=1000>
                        <div class="register-card" v-if="myCC.data_coaching_clinic != null">
                            <v-row>
                                <v-col cols=3 style="text-align: -webkit-center;" class="mt-5">
                                    <div class="img-border-kelas-my">
                                        <v-img                                            
                                            class="img-kelas-beranda"
                                            :src="getImgFromDB(myCC.data_coaching_clinic.gambar_coaching_clinic)"
                                        ></v-img>
                                    </div>
                                </v-col>
                                <v-col cols=9 style="padding-right: 50px !important;">
                                    <v-row class="detail-list">
                                        <v-card-title>
                                            <h3 class="font-weight-bold">{{ myCC.data_coaching_clinic.judul_coaching_clinic}}</h3>
                                        </v-card-title>
                                    </v-row>
                                    <v-row class="detail-list">
                                        <v-col md="auto">
                                            <v-avatar
                                                class="ml-1"
                                                size="35"                                
                                            >
                                                <v-img :src="getImgFromDB(myCC.data_coaching_clinic.foto_profil_coach)"></v-img>
                                            </v-avatar>
                                        </v-col>
                                        <v-col md="auto" style="padding-left: 0px !important;">
                                            <h4 style="transform: translateY(20%);">Coach {{ myCC.data_coaching_clinic.nama_coach }}</h4>
                                        </v-col>
                                        <v-col md="auto" style="padding-left: 0px !important;">
                                            <h4 class="star-color" style="transform: translateY(20%);">{{ myCC.data_coaching_clinic.total_rate }}</h4>
                                        </v-col>
                                        <v-col class="mt-1" style="padding-left: 0px !important;">
                                            <star-rating
                                                style="transform: translateY(5%);"
                                                :increment="0.5"
                                                :rating="myCC.data_coaching_clinic.total_rate"
                                                :show-rating="false"
                                                :read-only="true"
                                                :star-size="16"
                                            ></star-rating>
                                        </v-col>
                                    </v-row>
                                    <v-row class="detail-list">
                                        <v-col md="auto" class="no-padding">
                                            <v-card-subtitle>
                                                <h3>{{ myCC.data_coaching_clinic.game_coaching_clinic }}</h3>
                                            </v-card-subtitle>
                                        </v-col>                                        
                                    </v-row>
                                    <v-row class="detail-list" v-if="myCC.data_coaching_clinic.tipe_coaching_clinic == 'Online'">
                                        <v-col md="auto" class="no-padding">
                                            <v-card-subtitle>
                                                <h3>Via {{ myCC.data_coaching_clinic.at_coaching_clinic }}</h3>
                                            </v-card-subtitle>
                                        </v-col>                            
                                        <v-col cols=7 class="no-padding">
                                            <v-card-subtitle>
                                                <span style="font-size:10px;" class="text-decoration-underline light-blue-color font-weight-normal">{{ myCC.data_coaching_clinic.link_coaching_clinic }}</span>
                                            </v-card-subtitle>
                                        </v-col>
                                    </v-row>
                                    <v-row class="detail-list" v-else>
                                        <v-col md="auto" class="no-padding">
                                            <v-card-subtitle>
                                                <h3>Lokasi {{ myCC.data_coaching_clinic.at_coaching_clinic }}</h3>
                                            </v-card-subtitle>
                                        </v-col>
                                    </v-row>
                                    <v-row class="detail-list">
                                        <v-card-text style="font-size:12px;">
                                            {{myCC.data_coaching_clinic.desc_coaching_clinic}}
                                        </v-card-text>
                                    </v-row>
                                    <v-row class="detail-list">
                                        <v-col cols=5 class="no-padding">
                                            <v-card-subtitle style="width:100%">
                                                <h4 class="font-weight-medium tipe-tosca-color">{{ myCC.status_my_coaching_clinic }}</h4>
                                            </v-card-subtitle>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols=4>
                                    <v-card-title>
                                        <h5>Daftar Modul</h5>
                                    </v-card-title>
                                    <div class="mt-1 ml-3 enable-scroll-y-modul-my">
                                        <v-data-iterator                                            
                                            disable-pagination
                                            hide-default-footer
                                            :items="myCC.data_coaching_clinic.data_module">
                                            <template v-slot:default="props">
                                                <div 
                                                    v-for="item in props.items"
                                                    :key="item.id">
                                                        <v-row class="">
                                                            <v-card-subtitle style="width:100%">
                                                                <h5 class="pointer-download font-weight-medium">{{ item.file_modul }}</h5>
                                                            </v-card-subtitle>                                                            
                                                        </v-row>                                                      
                                                </div>                                        
                                            </template>
                                        </v-data-iterator>
                                    </div>
                                </v-col>
                                <v-col cols=8>
                                    <v-card-title>
                                        <h5>Jadwal Coaching Clinic</h5>
                                    </v-card-title>
                                    <div class="mt-1 ml-3 enable-scroll-y-beranda">
                                        <v-data-iterator                                                                    
                                            :items="myCC.data_coaching_clinic.data_register"
                                            disable-pagination
                                            hide-default-footer>
                                                <template v-slot:default="props">
                                                    <v-row style="width:500px">
                                                        <v-col                                        
                                                            cols=6
                                                            v-for="item in props.items"
                                                            :key="item.id">
                                                            <v-card>                                        
                                                                <v-card-subtitle class="justify-center">
                                                                    <v-row>
                                                                        <v-col>
                                                                            <h5 class="font-weight-medium light-blue-color">{{ getIdDate(item.tgl_coaching_clinic) }}</h5>
                                                                        </v-col>
                                                                        <v-col>
                                                                            <h5 v-if="item.berakhir_coaching_clinic != null" class="font-weight-medium light-blue-color">{{ getIdTime(item.mulai_coaching_clinic) }} - {{ getIdTime(item.berakhir_coaching_clinic) }} WIB</h5>
                                                                            <h5 v-else class="font-weight-medium light-blue-color">{{ getIdTime(item.mulai_coaching_clinic) }} WIB</h5>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <v-row class="justify-start">
                                                                        <v-col class="padding-row-register-bottom">
                                                                            <h5 class="black-color">Nama Peserta Terdaftar</h5>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <v-row class="justify-start">
                                                                        <v-col class="padding-row-register-bottom">
                                                                            <h6 class="black-color font-weight-medium">{{getParticipant(item.data_participant)}}</h6>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-card-subtitle>
                                                            </v-card>
                                                        </v-col>
                                                    </v-row>
                                                </template>
                                        </v-data-iterator>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                        <v-divider class="mb-1" v-if="myCC.data_coaching_clinic != null"></v-divider>
                        <div class="register-card" v-if="myCC.data_coaching_clinic != null">
                            <v-row>
                                <v-col cols=7>
                                    <v-form ref="form">
                                        <v-card-title>
                                            <h5>Penilaian Pelayanan</h5>
                                        </v-card-title>
                                        <v-card-subtitle>
                                            <v-row>
                                                <v-col md="auto">
                                                    <h3 v-if="assessment == null" class="font-weight-medium">Berikan nilai</h3>
                                                    <h3 v-else class="font-weight-medium">Nilai</h3>
                                                </v-col>
                                                <v-col md="auto">
                                                    <star-rating
                                                        v-if="assessment == null"
                                                        v-model="form.rate"
                                                        :increment="0.5"
                                                        :show-rating="false"
                                                        :star-size="20"
                                                    ></star-rating>
                                                    <star-rating
                                                        v-else                                                        
                                                        :rating="assessment.rate"
                                                        :read-only="true"
                                                        :increment="0.5"
                                                        :show-rating="false"
                                                        :star-size="20"
                                                    ></star-rating>
                                                </v-col>
                                                <!-- <v-col md="auto">
                                                    <span class="light-red-color">Nilai belum diisi !</span>
                                                </v-col> -->
                                            </v-row>                                        
                                        </v-card-subtitle>
                                        <v-row class="mt-1">
                                            <v-card-subtitle style="width:100%;" class="ml-3 padding-row-register-bottom">
                                                <v-textarea
                                                    v-if="assessment == null"
                                                    v-model="form.comment"
                                                    no-resize
                                                    rows="4"
                                                    label="Komentar"
                                                    outlined
                                                    required
                                                ></v-textarea>
                                                <v-textarea
                                                    v-else
                                                    :value="assessment.komentar"
                                                    no-resize
                                                    rows="4"
                                                    label="Komentar"
                                                    disabled
                                                    outlined
                                                    required
                                                ></v-textarea>
                                            </v-card-subtitle>
                                        </v-row>
                                    </v-form>
                                </v-col>
                                <v-col v-if="assessment == null" class="btn-send-assessment mb-5">
                                    <v-card-title>
                                        <v-btn
                                                class="register-as-button font-weight-bold"
                                                medium
                                                depressed
                                                block
                                                @click="handleAddAssessment"
                                            >
                                                <span v-if="isLoad.btn == false">Kirim</span>
                                                <v-progress-circular 
                                                    v-else
                                                    indeterminate
                                                ></v-progress-circular>
                                        </v-btn>
                                    </v-card-title>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-main>
</template>

<style scoped>
    .v-list .v-list-item--active {
        color: #000000;
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
import moment from "moment";
export default {
    name: "my_class",
    data() {
        return {
            isLoad: {
                all: false,
                btn: false,
            },
            search: '',
            my: JSON.parse(localStorage.getItem('participant')),
            selectedMenu : 0,
            menus: [],
            myClass: [],
            myCC: [],
            assessment: [],
            form: {
                rate: null,
                comment: null,
            }
        };
    },
    methods: {
        loadListMyCoachingClinicByIdParticipant() {
            this.isLoad.all = true
            var url = this.$api + '/participant/get_participant_my_coaching_clinics/' + this.my.id;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.myClass = JSON.parse(JSON.stringify(response.data.data_participant.data_my_coaching_clinics));
                this.myCC = JSON.parse(JSON.stringify(response.data.data_participant.data_my_coaching_clinics[0]));
                this.menus = JSON.parse(JSON.stringify(response.data.data_participant.daftar_coaching_clinics));
                this.loadAssessmentByIdMyCoachingClinic(this.myCC.id)                
                this.isLoad.all = false;
            })
        },
        loadAssessmentByIdMyCoachingClinic(id) {
            this.isLoad.all = true
            var url = this.$api + '/participant/get_assessment/' + id;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.assessment = response.data.data_coach_assessment                
                this.isLoad.all = false;
            })
        },
        handleAddAssessment() {
            if (this.$refs.form.validate()) {
                this.isLoad.btn = true;
                let data = {
                    id_coach: this.myCC.data_coaching_clinic.id_coach,
                    id_peserta: this.my.id,
                    id_my: this.myCC.data_coaching_clinic.id_my,
                    rate: this.form.rate,
                    komentar: this.form.comment
                };
    
                var url = this.$api + '/participant/add_coach_assessment'
                this.$http.post(url, data, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.loadListMyCoachingClinicByIdParticipant();
                    this.loadAssessmentByIdMyCoachingClinic();
                    this.reset();
                    this.isLoad.btn = false;
                    this.$popup.success(response.data.message);
                }).catch(error => {
                    this.$popup.warning(error.response.data.message);
                    this.isLoad.btn = false;
                }) 
            }
        },
        changeMenu(index) {
            this.reset()
            console.log(index)
            this.myCC = this.myClass[index]
            console.log(this.myCC)
        },
        getTipeColor(tipe) {
            if (tipe == 'Online') return 'tipe-green-color'
            else return 'tipe-orange-color'
        },
        getImgFromDB(img) {
            return this.$baseUrl + '/images/' + img            
        },
        getIdDate(dt) {
            moment.locale("id");
            return moment(dt).format("D MMMM YYYY");
        },
        getIdTime(time) {                    
            return moment(moment(time,'HH:mm:ss')).format("HH:mm");
        },
        getParticipant(participant) {
            var list = ''
            for (let i = 0; i < participant.length; i++) {
                list = list + participant[i] + ','
            }
            return '(' + list + ')'
        },
        reset() {
            this.form = {
                rate: null,
                comment: null,
            }
        }
    },
    mounted() {
        this.loadListMyCoachingClinicByIdParticipant()        
    }
}
</script>