<template>
    <v-main class="upload_payment">
        <h2 class = "white-color mb-5">Unggah Bukti Pembayaran</h2>
        <div v-if="isLoad.all == false" class="table-content" style="text-align:-webkit-center">
            <v-card :height="form.gambar != null ? 1100 : 800" width=50% class="padding-bank">
                <v-card outlined color="#FAFAFA" class="card-custom-upload-payment">
                    <v-row class="px-2 py-1 detail-list-payment-dialog">
                        <v-card-title>
                            <h5 class="light-orange-color">Pembayaran melalui rekening berikut :</h5>
                        </v-card-title>
                    </v-row>
                    <v-row class="px-2 py-1 detail-list-payment-dialog-6">
                        <v-card-title>
                            <h5 v-if="payment.data_bank_account != null"><span class="font-weight-medium">A/N</span> {{payment.data_bank_account.an_no_rek}}</h5>
                        </v-card-title>
                    </v-row>
                    <v-row class="px-2 py-1 detail-list-payment-dialog-5">
                        <v-card-title>
                            <h6>No. Rekening</h6>                            
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-card-title>
                            <h6 class="light-blue-color">Batas Waktu Pembayaran : {{displayTime.hours + ':' + displayTime.minutes + ':' + displayTime.seconds}}</h6>
                        </v-card-title>
                    </v-row>
                    <v-row class="px-2 py-1 detail-list-payment-dialog-6">
                        <v-card-title>
                            <h5 v-if="payment.data_bank_account != null">{{payment.data_bank_account.id}}</h5>                            
                        </v-card-title>
                        <v-card-title style="padding-left: 0px !important;">
                            <copy-to-clipboard v-if="payment.data_bank_account != null" :text="toString(payment.data_bank_account.id)" @copy="handleCopy">
                                <v-icon medium>mdi-content-copy</v-icon>
                            </copy-to-clipboard>
                        </v-card-title>
                    </v-row>
                    <v-row class="px-2 py-1">
                        <v-card-title>
                            <h5 v-if="payment.data_bank_account != null">{{payment.data_bank_account.nama_bank}}</h5>                            
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <v-card-title>
                            <v-col>
                                <v-row class="ml-0 detail-list-payment-dialog-4">
                                    <h5 class="yellow-color">{{getCurrency(payment.total_pembayaran)}}</h5>
                                </v-row>
                                <v-row>
                                    <h6 style="font-size: 12px;" class="font-weight-medium ">Total Pembayaran</h6>
                                </v-row>
                            </v-col>
                        </v-card-title>
                    </v-row>
                    <v-row class="mt-8 px-3 detail-list-payment-dialog">
                        <v-card-title>
                            <h5 class="light-orange-color">Informasi Bukti Pembayaran</h5>
                        </v-card-title>
                    </v-row>
                    <div class="tab-upload-form">
                        <div class="mx-7">
                            <v-form ref="form">
                                <v-row class="form-upload-row">
                                    <v-text-field
                                        dense
                                        v-model="form.nama"
                                        label="Nama Pengirim"
                                        :rules="[rules.namaRequired]"
                                        outlined
                                        required
                                    ></v-text-field>
                                </v-row>
                                <v-row class="form-upload-row">
                                    <v-select
                                        dense
                                        v-model="form.bank"
                                        label="Nama Bank"
                                        :items="optionsBank"
                                        item-text="nama"
                                        item-value="nama"                               
                                        :rules="[rules.bankRequired]"
                                        outlined
                                        required
                                    ></v-select>
                                </v-row>
                                <v-row class="form-upload-row">
                                    <v-text-field
                                        dense
                                        v-model="form.rek"
                                        label="No. Rekening"
                                        :rules="[rules.rekRequired]"
                                        outlined
                                        type=number
                                        required
                                    ></v-text-field>
                                </v-row>
                                <v-row class="form-upload-row">
                                    <v-text-field
                                        dense
                                        v-model="form.nominal"
                                        label="Nominal Pembayaran"
                                        :rules="[rules.nominalRequired]"
                                        outlined
                                        type=number
                                        required
                                    ></v-text-field>
                                </v-row>
                                <v-row class="form-upload-row">
                                    <v-file-input
                                        dense
                                        v-model="form.gambar"
                                        prepend-icon=""
                                        accept="image/*"
                                        label="Gambar"
                                        :rules="[rules.gambarRequired]"
                                        @change="onFileChange"
                                        outlined>
                                    </v-file-input>
                                </v-row>
                                <v-row v-if="form.gambar != null" class="form-register-row-img">
                                    <div class="img-border-upload">
                                        <v-img
                                            class="img-avatar"                                         
                                            :src="form.show">
                                        </v-img>
                                    </div>
                                </v-row>                                
                            </v-form>
                        </div>
                        <div class="mb-5" :class="form.gambar != null ? '' : 'mt-5'">
                            <v-row>
                                <v-col cols=6 class="text-left">
                                    <v-btn
                                    class="cancel-button font-weight-bold"
                                    medium
                                    block
                                    depressed
                                    @click="$router.push('participant_payment_transaction')"
                                    >
                                        <span v-if="isLoad.btn == false">Unggah Nanti</span>
                                        <v-progress-circular 
                                            v-else
                                            indeterminate
                                        ></v-progress-circular>
                                    </v-btn>
                                </v-col>
                                <v-col cols=6 class="text-right">
                                    <v-btn
                                    class="register-as-button font-weight-bold"
                                    medium
                                    block
                                    depressed
                                    @click="handleUpdatePayment"
                                    >
                                        <span v-if="isLoad.btn == false">Unggah Sekarang</span>
                                        <v-progress-circular 
                                            v-else
                                            indeterminate
                                        ></v-progress-circular>
                                    </v-btn>
                                </v-col>
                            </v-row>                                                        
                        </div>
                    </div>
                </v-card>
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
import CopyToClipboard from 'vue-copy-to-clipboard'
export default {
    name: "upload_payment",
    data() {
        return {
            isLoad: {
                all: false,
                btn: false,
            },
            form: {
                nama: null,
                bank: null,
                rek: null,                
                nominal: null,
                gambar: null,
                show: null,
            },
            displayTime: {                
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            optionsBank: [
                {nama: 'BRI'},
                {nama: 'BCA'},
                {nama: 'BNI'},
                {nama: 'Mandiri'},
            ],
            timer: null,
            payment: [],
            rules: {
                namaRequired: value => !!value || 'Nama pengirm tidak boleh kosong',
                bankRequired: value => !!value || 'Nama Bank tidak boleh kosong',
                rekRequired: value => !!value || 'No. rekening tidak boleh kosong',
                nominalRequired: value => !!value || 'Nominal pembayaran tidak boleh kosong',                
                gambarRequired: value => !!value || 'Gambar tidak boleh kosong',
            },
        };
    },
    methods: {
        loadPaymentById() {
            this.isLoad.all = true;
            var url = this.$api + '/participant/get_payment_coaching_clinic/' + this.$route.params.paymentId;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.payment = response.data.data_payment_coaching_clinic;
                this.showCountdown(this.payment.countdown)
                this.isLoad.all = false;
            })
        },
        handleUpdatePayment() {
            if (this.$refs.form.validate()) {
                this.isLoad.btn = true
                let data = new FormData

                data.append('nama_pengirim', this.form.nama)
                data.append('nama_bank_pengirim', this.form.bank)
                data.append('no_rek_pengirim', this.form.rek)
                data.append('nominal_pembayaran', this.form.nominal)
                data.append('gambar_bukti_pembayaran', this.form.gambar)

                var url = this.$api + '/participant/update_payment_coaching_clinic/' + this.$route.params.paymentId;
                this.$http.post(url, data, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {                                        
                    this.isLoad.btn = false;
                    this.$router.push({name : "Participant Payment Transaction"})
                    this.$popup.success(response.data.message);
                }).catch(error => {
                    this.$popup.warning(error.response.data.message);
                    this.isLoad.btn = false;
                })
            }
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
        createImage(file) {
            const reader = new FileReader();

            reader.onload = e => {
                this.form.show = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        onFileChange(file) {
            if (!file) {
            return;
            }
            this.createImage(file);
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
        handleCopy () {
            this.$popup.success('Nomor rekening berhasil disalin')
        },
        toString(value) {
            return value.toString();
        },        
    },
    mounted() {
        this.loadPaymentById()                
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
        CopyToClipboard
    },
}
</script>