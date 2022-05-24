<template>
    <v-main class="detail_coach_profile">
        <div v-if="isLoad == false" class="ml-5 body-participant">
            <v-row class="mt-4 px-2">
                <v-card height=250 width=100%>
                    <v-row>
                        <v-col cols=2 class="ml-3">
                            <div class="img-border-coach-detail">
                                <v-img 
                                    class="img-coach-detail"
                                    :src="getImgFromDB(coach.foto_profil_coach)">
                                </v-img>
                            </div>
                        </v-col>
                        <v-col cols=6>
                            <v-row class="mt-3 coach-list">
                                <v-card-title>
                                    <h3>{{ coach.nama_coach }}</h3>
                                </v-card-title>
                            </v-row>
                            <v-row class="coach-list">
                                <v-col md="auto" class="no-padding">
                                    <v-card-text class="text-left">
                                        <h3 v-if="coach.total_rate" class="star-color">{{ coach.total_rate }}</h3>
                                        <h3 v-else class="star-color">0</h3>
                                    </v-card-text>
                                </v-col>
                                <v-col class="mt-1">
                                    <star-rating
                                        :increment="0.5"
                                        :rating="coach.total_rate"
                                        :show-rating="false"
                                        :read-only="true"
                                        :star-size="16"
                                    ></star-rating>
                                </v-col>
                            </v-row>
                            <v-row class="coach-list">
                                <v-col cols=3 class="no-padding">
                                    <v-card-subtitle class="text-left">
                                        <h4 class="font-weight-medium">{{ coach.domisili_coach }}</h4>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col md="auto" class="no-padding">
                                    <v-card-subtitle class="text-left">
                                        <h4 class="font-weight-medium">{{ coach.telp_coach }}</h4>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="coach-list">
                                <v-col cols=3 class="no-padding">
                                    <v-card-subtitle class="text-left">
                                        <h4 class="font-weight-medium">{{ coach.jk_coach }}</h4>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col md="auto" class="no-padding">
                                    <v-card-subtitle class="text-left">
                                        <h4 class="font-weight-medium">{{ getIdDate(coach.tgl_lahir_coach) }}</h4>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="coach-list">
                                <v-col class="no-padding">
                                    <v-card-text style="font-size:12px;" class="text-justify">
                                        {{coach.desc_coach}}
                                    </v-card-text>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col>
                            <v-row class="mt-3 ml-8 coach-list">
                                <v-card-title>
                                    <h3 class="font-weight-medium">Prestasi</h3>
                                </v-card-title>
                            </v-row>
                            <v-row class="mt-3 ml-8 coach-list">
                                <v-list dense>                                                                        
                                    <v-list-item
                                        v-for="(item, i) in achievements"
                                        :key="i"
                                        >                                        
                                        <v-list-item-content>
                                            <v-list-item-title v-text="item.nama_prestasi"></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-row>
            <v-row class="mt-8">
                <v-col cols=4 >
                    <v-card height=500>                    
                        <v-card-title>
                            <h4>Komentar Terhadap Coach</h4>
                        </v-card-title>
                        <div class="enable-scroll-y-beranda achievement-card">
                            <v-row class="coach-list info-detail">
                                <v-list dense>                                                                        
                                    <v-list-item
                                        v-for="(item, i) in assessments"
                                        :key="i"
                                        >                                        
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <v-row>
                                                    <v-col cols=2>
                                                        <div class="img-border-assessment-detail">
                                                            <v-img 
                                                                class="img-coach-detail"
                                                                :src="getImgFromDB(item.foto_profil_peserta)">
                                                            </v-img>
                                                        </div>
                                                    </v-col>
                                                    <v-col md="auto" class="center-col ml-2" style="font-size:14px;">
                                                        {{item.nama_peserta}}
                                                    </v-col>
                                                    <v-col md="auto" class="center-col">
                                                        |
                                                    </v-col>
                                                    <v-col md="auto" class="center-col">                                                        
                                                        <h4 v-if="item.rate" class="star-color">{{ item.rate }}</h4>
                                                        <h4 v-else class="star-color">0</h4>                                                        
                                                    </v-col>
                                                    <v-col md="auto" class="center-col">
                                                        <star-rating
                                                            :increment="0.5"
                                                            :rating="item.rate"
                                                            :show-rating="false"
                                                            :read-only="true"
                                                            :star-size="12"
                                                        ></star-rating>
                                                    </v-col>
                                                </v-row>
                                                <v-row style="margin-top: -5px;">
                                                    <v-col cols=12>
                                                        <h4>{{ item.judul_coaching_clinic }}</h4>
                                                    </v-col>
                                                </v-row>
                                                <v-row style="margin-top: -5px;">
                                                    <v-col cols=12>
                                                        <span class="text-justify">
                                                            {{ item.komentar }}
                                                        </span>
                                                    </v-col>
                                                </v-row>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-row>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols=8>
                    <v-card height=500>
                        <v-card-title>
                            <h4>Daftar Coaching Clinic</h4>
                        </v-card-title>
                        <div class="enable-scroll-y-beranda achievement-card">
                            <v-data-iterator
                                class="text-center"
                                v-if="isLoad == false"
                                disable-pagination
                                hide-default-footer
                                :items="coachingClinics">                        
                                    <template v-slot:default="props">
                                        <div v-for="item in props.items"
                                            :key="item.judul_coaching_clinic">
                                                <v-row>
                                                    <v-col cols=2  class="ml-3">
                                                        <div class="img-border-kelas-beranda">
                                                            <v-img
                                                                v-if="item.gambar_coaching_clinic != null"
                                                                class="img-kelas-beranda"
                                                                :src="getImgFromDB(item.gambar_coaching_clinic)">
                                                            </v-img>
                                                        </div>
                                                    </v-col>
                                                    <v-col cols=7 class="ml-4">
                                                        <v-card-subtitle class="text-left">
                                                            <v-row class="mt-1">
                                                                <h2>{{ item.judul_coaching_clinic }}</h2>
                                                            </v-row>
                                                            <v-row class="mt-8">
                                                                <h3 class="font-weight-medium">{{ item.game_coaching_clinic }}</h3>
                                                            </v-row>
                                                            <v-row v-if="item.status != 'Tidak Aktif'" class="mt-8">
                                                                <v-col cols=3 class="no-padding">
                                                                    <h3 class="font-weight-medium">{{ getCurrency(item.harga_coaching_clinic) }}</h3>
                                                                </v-col>
                                                                <v-col cols=3 class="no-padding">
                                                                    <h3 :class="getTipeColor(item.tipe_coaching_clinic)" style="width:50%;" class="font-weight-medium">{{ item.tipe_coaching_clinic }}</h3>
                                                                </v-col>
                                                                <v-col cols=4 class="no-padding">
                                                                    <h3 class="font-weight-medium">{{ getIdDate(item.tgl_coaching_clinic) }}</h3>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row v-else class="mt-8">
                                                                <v-col cols=3 class="no-padding">
                                                                    <h3 class="tipe-red-color" >{{ item.status }}</h3>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card-subtitle>
                                                    </v-col>
                                                </v-row>                                            
                                                <v-row class="ml-2 mr-4 mb-10">
                                                    <v-btn
                                                        class="register-as-button font-weight-bold"
                                                        x-large
                                                        depressed
                                                        block
                                                        @click="dialog = true, coachingClinic = item, loadListScheduleByIdCoachingClinic(item.id)"
                                                    >
                                                        <span>Detail Coaching Clinic</span>
                                                    </v-btn>
                                                </v-row>
                                        </div>
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

        <dialog-detail-coaching-clinic
            :coachingClinic="coachingClinic"
            :schedules="schedules"
            :dialog="dialog"
            @dialogClosed="close()"
        ></dialog-detail-coaching-clinic>
        
    </v-main>
