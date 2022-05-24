<template>
    <v-main class="dialog_detail_coaching_clinic">
        <v-dialog v-model="dialog" persistent width="800">
            <v-card class="card-custom">
               <v-card-title>                   
                    <v-spacer></v-spacer>
                    <v-btn class="btn-close" text @click="close">
                        <v-icon large>mdi-close-circle</v-icon>
                    </v-btn>
                </v-card-title>
                <v-row>
                    <v-col cols=4 class="ml-7">                        
                        <div class="img-border-kelas-detail">
                            <v-img 
                                class="img-kelas-beranda"
                                :src="getImgFromDB(coachingClinic.gambar_coaching_clinic)">
                            </v-img>
                        </div>
                    </v-col>
                    <v-col cols=7>
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
                </v-row>
                <v-row>
                    <v-card-title class="ml-6">
                        <h5 class="font-weight-bold">Jadwal Tersedia</h5>
                    </v-card-title>
                </v-row>
                <v-row class="mb-10">
                    <v-data-iterator                        
                        class="ml-10 mr-7"
                        :items="schedules"
                        disable-pagination
                        hide-default-footer>                        
                            <template v-slot:default="props">
                                <v-row style="width:700px">
                                    <div
                                        style="width:100%;" 
                                        v-for="item in props.items"
                                        :key="item.tgl_coaching_clinic">
                                        <v-col                                        
                                            cols=5
                                            v-if="checkSchedules(item)"
                                            >
                                            <v-card>                                        
                                                <v-card-subtitle class="justify-center">
                                                    <v-row>
                                                        <v-col>
                                                            <h5 class="font-weight-medium black-color">{{ getIdDate(item.tgl_coaching_clinic) }}</h5>
                                                        </v-col>
                                                        <v-col>
                                                            <h5 v-if="item.berakhir_coaching_clinic != null" class="font-weight-medium black-color">{{ getIdTime(item.mulai_coaching_clinic) }} - {{ getIdTime(item.berakhir_coaching_clinic) }} WIB</h5>
                                                            <h5 v-else class="font-weight-medium black-color">{{ getIdTime(item.mulai_coaching_clinic) }} WIB</h5>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row class="justify-center">
                                                        <h5 class="light-blue-color">Sisa Kuota : {{ item.kuota_coaching_clinic }}</h5>
                                                    </v-row>
                                                </v-card-subtitle>
                                            </v-card>
                                        </v-col>
                                    </div>
                                </v-row>
                            </template>
                    </v-data-iterator>                    
                </v-row>
                <div class="mb-5 text-center" v-if="checkUser()">
                    <v-divider class="my-5"></v-divider>
                    <v-btn
                        class="register-as-button font-weight-bold"
                        x-large
                        depressed
                        @click="toRegisterCoachingClinic(coachingClinic.id)"
                    >
                        <span>Mulai Mendaftar</span>                        
                    </v-btn>
                </div>
            </v-card>            
        </v-dialog>
    </v-main>
</template>

<script>
import moment from "moment";
export default {
    name: "dialog_detail_coaching_clinic",
    props: ['coachingClinic', 'schedules', 'dialog'],
    data() {
        return {
        };
    },
    methods: {        
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
        checkSchedules(item) {
            var fulldt = item.tgl_coaching_clinic + ' ' + item.mulai_coaching_clinic;            
            if (item.kuota_coaching_clinic > 0 && moment().format("YYYY-MM-DD HH:mm:ss") < fulldt) {
                return true
            } else return false
        },
        checkUser() {
            if (JSON.parse(localStorage.getItem('participant'))) {
                return true
            } else if (JSON.parse(localStorage.getItem('admin'))) {
                return false
            }
        },
        getIdDate(dt) {
            moment.locale("id");
            return moment(dt).format("D MMMM YYYY");
        },
        getIdTime(time) {                    
            return moment(moment(time,'HH:mm:ss')).format("HH:mm");
        },
        toRegisterCoachingClinic(id){
            this.$router.push({name : "Register Coaching Clinic", query:{coachingClinicId: id} })
        },
        close() {                
            this.$emit('dialogClosed')
        },
    },
    mounted() {
        
    }
}
</script>