<template>
    <v-main class="participant_transaction">
        <h2 class = "white-color mb-5">Transaksi Pembayaran Pendaftaran Coaching Clinic</h2>
        <!-- <span>{{tes()}}</span> -->
        <div class="table-content">
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
                                        <v-list-item-title class="font-weight-medium" v-text="item.nama"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-col>
                <v-col cols=8>                    
                    <card-konfirmasi-pendaftaran
                        v-if="isLoad== false && changeMenu(0)"
                        :registers="registers"
                        @addPayment="handleAddPayment"
                        @deleteRegister="handleDeleteRegisterCoachingClinic"
                    ></card-konfirmasi-pendaftaran>                    
                    <card-pembayaran
                        v-else-if="isLoad == false && changeMenu(1)"
                        :payments="filteredPayments"
                        :selectedMenu="selectedMenu"
                    ></card-pembayaran>
                    <card-pembayaran
                        v-else-if="isLoad == false && changeMenu(2)"
                        :payments="filteredPayments"
                        :selectedMenu="selectedMenu"
                    ></card-pembayaran>
                    <card-pembayaran
                        v-else-if="isLoad == false && changeMenu(3)"
                        :payments="filteredPayments"
                        :selectedMenu="selectedMenu"
                    ></card-pembayaran>
                    <card-pembayaran
                        v-else-if="isLoad == false && changeMenu(4)"
                        :payments="filteredPayments"
                        :selectedMenu="selectedMenu"
                    ></card-pembayaran>
                    <div v-else class="loading-table">
                        <v-progress-circular
                            class="white-color"
                            :size="100"
                            :width="10"                                                   
                            indeterminate
                        ></v-progress-circular>
                    </div>
                </v-col>
            </v-row>
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
import moment from "moment";
import CardKonfirmasiPendaftaran from '@/components/CardKonfirmasiPendaftaran.vue'
import CardPembayaran from '@/components/CardPembayaran.vue'
export default {
    name: "participant_transaction",
    data() {
        return {
            isLoad: false,
            my: JSON.parse(localStorage.getItem('participant')),
            selectedMenu: 0,           
            menus: [
                {nama: 'Konfirmasi Pendaftaran'},
                {nama: 'Unggah Bukti Pembayaran'},
                {nama: 'Dalam Proses Konfirmasi Oleh Coach'},
                {nama: 'Pendaftaran Berhasil'},
                {nama: 'Pendaftaran Gagal'},
            ],            
            registers: [],
            payments: [],
            filteredPayments: [],            
        };
    },
    methods: {
        loadListRegisterCoachingClinicByIdParticipant() {
            this.isLoad = true;
            var url = this.$api + '/participant/get_participant_register_coaching_clinics/' + this.my.id;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.registers = response.data.data_participant.daftar_register_coaching_clinic;
                this.isLoad = false;
            })
        },
        loadListPaymentByIdParticipant() {
            this.isLoad = true;
            var url = this.$api + '/participant/get_participant_payment_coaching_clinics/' + this.my.id;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.payments = response.data.data_participant.data_payment_coaching_clinic;
                this.isLoad = false;                
            })
        },
        handleAddPayment(value) {
            this.isLoad = true;            

            var url = this.$api + '/participant/add_payment_coaching_clinic'
            this.$http.post(url, value, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.loadListRegisterCoachingClinicByIdParticipant()
                this.loadListPaymentByIdParticipant()
                this.selectedMenu = 1
                this.isLoad = false;
                this.$popup.success(response.data.message);
            }).catch(error => {
                this.$popup.warning(error.response.data.message);
                this.isLoad = false;
            })            
        }, 
        handleDeleteRegisterCoachingClinic(value) {
            this.$popup.question(
                'Apakah anda yakin menghapus pendaftaran coaching clinic ini ?',
                () => {
                    this.isLoad = true;
                    var url = this.$api + '/participant/delete_register_coaching_clinic/' + value;
                    this.$http.get(url, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {                                        
                        this.loadListRegisterCoachingClinicByIdParticipant() 
                        this.isLoad = false;
                        this.$popup.success(response.data.message);
                    }).catch(error => {
                        this.$popup.warning(error.response.data.message);
                        this.isLoad = false;                
                    })       
                },
            )
        },
        changeMenu(value) {            
            if (this.selectedMenu == value) {
                return true
            } return false
        },        
    },
    mounted() {
        this.loadListRegisterCoachingClinicByIdParticipant()
        this.loadListPaymentByIdParticipant()
    },
    components: {
        'card-konfirmasi-pendaftaran': CardKonfirmasiPendaftaran,
        'card-pembayaran': CardPembayaran
    },
     watch : {        
        selectedMenu: function(val) {
            moment.locale("id")
            let now = moment().format("YYYY-MM-DD HH:mm:ss")
            if (val == 0) {
                return this.filteredPayments = this.payments
            } 
            else if (val == 1) {
                this.filteredPayments = this.payments.filter(payment => {
                    return  moment(payment.countdown).add(1, 'days').format("YYYY-MM-DD HH:mm:ss") > now && payment.is_confirmed == null
                        && payment.nama_pengirim == null
                })
            } else if (val == 2) {
                this.filteredPayments = this.payments.filter(payment => {
                    return payment.is_confirmed == null && payment.nama_pengirim != null
                })
            } else if (val == 3) {
                this.filteredPayments = this.payments.filter(payment => {
                    return payment.is_confirmed == 1                        
                })
            }else if (val == 4) {
                this.filteredPayments = this.payments.filter(payment => {
                    return moment(payment.countdown).add(1, 'days').format("YYYY-MM-DD HH:mm:ss") < now && payment.is_confirmed != 1
                })
            }
        },        
    }
    
}
</script>