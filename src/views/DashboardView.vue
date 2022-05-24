<template>
    <v-main class="dashboard">
        <h2 class = "white-color mb-5">Dashboard</h2>
        <div class="table-content" v-if="isLoad == false && my != null">
            <v-row>
                <v-col cols=8>
                    <v-card color="#7BD2F8" height=130>
                        <v-card-title>
                            <v-row>
                                <v-col cols=9>
                                    <h4 class="white-color mb-5">Selamat Datang, Coach</h4>
                                    <h5 class="font-weight-medium white-color">{{coach.nama_coach}}</h5>
                                </v-col>
                                <v-col align="center" cols=3>
                                    <div class="img-border-dashboard">
                                        <v-img
                                            class="img-avatar"
                                            :src="getImgFromDB(coach.foto_profil_coach)">
                                        </v-img>
                                    </div>
                                </v-col>
                            </v-row>                            
                        </v-card-title>
                    </v-card>
                </v-col>
                <v-col cols=4>
                    <v-card height=130>
                        <v-card-title>
                            <v-row>
                                <v-col cols=5>
                                    <h4 class="mb-5">Rating</h4>
                                    <h5 class="font-weight-medium star-color">{{coach.total_rate}}</h5>                                                                                                                        
                                </v-col>
                                <v-col style="align-self:self-end;">
                                    <star-rating
                                        :rating="coach.total_rate"
                                        :read-only="true"
                                        :increment="0.5"
                                        :show-rating="false"
                                        :star-size="16"
                                    ></star-rating>
                                </v-col>
                            </v-row>
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols=4>
                    <v-card height=130>
                        <v-card-title>
                            <v-row>
                                <v-col>
                                    <h5 class="mb-9">Pendapatan Bulan Ini</h5>
                                    <h5 class="text-decoration-underline font-weight-medium light-blue-color">{{getCurrency(dashboard.income)}}</h5>
                                </v-col>                                
                            </v-row> 
                        </v-card-title>
                    </v-card>
                </v-col>
                <v-col cols=4>
                    <v-card height=130>
                        <v-card-title>
                            <v-row>
                                <v-col>
                                    <h5 class="mb-9">Kuota Terjual Bulan Ini</h5>
                                    <h5 class="text-decoration-underline font-weight-medium light-blue-color">{{dashboard.quota}}</h5>
                                </v-col>                                
                            </v-row> 
                        </v-card-title>
                    </v-card>
                </v-col>
                <v-col cols=4>
                    <v-card height=130>
                        <v-card-title>
                            <v-row>
                                <v-col>
                                    <h5 class="mb-1">Transaksi Pembayaran Membutuhkan Konfirmasi</h5>
                                    <h5 class="text-decoration-underline font-weight-medium light-blue-color">{{dashboard.confirm}}</h5>
                                </v-col>                                
                            </v-row> 
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card height=400>
                        <v-card-title>
                            <h5 class="mb-1">Komentar Bulan Ini</h5>
                        </v-card-title>
                        <div class="enable-scroll-y-beranda achievement-card">
                            <v-row class="coach-list">
                                <v-list dense style="width:100%;">
                                    <v-list-item
                                        class="info-detail"
                                        v-for="(item, i) in assessments"
                                        :key="i"
                                        >                                        
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <v-row>
                                                    <v-col md="auto">
                                                        <div class="img-border-assessment-detail">
                                                            <v-img 
                                                                class="img-coach-detail"
                                                                :src="getImgFromDB(item.foto_profil_peserta)">
                                                            </v-img>
                                                        </div>
                                                    </v-col>
                                                    <v-col md="auto" class="center-col ml-2" style="font-size:16px;">
                                                        {{item.nama_peserta}}
                                                    </v-col>
                                                    <v-col md="auto" class="center-col">
                                                        |
                                                    </v-col>
                                                    <v-col md="auto" class="center-col">                                                        
                                                        <h3 v-if="item.rate" class="star-color">{{ item.rate }}</h3>
                                                        <h3 v-else class="star-color">0</h3>                                                        
                                                    </v-col>
                                                    <v-col md="auto" class="center-col">
                                                        <star-rating
                                                            :increment="0.5"
                                                            :rating="item.rate"
                                                            :show-rating="false"
                                                            :read-only="true"
                                                            :star-size="14"
                                                        ></star-rating>
                                                    </v-col>
                                                </v-row>
                                                <v-row style="margin-top: -5px;">
                                                    <v-col cols=12>
                                                        <h3>{{ item.judul_coaching_clinic }}</h3>
                                                    </v-col>
                                                </v-row>
                                                <v-row style="margin-top: -5px;" class="mb-1">
                                                    <v-col cols=12>
                                                        <h4 class="text-justify font-weight-medium">
                                                            {{ item.komentar }}
                                                        </h4>
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
            </v-row>
        </div>

        <div class="table-content" v-if="isLoad == false && admin != null">
            <v-row>
                <v-col>
                    <v-card color="#7BD2F8" height=70>
                        <v-card-title>
                            <v-row>
                                <v-col cols=9>
                                    <h4 class="white-color mb-5">Selamat Datang, Admin</h4>                                    
                                </v-col>
                            </v-row>                            
                        </v-card-title>
                    </v-card>
                </v-col>               
            </v-row>
            <v-row>
                <v-col cols=4>
                    <v-card height=110>
                        <v-card-title>
                            <v-row>
                                <v-col>
                                    <h5 class="mb-6">Coach Mendaftar Bulan Ini</h5>
                                    <h5 class="text-decoration-underline font-weight-medium light-blue-color">{{dashboard.coach}}</h5>
                                </v-col>                                
                            </v-row> 
                        </v-card-title>
                    </v-card>
                </v-col>
                <v-col cols=4>
                    <v-card height=110>
                        <v-card-title>
                            <v-row>
                                <v-col>
                                    <h5 class="mb-6">Peserta Mendaftar Bulan Ini</h5>
                                    <h5 class="text-decoration-underline font-weight-medium light-blue-color">{{dashboard.participant}}</h5>
                                </v-col>                                
                            </v-row> 
                        </v-card-title>
                    </v-card>
                </v-col>
                <v-col cols=4>
                    <v-card height=110>
                        <v-card-title>
                            <v-row>
                                <v-col>
                                    <h5 class="mb-6">Coaching Clinic Aktif Bulan Ini</h5>
                                    <h5 class="text-decoration-underline font-weight-medium light-blue-color">{{dashboard.active}}</h5>
                                </v-col>                                
                            </v-row> 
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card height=130>
                        <v-card-title>
                            <h5 class="mb-1">Pelayanan Coach Terbaik</h5>
                        </v-card-title>
                        <v-row class="margin-pelayanan achievement-card" v-if="dashboard.best != null">
                            <v-col md="auto">
                                <div class="img-border-assessment-detail">
                                    <v-img 
                                        class="img-coach-detail"
                                        :src="getImgFromDB(dashboard.best.foto_profil_coach)">
                                    </v-img>
                                </div>
                            </v-col>
                            <v-col md="auto" class="center-col ml-2" style="font-size:16px;">
                                {{dashboard.best.nama_coach}}
                            </v-col>
                            <v-col md="auto" class="center-col">
                                |
                            </v-col>
                            <v-col md="auto" class="center-col">                                                        
                                <h4 v-if="dashboard.best.total_rate" class="star-color">{{ dashboard.best.total_rate }}</h4>
                                <h4 v-else class="star-color">0</h4>                                                        
                            </v-col>
                            <v-col md="auto" class="center-col">
                                <star-rating
                                    :increment="0.5"
                                    :rating="dashboard.best.total_rate"
                                    :show-rating="false"
                                    :read-only="true"
                                    :star-size="14"
                                ></star-rating>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card height=400>
                        <v-card-title>
                            <h5 class="mb-1">Komentar Peserta Bulan Ini</h5>
                        </v-card-title>
                        <div class="enable-scroll-y-beranda achievement-card">
                            <v-row class="coach-list">
                                <v-list dense style="width:100%;">
                                    <v-list-item
                                        class="info-detail"
                                        v-for="(item, i) in assessments"
                                        :key="i"
                                        >                                        
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <v-row>
                                                    <v-col md="auto">
                                                        <div class="img-border-assessment-detail">
                                                            <v-img 
                                                                class="img-coach-detail"
                                                                :src="getImgFromDB(item.foto_profil_peserta)">
                                                            </v-img>
                                                        </div>
                                                    </v-col>
                                                    <v-col md="auto" class="center-col ml-2" style="font-size:16px;">
                                                        {{item.nama_peserta}}
                                                    </v-col>
                                                    <v-col md="auto" class="center-col">
                                                        |
                                                    </v-col>
                                                    <v-col md="auto" class="center-col">                                                        
                                                        <h3 v-if="item.rate" class="star-color">{{ item.rate }}</h3>
                                                        <h3 v-else class="star-color">0</h3>
                                                    </v-col>
                                                    <v-col md="auto" class="center-col">
                                                        <star-rating
                                                            :increment="0.5"
                                                            :rating="item.rate"
                                                            :show-rating="false"
                                                            :read-only="true"
                                                            :star-size="14"
                                                        ></star-rating>
                                                    </v-col>
                                                </v-row>
                                                <v-row style="margin-top: 5px;">
                                                    <v-col md="auto" class="center-col">
                                                        <h3>{{ item.judul_coaching_clinic }}</h3>
                                                    </v-col>
                                                    <v-col md="auto" class="center-col">
                                                        |
                                                    </v-col>
                                                    <v-col md="auto" class="center-col">                                                        
                                                        <h3>{{ item.nama_coach }}</h3>                                                        
                                                    </v-col>
                                                </v-row>
                                                <v-row style="margin-top: -5px;" class="mb-1">
                                                    <v-col md="auto" class="center-col">
                                                        <h4 class="text-justify font-weight-medium">
                                                            {{ item.komentar }}
                                                        </h4>
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
            </v-row>
        </div>
    </v-main>
