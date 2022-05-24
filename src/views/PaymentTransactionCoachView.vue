<template>
    <v-main class="participant_transaction">
        <h2 class = "white-color mb-5">Transaksi Pembayaran Pendaftaran Coaching Clinic</h2>
        <div class="table-content">
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
                <v-data-table v-if="!isLoad.all" :headers="headers" :items="payments" :search="search" :items-per-page="5">
                    <template v-slot:[`item.aksi`]="{ item }">
                        <v-btn x-small text class="mr-2">
                            <v-icon color="black-color" @click="showDialog(item)">mdi-card-text</v-icon> 
                        </v-btn>                                   
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                        <v-chip                            
                            :class="getStatusColor(item)">
                            {{ getStatus(item) }}
                        </v-chip>
                    </template>                    
                    <template v-slot:[`item.total_pembayaran`]="{ item }">
                        {{ getCurrency(item.total_pembayaran) }}
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

        <v-dialog v-model="dialog" persistent width="1100">
            <v-card class="card-custom">
                <v-card-title>
                    <span class="headline font-weight-bold">Detail Transaksi Pendaftaran Pembayaran</span>
                    <v-spacer></v-spacer>
                    <v-btn class="btn-close" text @click="close">
                        <v-icon large>mdi-close-circle</v-icon>
                    </v-btn>
                </v-card-title>
                <v-row class="padding-row-info-payment-card mt-1 mb-3">
                    <v-card outlined color="#FAFAFA" class="card-custom-detail-payment">
                        <v-card-title class="detail-list-payment-dialog">
                            <h5>Transaksi Pendaftaran {{ payment.id }}</h5>                    
                        </v-card-title>
                        <v-row class="pl-3">
                            <v-card-title class="detail-list">
                                <h6 class="font-weight-medium">{{getIdDate(payment.created_at)}} {{getIdTime(payment.created_at)}} WIB</h6>
                            </v-card-title>
                        </v-row>
                        <v-row class="pl-3">
                            <v-card-title class="detail-list-payment-dialog-3">
                                <h5 style="font-size: 15px">Informasi Pemesan</h5>
                            </v-card-title>
                        </v-row>
                        <v-row class="pl-3">
                            <v-card-title style="width:100%" class="detail-list-payment-dialog">                                                                
                                <v-col cols=1 class="no-padding"><h6>Nama</h6></v-col>
                                <v-col class="no-padding">
                                    <h6 class="font-weight-medium">: 
                                        {{payment.nama_peserta_pemesan}}
                                    </h6>
                                </v-col>
                            </v-card-title>
                        </v-row>
                        <v-row class="pl-3">
                            <v-card-title style="width:100%" class="detail-list-payment-dialog">                                                                
                                <v-col cols=1 class="no-padding"><h6>Email</h6></v-col>
                                <v-col class="no-padding">
                                    <h6 class="font-weight-medium">: 
                                        {{payment.email_peserta_pemesan}}
                                    </h6>
                                </v-col>
                            </v-card-title>
                        </v-row>
                        <v-row class="pl-3">
                            <v-card-title style="width:100%" class="detail-list">                                                                
                                <v-col cols=1 class="no-padding"><h6>No. Telp.</h6></v-col>
                                <v-col class="no-padding">
                                    <h6 class="font-weight-medium">: 
                                        {{payment.telp_peserta_pemesan}}
                                    </h6>
                                </v-col>
                            </v-card-title>
                        </v-row>
                        <v-row class="pl-3">
                            <v-card-title class="detail-list-payment-dialog-3">
                                <h5 style="font-size: 15px">Rincian Pendaftaran Coaching Clinic</h5>
                            </v-card-title>
                        </v-row>                        
                        <v-row class="pl-3 pt-2 ml-3">
                            <v-data-iterator
                                style="width:100%;"
                                class="text-center"                                
                                disable-pagination
                                hide-default-footer
                                :items="payment.data_register_coaching_clinic">                        
                                    <template v-slot:default="props">
                                        <div                                             
                                            v-for="item in props.items"
                                            :key="item.id">
                                                <v-row class="mt-3">
                                                    <v-col cols=1>
                                                        <div class="img-border-rincian-payment">
                                                            <v-img 
                                                                class="img-kelas-beranda"
                                                                :src="getImgFromDB(item.gambar_coaching_clinic)">
                                                            </v-img>
                                                        </div>
                                                    </v-col>
                                                    <v-col cols=8 style="margin-left:-10px !important;" class="no-padding mt-2">
                                                        <v-card-subtitle class="text-left">
                                                            <v-row>
                                                                <span style="font-size:13px;">{{ item.judul_coaching_clinic }} | {{ item.game_coaching_clinic}}</span>
                                                            </v-row>
                                                            <v-row>
                                                                <v-col cols=2 class="no-padding">
                                                                    <span style="font-size:13px;">{{ getCurrency(item.harga_pendaftaran/item.jml_beli_kuota) }}</span>
                                                                </v-col>
                                                                <v-col  class="no-padding">
                                                                    <span style="font-size:13px;">x {{ item.jml_beli_kuota }} Kuota  {{ getParticipant(item.data_participant) }}</span>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card-subtitle>
                                                    </v-col>
                                                    <v-col>
                                                        <v-card-subtitle class="text-right mr-4">
                                                            <span class="font-weight-bold">{{getCurrency(item.harga_pendaftaran)}}</span>
                                                        </v-card-subtitle>
                                                    </v-col>
                                                </v-row>                                               
                                        </div>                                        
                                    </template>
                            </v-data-iterator>
                        </v-row>
                        <v-divider class="mt-9 mb-9"></v-divider>
                        <v-row class="mr-1" style="justify-content: right;">
                            <v-card-title>
                                <v-col md="auto" class="no-padding mr-4">
                                    <h5 style="font-size: 14px">Total Pembayaran</h5>
                                </v-col>
                                <v-col md="auto" class="no-padding">
                                    <h5 style="font-size: 14px">{{getCurrency(payment.total_pembayaran)}}</h5>
                                </v-col>                                
                            </v-card-title>
                        </v-row>
                    </v-card>
                </v-row>
                <v-row class="mb-3">
                    <v-col cols=4 class="ml-7">
                        <v-row class="detail-list-payment-dialog">
                            <v-card-title>
                                <h5>Informasi Pembayaran</h5>
                            </v-card-title>
                        </v-row>
                        <v-row class="detail-list-payment-dialog-2">
                            <v-card-title>                                
                                <h6 v-if="payment.data_bank_account != null" class="font-weight-medium">A/N <span class="font-weight-bold">{{payment.data_bank_account.an_no_rek}}</span></h6>
                            </v-card-title>
                        </v-row>
                        <v-row class="detail-list-payment-dialog">
                            <v-card-title>
                                <h6 v-if="payment.data_bank_account != null" class="font-weight-bold">
                                    {{payment.data_bank_account.nama_bank}} <span class="ml-1">{{payment.data_bank_account.id}}</span>                                    
                                </h6>
                            </v-card-title>
                        </v-row>
                    </v-col>
                    <v-col cols=3>
                        <v-row class="detail-list-payment-dialog">
                            <v-card-title>
                                <h5>Status</h5>
                            </v-card-title>
                        </v-row>
                        <v-row class="detail-list-payment-dialog-2">
                            <v-card-title class="info-payment mt-1" :class="getColorInfo()">                                
                                <h6>{{getTextInfo(payment.nama_pengirm)}}</h6>
                            </v-card-title>
                        </v-row>
                    </v-col>
                    <v-col>
                        
                    </v-col>
                </v-row>
                <v-row class="mb-10">
                    <v-col cols=4 class="ml-7">
                        <v-row class="detail-list-payment-dialog">
                            <v-card-title>
                                <h5>Informasi Pengirim</h5>
                            </v-card-title>
                        </v-row>
                        <v-row class="detail-list-payment-dialog-2">
                            <v-card-title style="width:100%">                                                                
                                <v-col cols=6 class="no-padding"><h6>Nama Pengirim</h6></v-col>
                                <v-col class="no-padding">
                                    <h6 class="font-weight-medium">: 
                                        <span v-if="payment.nama_pengirim == null">-</span>
                                        <span v-else>{{payment.nama_pengirim}}</span>
                                    </h6>
                                </v-col>
                            </v-card-title>
                        </v-row>
                        <v-row class="detail-list-payment-dialog-2">
                            <v-card-title style="width:100%">                                                                
                                <v-col cols=6 class="no-padding"><h6>Nama Bank</h6></v-col>
                                <v-col class="no-padding">
                                    <h6 class="font-weight-medium">: 
                                        <span v-if="payment.nama_bank_pengirim == null">-</span>
                                        <span v-else>{{payment.nama_bank_pengirim}}</span>
                                    </h6>
                                </v-col>
                            </v-card-title>
                        </v-row>
                        <v-row class="detail-list-payment-dialog-2">
                            <v-card-title style="width:100%">
                                <v-col cols=6 class="no-padding"><h6>No. Rek.</h6></v-col>
                                <v-col class="no-padding">
                                    <h6 class="font-weight-medium">: 
                                        <span v-if="payment.no_rek_pengirim == null">-</span>
                                        <span v-else>{{payment.no_rek_pengirim}}</span>
                                    </h6>
                                </v-col>
                            </v-card-title>
                        </v-row>
                        <v-row class="detail-list-payment-dialog-2">
                            <v-card-title style="width:100%">                                                                
                                <v-col cols=6 class="no-padding"><h6>Nominal Pembayaran</h6></v-col>
                                <v-col class="no-padding">
                                    <h6 class="font-weight-medium">: 
                                        <span v-if="payment.nominal_pembayaran == null">-</span>
                                        <span v-else>{{getCurrency(payment.nominal_pembayaran)}}</span>
                                    </h6>
                                </v-col>
                            </v-card-title>
                        </v-row>
                    </v-col>
                    <v-col cols=3>
                        <v-row class="detail-list-payment-dialog">
                            <v-card-title>
                                <h5 class="font-weight-bold">Bukti Pembayaran</h5>
                            </v-card-title>
                        </v-row>
                        <v-row class="detail-list-payment-dialog-2">
                            <div class="img-border-dialog-payment-participant ml-5">
                                <v-img
                                    v-if="payment.gambar_bukti_pembayaran != null"
                                    class="img-form-dialog-payment-participant"
                                    :src="getImgFromDB(payment.gambar_bukti_pembayaran)">
                                </v-img>
                                <v-img
                                    v-else
                                    class="img-form-dialog-payment-participant"
                                    style="border: 1px solid #000000;"
                                    src="https://siplah-oss.tokoladang.co.id/merchant/4969/product/HsaK1cVxXDRgc7UNHnoSzEIncBf8lhRxcHDSlT5U.jpg">
                                </v-img>
                            </div>
                        </v-row>
                    </v-col>
                    <v-col class="pr-8" v-if="payment.is_confirmed == null">
                        <v-card outlined color="#FAFAFA" class="card-custom-confirm-payment mt-3">
                            <v-card-title class="detail-list-payment-dialog">
                                <h5>Konfirmasi Pembayaran</h5>                    
                            </v-card-title>
                            <div class="mt-6 px-4">
                                <v-row>
                                    <v-col cols=6 class="text-left">
                                        <v-btn
                                        style="font-size: 16px !important;"
                                        class="cancel-button font-weight-bold"
                                        medium
                                        block
                                        depressed
                                        @click="handleConfirmPayment(0)"
                                        >
                                            <span v-if="isLoad.btn == false">Tidak</span>
                                            <v-progress-circular 
                                                v-else
                                                indeterminate
                                            ></v-progress-circular>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols=6 class="text-right">
                                        <v-btn
                                        style="font-size: 16px !important;"
                                        class="register-as-button font-weight-bold"
                                        medium
                                        block
                                        depressed
                                        @click="handleConfirmPayment(1)"
                                        >
                                            <span v-if="isLoad.btn == false">Konfirmasi</span>
                                            <v-progress-circular 
                                                v-else
                                                indeterminate
                                            ></v-progress-circular>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </v-main>
