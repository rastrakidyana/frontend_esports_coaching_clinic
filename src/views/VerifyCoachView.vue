<template>
    <v-main class="verify_coach">
        <h2 class = "white-color mb-5">Coach</h2>
        <div class="table-content">
            <v-card height=400>
                <v-card-title>
                    <v-text-field
                        dense                            
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Cari Coaching Clinic"
                        outlined
                        hide-details>
                    </v-text-field> 
                    <v-spacer></v-spacer>                   
                </v-card-title>
                <v-data-table v-if="!isLoad.all" :headers="headers" :items="coachs" :search="search" :items-per-page="5">
                    <template v-slot:[`item.aksi`]="{ item }">
                        <v-btn x-small text class="mr-2">
                            <v-icon color="black-color" @click="showDialog(item)">mdi-account-details</v-icon>
                        </v-btn>                                              
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                        <v-chip                            
                            :class="getStatusColor(item.is_verified)">
                            {{ getStatusText(item.is_verified) }}
                        </v-chip>
                    </template>                    
                </v-data-table>
                <div v-else class="loading-table">
                    <v-progress-circular
                        class="light-blue-color"
                        :size="70"
                        :width="7"                                                   
                        indeterminate
                    ></v-progress-circular>
                </div>
            </v-card>
        </div>

        <v-dialog v-model="dialog" v-if="coach != null" persistent width="800">
            <v-card class="card-custom">
                <v-card-title>
                    <span class="headline font-weight-bold">Detail Coach</span>
                    <v-spacer></v-spacer>
                    <v-btn class="btn-close" text @click="close">
                        <v-icon large>mdi-close-circle</v-icon>
                    </v-btn>
                </v-card-title>
                <div class="tab-form">
                    <v-row class="mx-5">
                        <v-col class="no-padding" cols=6>
                            <v-row>
                                <v-col cols=6 class="no-padding">
                                    <v-card-subtitle>
                                        <h3>Nama</h3>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col class="no-padding">
                                    <v-card-subtitle>
                                        <h3 class="font-weight-medium">: {{coach.nama_coach}}</h3>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="margin-top-row-payment">
                                <v-col cols=6 class="no-padding">
                                    <v-card-subtitle>
                                        <h3>Email</h3>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col class="no-padding">
                                    <v-card-subtitle>
                                        <h3 class="font-weight-medium">: {{coach.email_coach}}</h3>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="margin-top-row-payment">
                                <v-col cols=6 class="no-padding">
                                    <v-card-subtitle>
                                        <h3>No. Telp.</h3>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col class="no-padding">
                                    <v-card-subtitle>
                                        <h3 class="font-weight-medium">: {{coach.telp_coach}}</h3>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="margin-top-row-payment">
                                <v-col cols=6 class="no-padding">
                                    <v-card-subtitle>
                                        <h3>Domisili</h3>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col class="no-padding">
                                    <v-card-subtitle>
                                        <h3 class="font-weight-medium">: {{coach.domisili_coach}}</h3>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="margin-top-row-payment">
                                <v-col cols=6 class="no-padding">
                                    <v-card-subtitle>
                                        <h3>Jenis Kelamin</h3>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col class="no-padding">
                                    <v-card-subtitle>
                                        <h3 class="font-weight-medium">: {{coach.jk_coach}}</h3>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="margin-top-row-payment">
                                <v-col cols=6 class="no-padding">
                                    <v-card-subtitle>
                                        <h3>Tanggal Lahir</h3>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col class="no-padding">
                                    <v-card-subtitle>
                                        <h3 class="font-weight-medium">: {{getIdDate(coach.tgl_lahir_coach)}}</h3>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                            <v-row class="margin-top-row-payment">
                                <v-col cols=6 class="no-padding">
                                    <v-card-subtitle>
                                        <h3>Tanggal Bergabung</h3>
                                    </v-card-subtitle>
                                </v-col>
                                <v-col class="no-padding">
                                    <v-card-subtitle>
                                        <h3 class="font-weight-medium">: {{getIdDate(coach.created_at)}}</h3>
                                    </v-card-subtitle>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col class="no-padding center-col" cols=6>
                            <div class="ml-9 img-border-coach-verify">
                                <v-img                                            
                                    class="img-kelas-beranda"
                                    :src="getImgFromDB(coach.foto_profil_coach)"
                                ></v-img>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="mx-2 mt-4">
                        <v-col md="auto" class="no-padding">
                            <v-card-subtitle>
                                <h3>Rating</h3>
                            </v-card-subtitle>
                        </v-col>
                        <v-col md="auto" class="no-padding">
                            <v-card-subtitle>
                                <h3 v-if="coach.total_rate != null" class="star-color">{{ coach.total_rate }}</h3>
                                <h3 v-else class="star-color">0</h3>
                            </v-card-subtitle>
                        </v-col>
                        <v-col md="auto" class="no-padding">
                            <v-card-subtitle style="margin-left: -20px !important;">
                                <star-rating
                                    :increment="0.5"
                                    :rating="coach.total_rate"
                                    :show-rating="false"
                                    :read-only="true"
                                    :star-size="17"
                                ></star-rating>
                            </v-card-subtitle>
                        </v-col>
                    </v-row>
                    <v-row class="mx-6 mt-4 mb-10">
                        <v-col class="no-padding" cols=6>                            
                            <v-card-subtitle class="no-padding">
                                <h3>Deskripsi</h3>
                            </v-card-subtitle>
                            <v-card-text class="no-padding mt-2" style="width:80%;">
                                <h5 class="text-justify font-weight-medium">{{coach.desc_coach}}</h5>
                            </v-card-text>
                        </v-col>
                        <v-col class="no-padding" cols=6>
                            <v-card-subtitle class="ml-9 no-padding">
                                <h3>Prestasi</h3>
                            </v-card-subtitle>
                            <div v-if="coach.daftar_prestasi != null">
                                <template v-for="item in coach.daftar_prestasi">
                                    <v-card-text :key="item.nama_prestasi" class="no-padding mt-2 ml-9">
                                        <h4 class="text-justify font-weight-medium">{{item.nama_prestasi}}</h4>
                                    </v-card-text>
                                </template>
                            </div>
                            <div v-else>
                                <v-card-text class="no-padding mt-2 ml-9">
                                    <h4 class="text-justify font-weight-medium">Belum ada prestasi yang diunggah</h4>
                                </v-card-text>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="mx-5 mt-5">
                        <v-btn v-if="coach.is_verified == 0" class="register-as-button" depressed block @click="handleVerifyCoach(coach.id)">
                            <h4 v-if="isLoad.btn == false">Verifikasi Coach</h4>
                            <v-progress-circular 
                                v-else
                                indeterminate
                            ></v-progress-circular>
                        </v-btn>
                        <v-btn v-else text disabled depressed block>
                            <h4 style="text-transform: none; font-size: 20px !important;" class="light-blue-color">Coach Terverifikasi</h4>
                        </v-btn>
                    </v-row>
                </div>
            </v-card>
        </v-dialog>
    </v-main>