</template>

<script>

export default {
    name: "dashboard",    
    data() {
        return {
            my: JSON.parse(localStorage.getItem('coach')),
            admin: JSON.parse(localStorage.getItem('admin')),
            isLoad: false,
            coach: [],
            assessments: [],
            dashboard: {
                income: null,
                quota: null,
                confirm: null,
                coach: null,
                participant: null,
                active: null,
                best: null,
            }
        }
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
        loadListAssessmentsByIdCoach() {
            this.isLoad = true;
            var url = this.$api + '/coach/get_coach_assessments/' + this.my.id;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.assessments = response.data.data_coach_assessments;
                this.isLoad = false;
            })
        },
        loadListAssessmentInMonth() {
            this.isLoad = true;
            var url = this.$api + '/admin/get_assessments_month'
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.assessments = response.data.data_coach_assessments;
                this.isLoad = false;
            })
        },
        loadDashboardCoach() {
            this.isLoad = true;
            var url = this.$api + '/coach/get_dashboard/' + this.my.id;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.dashboard.income = response.data.income_month;
                this.dashboard.quota = response.data.kuota_month;
                this.dashboard.confirm = response.data.payment_confirm;
                this.isLoad = false;
            })
        },
        loadDashboardAdmin() {
            this.isLoad = true;
            var url = this.$api + '/admin/get_dashboard'
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.dashboard.coach = response.data.coach_month;
                this.dashboard.participant = response.data.participant_month;
                this.dashboard.active = response.data.active_coaching_clinic;
                this.dashboard.best = response.data.best_rate;
                this.isLoad = false;
            })
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
    mounted() {
        if (this.my != null) {
            this.loadCoachById()
            this.loadDashboardCoach()
            this.loadListAssessmentsByIdCoach()            
        } else {
            this.loadListAssessmentInMonth()
            this.loadDashboardAdmin()
        }
    }
}
</script>