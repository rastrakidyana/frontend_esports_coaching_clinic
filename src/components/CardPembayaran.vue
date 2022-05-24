<template>
    <v-main class="no-padding card_pembayaran">
        <v-card height=700>            
            <div class="participant-profile-card enable-scroll-y-transaksi-pembayaran">
                <v-card-title>
                    <v-text-field
                        dense                            
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Cari Transaksi"
                        outlined
                        hide-details>
                    </v-text-field>                    
                </v-card-title>
                <div>
                    <v-data-iterator
                        class="text-center"
                        disable-pagination
                        hide-default-footer
                        :items="payments">
                            <template v-slot:default="props">
                                <div
                                    class="schedule-transaction-register-padding"
                                    v-for="item in props.items"
                                    :key="item.id">
                                        <v-row class="mt-4 mb-7">
                                            <v-card width=100% :class="getColor(selectedMenu)" 
                                                class="pointer" 
                                                @click="dialog = true, paymentDialog = item, showCountdown(item.countdown)">
                                                <v-row>                                                    
                                                    <v-card-title class="ml-4">
                                                        <h4 class="black-color">Transaksi Pendaftaran {{ item.id }}</h4>
                                                    </v-card-title>                                                    
                                                </v-row>
                                                <v-row class="margin-top-row-payment mb-4">
                                                    <v-col cols=7>
                                                        <v-row>                                                    
                                                            <v-card-title class="ml-4">
                                                                <h5 class="black-color">Coach {{ item.data_coach.nama_coach }}</h5>
                                                            </v-card-title>                                                    
                                                        </v-row>
                                                        <v-row class="margin-top-row-payment-detail">
                                                            <v-card-title class="ml-4">
                                                                <h6 class="black-color font-weight-medium">{{ getIdDate(item.created_at) }} {{ getIdTime(item.created_at) }} WIB</h6>
                                                            </v-card-title>                                                    
                                                        </v-row>
                                                        <v-row class="margin-top-row-payment">
                                                            <v-card-title class="ml-4">
                                                                <h5 class="black-color">Coaching Clinic</h5>
                                                            </v-card-title>                                                    
                                                        </v-row>
                                                        <v-row class="margin-top-row-list-kelas">
                                                            <v-data-iterator                                                                                        
                                                                :items="item.daftar_coaching_clinic"
                                                                disable-pagination
                                                                hide-default-footer>                        
                                                                    <template v-slot:default="props">
                                                                        <v-row style="width:500px;" class="padding-list-kelas">
                                                                            <v-col
                                                                                style="padding-right: 0px !important;"
                                                                                md="auto"
                                                                                v-for="c in props.items"
                                                                                :key="c">
                                                                                <v-card-title class="no-padding">
                                                                                    <h5 class="blue-border-color"><span class="text-register-kuota">{{ c }}</span></h5>
                                                                                </v-card-title>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </template>
                                                            </v-data-iterator>
                                                        </v-row>
                                                    </v-col>
                                                    <v-col class="mt-8">
                                                        <v-row class="justify-end mr-1">
                                                            <v-card-title>                                                                
                                                                <h6 class="grey-color font-weight-medium">Total Biaya</h6>
                                                            </v-card-title>
                                                        </v-row>
                                                        <v-row class="margin-top-row-payment-biaya justify-end mr-1">
                                                            <v-card-title>                                                                
                                                                <h5 class="yellow-color">{{ getCurrency(item.total_pembayaran) }}</h5>
                                                            </v-card-title>
                                                        </v-row>                                                        
                                                        <v-row class="margin-top-row-payment justify-end mr-1" v-if="selectedMenu == 1">
                                                            <v-card-title>                                                                
                                                                <v-btn depressed x-small class="login-button">
                                                                    <span style="font-size:12px; padding:10px" @click="toUploadPayment(item.id)">Unggah Bukti</span>
                                                                </v-btn>
                                                            </v-card-title>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </v-row>
                                </div>
                            </template>
                    </v-data-iterator>
                </div>
            </div>            
        </v-card>

        <dialog-detail-payment
            :payment="paymentDialog"
            :countdown="displayTime"
            :selectedMenu="selectedMenu"
            :dialog="dialog"
            @dialogClosed="close()"
        ></dialog-detail-payment>
    </v-main>
</template>

<script>
import moment from "moment";
import DialogDetailPayment from '@/components/DialogDetailPayment.vue'
export default {
    name: "card_pembayaran",
    props: ['payments', 'selectedMenu'],
    data() {
        return {
            my: JSON.parse(localStorage.getItem('participant')),
            search: null,
            dialog: false,
            paymentDialog: [],
            displayTime: {                
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            timer: null,
        };
    },
    methods: {                
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
        getIdDate(dt) {
            moment.locale("id");
            return moment(dt).format("D MMMM YYYY");
        },
        getIdTime(time) {                    
            return moment(time).format("HH:mm");
        },
        getCoachingClinic(data) {
            var list = ''
            for (let i = 0; i < data.length; i++) {
                list = list + data[i] + ', '
            }
            return list
        },
        getColor(value) {
            if (value == 1) return 'color-card-payment-yellow'
            else if (value == 2) return 'color-card-payment-blue'
            else if (value == 3) return 'color-card-payment-green'
            else if (value == 4) return 'color-card-payment-red'
        },
        showCountdown(value) {
            this.timer = setInterval(() => {                
                moment.locale("id")
                const now = moment().format("x")
                const end = moment(value).add(1, 'days').format("x")                
                const distance = end - now

                if (distance < 0) {
                    clearInterval(this.timer)
                    return
                }
                                
                const hours = Math.floor(distance / this._hours)
                const minutes = Math.floor((distance % this._hours) / this._minutes)
                const seconds = Math.floor((distance % this._minutes) / this._seconds)
                this.displayTime = {                    
                    hours: hours < 10 ? "0" + hours : hours,
                    minutes: minutes < 10 ? "0" + minutes : minutes,
                    seconds: seconds < 10 ? "0" + seconds : seconds,
                }
            }, 1000)            
        },
        toUploadPayment(id){
            this.$router.push({name : "Upload Payment", params :{paymentId : id}})
        },
        toDeleteRegisterCoachingClinic(id){
            this.$emit('deleteRegister', id)
        },
        close() {
            clearInterval(this.timer)
            this.displayTime = {                    
                hours: 0,
                minutes: 0,
                seconds: 0,
            }
            this.dialog = false;
        }
    },
    mounted() {
        
    },
    computed: {
        _seconds: () => 1000,
        _minutes() {
            return this._seconds * 60
        },
        _hours() {
            return this._minutes * 60
        },
    },
    components: {
        'dialog-detail-payment': DialogDetailPayment
    },
}
</script>   