</template>



<script>
import moment from "moment";
export default {
    // require('@/assets/images/image-not-found.png'),
    name: "verify_coach",
    data() {
        return {
            my: JSON.parse(localStorage.getItem('admin')),            
            isLoad: {
                all: false,
                btn: false,
            },
            search: null,
            dialog: false,                                    
            headers: [
                {text: "Nama", align: "start", sortable: true, value: "nama_coach"},
                {text: "No. Telp.", align: "start", value: "telp_coach"},                
                {text: "Status", align: "start", value: "status"},
                {text: "Aksi", align: "start", value: "aksi"},
            ],                                   
            coachs: [],
            coach: [],
        };
    },
    methods: {
        loadListCoach() {
            this.isLoad.all = true;
            var url = this.$api + '/admin/get_coachs'
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.coachs = response.data.data_coachs
                this.isLoad.all = false;
            })
        },
        handleVerifyCoach(id) {
            this.isLoad.btn = true;
            var url = this.$api + '/admin/verify_coachs/' + id
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.close()
                this.$popup.success(response.data.message);
                this.isLoad.btn = false;
            }).catch(error => {
                this.$popup.warning(error.response.data.message);
                this.isLoad.btn = false;
            })
        },      
        showDialog(item) {                                    
            this.coach = item
            this.dialog = true
        },
        getStatusColor(status) {
            if (status == 1) return 'status-green-color'
            else return 'status-red-color'
        },
        getStatusText(status) {
            if (status == 1) return 'Sudah Terverifikasi'
            else return 'Belum Terverifikasi'
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
        },        
    },
    computed: {

    },
    mounted() {
        this.loadListCoach();
    }
}
</script>