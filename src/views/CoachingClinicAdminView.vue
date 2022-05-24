<template>
    <v-main class="coaching_clinic_admin">
        <h2 class = "white-color mb-5">Coaching Clinic</h2>
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
                <v-data-table v-if="!isLoad" :headers="headers" :items="coachingClinics" :search="search" :items-per-page="5">
                    <template v-slot:[`item.aksi`]="{ item }">
                        <v-btn x-small text class="mr-2">
                            <v-icon color="black-color" @click="showDialog(item)">mdi-card-text</v-icon> 
                        </v-btn>                        
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                        <v-chip                            
                            :class="getStatusColor(item.status)">
                            {{ item.status }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.tipe_coaching_clinic`]="{ item }">
                        <v-chip                            
                            :class="getTipeColor(item.tipe_coaching_clinic)">
                            {{ item.tipe_coaching_clinic }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.harga_coaching_clinic`]="{ item }">
                        {{ getCurrency(item.harga_coaching_clinic) }}
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

        <dialog-detail-coaching-clinic
            :coachingClinic="coachingClinic"
            :schedules="schedules"
            :dialog="dialog"
            @dialogClosed="close()"
        ></dialog-detail-coaching-clinic>
    </v-main>
</template>



<script>
import DialogDetailCoachingClinic from '@/components/DialogDetailCoachingClinic.vue'
export default {
    // require('@/assets/images/image-not-found.png'),
    name: "coaching_clinic_admin",
    data() {
        return {
            my: JSON.parse(localStorage.getItem('admin')),            
            isLoad: false,
            search: null,
            dialog: false,                        
            headers: [
                {text: "Judul", align: "start", sortable: true, value: "judul_coaching_clinic"},
                {text: "Game", align: "start", value: "game_coaching_clinic"},
                {text: "Harga", align: "start", value: "harga_coaching_clinic"},
                {text: "Tipe", align: "start", value: "tipe_coaching_clinic"},
                {text: "Status", align: "start", value: "status"},
                {text: "Aksi", align: "start", value: "aksi"},
            ],                        
            coachingClinics: [],
            coachingClinic: [],
            schedules: [],
        };
    },
    methods: {
        loadListCoachingClinic() {
            this.isLoad = true;
            var url = this.$api + '/admin/get_coaching_clinics'
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.coachingClinics = response.data.data_coaching_clinics                
                this.isLoad = false;                
            })
        },
        showDialog(item) {
            this.coachingClinic = item
            this.schedules = item.daftar_jadwal            
            this.dialog = true            
        },
        getStatusColor(status) {
            if (status == 'Aktif') return 'status-blue-color'
            else return 'status-red-color'
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
        close() {                
            this.dialog = false
            this.schedules = []
        },        
    },
    computed: {            
    },
    mounted() {
        this.loadListCoachingClinic();        
    },
    components: {
        'dialog-detail-coaching-clinic': DialogDetailCoachingClinic
    },
}
</script>