</template>

<script>
import moment from "moment";
import DialogDetailCoachingClinic from '@/components/DialogDetailCoachingClinic.vue'
export default {
    name: "detail_coach_profile",
    data() {
        return{
            my: JSON.parse(localStorage.getItem('participant')),
            isLoad: false,
            dialog: false,
            coach: [],
            coachingClinics: [],
            achievements: [],
            assessments: [],
            schedules: [],
        };
    },
    methods: {
        loadCoachById() {
            this.isLoad = true;
            var url = this.$api + '/participant/get_coach/' + this.$route.params.coachId;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.coach = response.data.data_coach;
                this.isLoad = false;
            })
        },
        loadListCoachingClinicByIdCoach() {
            this.isLoad = true;
            var url = this.$api + '/participant/get_coach_coaching_clinics/' + this.$route.params.coachId;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.coachingClinics = response.data.data_coach.daftar_coaching_clinic;
                this.isLoad = false;
            })
        },
        loadListScheduleByIdCoachingClinic(id) {            
            var url = this.$api + '/participant/get_coaching_clinic_schedules/' + id;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.schedules = response.data.data_coaching_clinic.daftar_jadwal_coaching_clinic;                
            })
        },
        loadListAchievementByIdCoach() {
            this.isLoad = true;
            var url = this.$api + '/participant/get_coach_achievements/' + this.$route.params.coachId;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.achievements = response.data.data_coach.daftar_prestasi;
                this.isLoad = false;
            })
        },
        loadListAssessmentsByIdCoach() {
            this.isLoad = true;
            var url = this.$api + '/participant/get_coach_assessments/' + this.$route.params.coachId;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.assessments = response.data.data_coach_assessments;
                this.isLoad = false;
            })
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
        close() {                
            this.dialog = false;
        }
    },
    mounted() {
        this.loadCoachById()
        this.loadListAchievementByIdCoach()
        this.loadListAssessmentsByIdCoach()
        this.loadListCoachingClinicByIdCoach()
    },
    components: {
        'dialog-detail-coaching-clinic': DialogDetailCoachingClinic
    },
}
</script>