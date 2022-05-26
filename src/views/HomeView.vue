<template>
    <v-main class="home">
        <div v-if="isLoad.all == false" class="ml-5 body-participant">
            <v-carousel
                cycle
                height="300"
                hide-delimiter-background
                show-arrows-on-hover
            >
                <v-carousel-item
                v-for="(slide, i) in slides"
                :key="i"                                
                >
                <v-sheet                
                height="100%"
                tile
                >
                <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                >
                    <div class="">
                        <v-img 
                            class=""
                            :src="carousel[i]">
                        </v-img>
                    </div>
                </v-row>
                </v-sheet>
                </v-carousel-item>
            </v-carousel>
            <v-row class="mt-5">
                <v-col cols=4>
                    <v-card height=600>
                        <v-card-title>
                            <v-text-field
                                dense                            
                                v-model="search.coach"                                
                                label="Cari Coach"
                                outlined
                                hide-details>
                            </v-text-field>
                        </v-card-title>
                        <div class="enable-scroll-y-beranda achievement-card">
                            <v-data-iterator                                
                                disable-pagination
                                hide-default-footer
                                :items="coachs">                        
                                    <template v-slot:default="props">                                        
                                        <v-row                                        
                                            @click="toDetailCoach(item.id)"
                                            class="info-detail pointer"
                                            v-for="item in props.items"
                                            :key="item.nama_coach">
                                                <v-col cols=3 class="ml-3">
                                                    <div class="img-border-coach-beranda">
                                                        <v-img 
                                                            class="img-coach-beranda"
                                                            :src="getImgFromDB(item.foto_profil_coach)">
                                                        </v-img>
                                                    </div>
                                                </v-col>
                                                <v-col>
                                                    <v-row class="coach-list">
                                                        <v-card-subtitle class="text-left">
                                                            <h3>{{ item.nama_coach }}</h3>                                                        
                                                        </v-card-subtitle>
                                                    </v-row>
                                                    <v-row class="coach-list">
                                                        <v-col md="auto" class="no-padding">
                                                            <v-card-text class="text-left">
                                                                <h3 v-if="item.total_rate" class="star-color">{{ item.total_rate }}</h3>
                                                                <h3 v-else class="star-color">0</h3>
                                                            </v-card-text>
                                                        </v-col>
                                                        <v-col class="mt-1">
                                                            <star-rating
                                                                :increment="0.5"
                                                                :rating="item.total_rate"
                                                                :show-rating="false"
                                                                :read-only="true"
                                                                :star-size="16"
                                                            ></star-rating>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                        </v-row>
                                    </template>
                            </v-data-iterator>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols=8>
                    <v-card height=600>
                        <v-card-title>
                            <v-text-field
                                dense                            
                                v-model="search.coachingClinic"                                
                                label="Cari Coaching Clinic"
                                outlined
                                hide-details>
                            </v-text-field>
                        </v-card-title>
                        <div class="mt-2 achievement-card">
                            <v-row class="ml-1 mr-1">
                                <v-col cols=3 class="text-center no-padding pr-3">
                                    <div :class="gameSelected(game.semua)" class="pointer" @click="setGameStatus(game.semua)">
                                        <h4 style="padding: 4px;" :class="gameSelectedColor(game.semua)" class="font-weight-medium">Semua</h4>
                                    </div>                                    
                                </v-col>
                                <v-col cols=3 class="text-center no-padding pr-3">
                                    <div :class="gameSelected(game.ml)" class="pointer" @click="setGameStatus(game.ml)">
                                        <h4 style="padding: 4px;" :class="gameSelectedColor(game.ml)" class="font-weight-medium">Mobile Legends</h4>
                                    </div> 
                                </v-col>
                                <v-col cols=3 class="text-center no-padding pr-3">
                                    <div :class="gameSelected(game.pubgm)" class="pointer" @click="setGameStatus(game.pubgm)">
                                        <h4 style="padding: 4px;" :class="gameSelectedColor(game.pubgm)" class="font-weight-medium">PUBGM</h4>
                                    </div> 
                                </v-col>
                                <v-col cols=3 class="text-center no-padding">
                                    <div :class="gameSelected(game.ff)" class="pointer" @click="setGameStatus(game.ff)">
                                        <h4 style="padding: 4px;" :class="gameSelectedColor(game.ff)" class="font-weight-medium">Free Fire</h4>
                                    </div> 
                                </v-col>
                            </v-row>
                        </div>
                        <div class="mt-6 ml-2 enable-scroll-y-beranda achievement-card">
                            <v-data-iterator
                                class="text-center"
                                v-if="isLoad.coachingClinic == false"
                                disable-pagination
                                hide-default-footer
                                :items="coachingClinics">                        
                                    <template v-slot:default="props">
                                        <div 
                                            v-for="item in props.items"
                                            :key="item.judul_coaching_clinic">
                                                <v-row class="mt-1">
                                                    <v-col cols=2 class="ml-3">
                                                        <div class="img-border-kelas-beranda">
                                                            <v-img 
                                                                class="img-kelas-beranda"
                                                                :src="getImgFromDB(item.gambar_coaching_clinic)">
                                                            </v-img>
                                                        </div>
                                                    </v-col>
                                                    <v-col class="ml-4" cols=7>
                                                        <v-card-subtitle class="text-left">
                                                            <v-row class="mt-1">
                                                                <h2>{{ item.judul_coaching_clinic }}</h2>
                                                            </v-row>
                                                            <v-row class="mt-8">
                                                                <h3 class="font-weight-medium">{{ item.game_coaching_clinic }}</h3>
                                                            </v-row>
                                                            <v-row class="mt-8">
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
                                                        </v-card-subtitle>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="ml-2 mr-4  mb-10">
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
    name: "home",
    data() {
        return {
            my: JSON.parse(localStorage.getItem('participant')),
            isLoad: {
                all: false,
                coachingClinic: false,
            },
            search: {
                coach: null,
                coachingClinic: null,
            },
            dialog: false,
            gameStatus: 'Semua',
            game: {
                semua: 'Semua',
                ml: 'Mobile Legends',
                pubgm: 'PUBGM',
                ff: 'Free Fire',
            },
            coachingClinics: [],
            coachingClinic: [],
            coachs: [],        
            schedules: [],
            carousel: [
                'http://127.0.0.1:8000/images/slide_1.png',
                'http://127.0.0.1:8000/images/slide_2.png',
            ],
            slides: [
            'First',
            'Second',            
            ],
        };
    },
    methods: {
        loadListCoach() {
            this.isLoad.all = true;
            var url = this.$api + '/participant/get_coachs';
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.coachs = response.data.data_coachs;
                this.isLoad.all = false;
            })
        },
        loadListActiveCoachingClinic() {
            this.isLoad.coachingClinic = true;
            var url = this.$api + '/participant/get_active_coaching_clinics/' + this.gameStatus;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.coachingClinics = response.data.data_coaching_clinics;
                this.isLoad.coachingClinic = false;
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
        getIdDate(dt) {
            moment.locale("id");
            return moment(dt).format("D MMMM YYYY");
        },
        getTipeColor(tipe) {
            if (tipe == 'Online') return 'tipe-green-color'
            else return 'tipe-orange-color'
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
        getImgFromDB(img) {
            return this.$baseUrl + '/images/' + img
        },
        gameSelected(game) {                
            if (game == this.gameStatus) {
                return 'border-category-active'
            } else {
                return 'border-category'
            }
        },
        gameSelectedColor(game) {                
            if (game == this.gameStatus) {
                return 'white-color'
            } else {
                return 'grey-color'
            }
        },
        setGameStatus(status) {            
            this.gameStatus = status;
            this.loadListActiveCoachingClinic()
        },
        toDetailCoach(id){
            this.$router.push({name : "Detail Coach", params :{coachId : id}})
        },
        close() {                
            this.dialog = false;
        },

    },
    computer: {

    },
    mounted() {
        this.loadListActiveCoachingClinic()
        this.loadListCoach()
    },
    components: {
        'dialog-detail-coaching-clinic': DialogDetailCoachingClinic
    },
}
</script>