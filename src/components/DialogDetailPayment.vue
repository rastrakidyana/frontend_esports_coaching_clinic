<template>
    <v-main class="dialog_detail_payment">
        <v-dialog v-model="dialog" persistent width="1100">
            <v-card class="card-custom">
                <v-card-title>
                    <span class="headline font-weight-bold">Detail Transaksi Pendaftaran Pembayaran</span>
                    <v-spacer></v-spacer>
                    <v-btn class="btn-close" text @click="close">
                        <v-icon large>mdi-close-circle</v-icon>
                    </v-btn>
                </v-card-title>
                <v-row class="mb-3">
                    <v-col cols=3 class="ml-7">
                        <v-row class="detail-list-payment-dialog">
                            <v-card-title>
                                <h5 class="font-weight-bold">Informasi Pembayaran</h5>
                            </v-card-title>
                        </v-row>
                        <v-row class="detail-list-payment-dialog-2">
                            <v-card-title>                                
                                <h6 v-if="payment.data_coach != null" class="font-weight-medium">A/N <span class="font-weight-bold">{{payment.data_coach.an_no_rek}}</span></h6>
                            </v-card-title>
                        </v-row>
                        <v-row :class="selectedMenu != 1 ? 'detail-list-payment-dialog-4' : 'detail-list-payment-dialog'">
                            <v-card-title>
                                <h6 v-if="payment.data_coach != null" class="font-weight-bold">
                                    {{payment.data_coach.nama_bank}} <span class="ml-1">{{payment.data_coach.id_bank_account}}</span>
                                    <span class="ml-4 pointer">
                                        <copy-to-clipboard :text="toString(payment.data_coach.id_bank_account)" @copy="handleCopy">
                                            <v-icon small>mdi-content-copy</v-icon>
                                        </copy-to-clipboard>                                        
                                    </span>
                                </h6>
                            </v-card-title>
                        </v-row>
                        
                        <v-row class="detail-list-payment-dialog-2">
                            <v-card-title>
                                <h6 v-if="payment.nama_pengirim == null && selectedMenu == 1" class="light-blue-color">Batas Waktu Pembayaran :</h6>
                            </v-card-title>
                            <v-card-title class="info-payment mb-4 text-justify">
                                <span style="font-size: 10px;" v-if="payment.nama_pengirim == null && selectedMenu == 4" class="light-orange-color">Batas waktu pembayaran telah berakhir. Coba lagi 
                                    melakukan pendaftaran dengan pembayaran sesuai waktunya.
                                </span>
                                <span style="font-size: 10px;" v-if="payment.nama_pengirim != null && selectedMenu == 4" class="light-orange-color">Bukti pembayaran tidak sesuai. Coba lagi 
                                    melakukan pendaftaran dengan pembayaran yang benar.
                                </span>
                            </v-card-title>
                        </v-row>
                        <v-row class="detail-list-payment-dialog" v-if="payment.nama_pengirim == null && selectedMenu == 1">
                            <v-card-title>
                                <h6 class="light-blue-color">{{countdown.hours + ':' + countdown.minutes + ':' + countdown.seconds}}</h6>
                            </v-card-title>
                        </v-row>
                        
                    </v-col>
                    <v-col cols=5>
                        <v-row class="detail-list-payment-dialog">
                            <v-card-title>
                                <h5 class="font-weight-bold">Informasi Pengirim</h5>
                            </v-card-title>
                        </v-row>
                        <v-row class="detail-list-payment-dialog-2">
                            <v-card-title style="width:100%">                                                                
                                <v-col cols=5 class="no-padding"><h6>Nama Pengirim</h6></v-col>
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
                                <v-col cols=5 class="no-padding"><h6>Nama Bank</h6></v-col>
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
                                <v-col cols=5 class="no-padding"><h6>No. Rek.</h6></v-col>
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
                                <v-col cols=5 class="no-padding"><h6>Nominal Pembayaran</h6></v-col>
                                <v-col class="no-padding">
                                    <h6 class="font-weight-medium">: 
                                        <span v-if="payment.nominal_pembayaran == null">-</span>
                                        <span v-else>{{getCurrency(payment.nominal_pembayaran)}}</span>
                                    </h6>
                                </v-col>
                            </v-card-title>
                        </v-row>
                    </v-col>
                    <v-col cols=3 style="margin-left: -30px !important;">
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
                </v-row>
                <v-row class="padding-row-info-payment mt-5 mb-3">
                    <v-card-title class="no-padding" :class="getColorInfo(selectedMenu)">
                        <h6 class="font-weight-bold">{{ getTextInfo(selectedMenu) }}</h6>
                    </v-card-title>
                </v-row>
                <v-row class="mb-10 padding-row-info-payment-card">
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
                                        {{my.nama_peserta}}
                                    </h6>
                                </v-col>
                            </v-card-title>
                        </v-row>
                        <v-row class="pl-3">
                            <v-card-title style="width:100%" class="detail-list-payment-dialog">                                                                
                                <v-col cols=1 class="no-padding"><h6>Email</h6></v-col>
                                <v-col class="no-padding">
                                    <h6 class="font-weight-medium">: 
                                        {{my.email_peserta}}
                                    </h6>
                                </v-col>
                            </v-card-title>
                        </v-row>
                        <v-row class="pl-3">
                            <v-card-title style="width:100%" class="detail-list">                                                                
                                <v-col cols=1 class="no-padding"><h6>No. Telp.</h6></v-col>
                                <v-col class="no-padding">
                                    <h6 class="font-weight-medium">: 
                                        {{my.telp_peserta}}
                                    </h6>
                                </v-col>
                            </v-card-title>
                        </v-row>
                        <v-row class="pl-3">
                            <v-card-title class="detail-list-payment-dialog-3">
                                <h5 style="font-size: 15px">Rincian Pendaftaran Coaching Clinic</h5>
                            </v-card-title>
                        </v-row>
                        <v-row class="pl-3">
                            <v-card-title class="detail-list-payment-dialog">
                                <h5 v-if="payment.data_coach != null" style="font-size: 14px">Coach {{payment.data_coach.nama_coach}}</h5>
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
            </v-card>            
        </v-dialog>
    </v-main>