</template>

<script>
import moment from "moment";
export default {
    name: "participant_transaction",
    data() {
        return {
            my: JSON.parse(localStorage.getItem('coach')),
            isLoad: {
                all: false,
                btn: false,
            },
            search: null,
            dialog: false,            
            headers: [
                {text: "No. Transaksi", align: "start", sortable: true, value: "id"},
                {text: "Nama", align: "start", value: "nama_peserta_pemesan"},
                {text: "Total Pembayaran", align: "start", value: "total_pembayaran"},
                {text: "Status", align: "start", value: "status"},
                {text: "Aksi", align: "start", value: "aksi"},
            ],
            payment: [],
            payments: [],
            status: {
                unggah: 'Bukti transfer belum diunggah',
                konfirmasi: 'Bukti transfer sudah diunggah',
                berhasil: 'Pendaftaran berhasil',
                gagal: 'Pendaftaran gagal'
            },
            info: {
                unggah: 'Bukti Transfer Pembayaran Belum Diunggah',
                konfirmasi: 'Bukti Transfer Pembayaran Sudah Diunggah',
                berhasil: 'Pendaftaran Berhasil',
                gagal1: 'Pendaftaran Gagal Batas Waktu Pembayaran Berakhir',
                gagal2: 'Pendaftaran Gagal Bukti Pembayaran Tidak Sesuai',
            }
        }
    },
    methods: {
        loadListPaymentByIdCoach() {
            this.isLoad.all = true;
            var url = this.$api + '/coach/get_coach_payment_coaching_clinics/' + this.my.id;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.payments = response.data.data_coach.data_payment_coaching_clinic;
                this.isLoad.all = false;
            })
        },
        handleConfirmPayment(value) {
            this.isLoad.btn = true;
            let data = {
                is_confirmed: value,
            };

            var url = this.$api + '/coach/confirm_payment_coaching_clinic/' + this.payment.id;
            this.$http.put(url, data, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.loadListPaymentByIdCoach();
                this.close();
                this.isLoad.btn = false;
                this.$popup.success(response.data.message);
            }).catch(error => {
                this.$popup.warning(error.response.data.message);
                this.isLoad.btn = false;
            })
        },
        showDialog(item) {
            this.payment = item            
            this.dialog = true
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
        getParticipant(participant) {
            var list = ''
            for (let i = 0; i < participant.length; i++) {
                list = list + participant[i] + ','
            }
            return '(' + list + ')'
        },
        getIdDate(dt) {
            moment.locale("id");
            return moment(dt).format("D MMMM YYYY");
        },
        getIdTime(time) {                    
            return moment(time).format("HH:mm");
        },        
        getImgFromDB(img) {
            return this.$baseUrl + '/images/' + img
        },
        getColorInfo() {
            moment.locale("id")
            let now = moment().format("YYYY-MM-DD HH:mm:ss")
            if (moment(this.payment.countdown).add(1, 'days').format("YYYY-MM-DD HH:mm:ss") > now && this.payment.is_confirmed == null
                && this.payment.nama_pengirim == null) return 'yellow-color'
            else if (this.payment.is_confirmed == null && this.payment.nama_pengirim != null) return 'light-blue-color'
            else if (this.payment.is_confirmed == 1) return 'light-green-color'
            else if (moment(this.payment.countdown).add(1, 'days').format("YYYY-MM-DD HH:mm:ss") < now && this.payment.is_confirmed != 1) return 'light-red-color'
        },
        getTextInfo(namaPengirim) {
            moment.locale("id")
            let now = moment().format("YYYY-MM-DD HH:mm:ss")
            if (moment(this.payment.countdown).add(1, 'days').format("YYYY-MM-DD HH:mm:ss") > now && this.payment.is_confirmed == null
                && this.payment.nama_pengirim == null) return this.info.unggah
            else if (this.payment.is_confirmed == null && this.payment.nama_pengirim != null) return this.info.konfirmasi
            else if (this.payment.is_confirmed == 1) return this.info.berhasil
            else if (moment(this.payment.countdown).add(1, 'days').format("YYYY-MM-DD HH:mm:ss") < now && this.payment.is_confirmed != 1) {
                if (namaPengirim == null) {
                    return this.info.gagal1                    
                }
                return this.info.gagal2
            }
        },
        getStatus(payment) {
            moment.locale("id")
            let now = moment().format("YYYY-MM-DD HH:mm:ss")
            if (moment(payment.countdown).add(1, 'days').format("YYYY-MM-DD HH:mm:ss") > now && payment.is_confirmed == null
                && payment.nama_pengirim == null) {                
                return this.status.unggah
            } else if (payment.is_confirmed == null && payment.nama_pengirim != null) {
                return this.status.konfirmasi
            } else if (payment.is_confirmed == 1) {                
                return this.status.berhasil
            }else if (moment(payment.countdown).add(1, 'days').format("YYYY-MM-DD HH:mm:ss") < now && payment.is_confirmed != 1) {
                return this.status.gagal
            }
        },
        getStatusColor(payment) {
            moment.locale("id")
            let now = moment().format("YYYY-MM-DD HH:mm:ss")           
            if (moment(payment.countdown).add(1, 'days').format("YYYY-MM-DD HH:mm:ss") > now && payment.is_confirmed == null
                && payment.nama_pengirim == null) {                
                return 'status-yellow-color'
            } else if (payment.is_confirmed == null && payment.nama_pengirim != null) {
                return 'status-blue-color'
            } else if (payment.is_confirmed == 1) {                
                return  'status-green-color'
            }else if (moment(payment.countdown).add(1, 'days').format("YYYY-MM-DD HH:mm:ss") < now && payment.is_confirmed != 1) {
                return 'status-red-color'
            }
        },
        close() {
            this.dialog = false
        }
    },
    mounted() {
        this.loadListPaymentByIdCoach();
    }
}
</script>