</template>

<script>
import moment from "moment";
import CopyToClipboard from 'vue-copy-to-clipboard'
export default {
    name: "dialog_detail_payment",
    props: ['payment', 'countdown', 'selectedMenu' ,'dialog'],
    data() {
        return {
            my: JSON.parse(localStorage.getItem('participant')),
            info: {
                unggah: 'Belum Mengunggah Bukti Pembayaran',
                konfirmasi: 'Menunggu Konfirmasi Oleh Coach',                
                berhasil: 'Pendaftaran Coaching Clinic Berhasil',
                gagal: 'Pendaftaran Coaching Clinic Gagal',
            }
        };
    },
    methods: {
        getImgFromDB(img) {
            return this.$baseUrl + '/images/' + img
        },
        getParticipant(participant) {
            var list = ''
            for (let i = 0; i < participant.length; i++) {
                list = list + participant[i] + ','
            }
            return '(' + list + ')'
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
        getColorInfo(value) {
            if (value == 1) return 'padding-info-payment-yellow'
            else if (value == 2) return 'padding-info-payment-blue'
            else if (value == 3) return 'padding-info-payment-green'
            else if (value == 4) return 'padding-info-payment-red'
        },
        getTextInfo(value) {
            if (value == 1) return this.info.unggah
            else if (value == 2) return this.info.konfirmasi
            else if (value == 3) return this.info.berhasil
            else if (value == 4) return this.info.gagal
        },
        getIdDate(dt) {
            moment.locale("id");
            return moment(dt).format("D MMMM YYYY");
        },
        getIdTime(time) {                    
            return moment(time).format("HH:mm");
        },
        toString(value) {
            return value.toString();
        },
        handleCopy () {
            this.$popup.success('Nomor rekening berhasil disalin')
        },
        close() {            
            this.$emit('dialogClosed')
        },
    },
    mounted() {
                
    },
    components: {
        CopyToClipboard
    },
}
</script>