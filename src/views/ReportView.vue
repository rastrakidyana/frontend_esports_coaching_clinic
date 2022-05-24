<template>
    <v-main class="report">
        <h2 class = "white-color mb-5">Laporan</h2>
        <div v-if="my != null" class="table-content">
            <v-row class="px-3 mb-5">
                <v-card height=140 width=90%>
                    <v-card-title>
                        <h5>Transaksi Pembayaran</h5>
                    </v-card-title>
                    <v-card-subtitle class="mt-1">
                        <v-row class="px-3">
                            <v-col cols=5 class="no-padding">
                                <v-menu
                                    v-model="menu.payment"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        dense
                                        outlined
                                        v-model="dateRangePayment"
                                        label="Tanggal Mulai dan Berakhir"                            
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        range
                                        no-title
                                        scrollable
                                        v-model="date.payment"                            
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols=7 class="no-padding text-center">
                                <v-btn @click="generateReport(1, 'xlsx')" medium depressed class="mt-0 excel-button mr-6">
                                    <h6 class="mr-2">Export To Excel</h6>
                                    <v-icon color="black-color">mdi-file-excel</v-icon> 
                                </v-btn>
                                <v-btn @click="generateReport(1, 'pdf')" medium depressed class="mt-0 pdf-button">
                                    <h6 class="mr-2">Export To PDF</h6>
                                    <v-icon color="black-color">mdi-file-pdf</v-icon> 
                                </v-btn>
                            </v-col>                           
                        </v-row>
                    </v-card-subtitle>
                </v-card>
            </v-row>
            <v-row class="px-3 mb-5">
                <v-card height=140 width=90%>
                    <v-card-title>
                        <h5>Keuntungan Per Tahun</h5>
                    </v-card-title>
                    <v-card-subtitle class="mt-1">
                        <v-row class="px-3">
                            <v-col cols=5 class="no-padding">
                                <v-text-field
                                    dense
                                    v-model="date.income"
                                    label="Pilih Tahun"
                                    readonly
                                    outlined                                       
                                    append-icon="mdi-plus"
                                    prepend-inner-icon="mdi-minus"
                                    @click:append="date.income = increment(date.income)"
                                    @click:prepend-inner="date.income = decrement(date.income)"
                                ></v-text-field>
                            </v-col>
                            <v-col cols=7 class="no-padding text-center">
                                <v-btn @click="generateReport(2, 'xlsx')" medium depressed class="mt-0 excel-button mr-6">
                                    <h6 class="mr-2">Export To Excel</h6>
                                    <v-icon color="black-color">mdi-file-excel</v-icon> 
                                </v-btn>
                                <v-btn @click="generateReport(2, 'pdf')" medium depressed class="mt-0 pdf-button">
                                    <h6 class="mr-2">Export To PDF</h6>
                                    <v-icon color="black-color">mdi-file-pdf</v-icon> 
                                </v-btn>
                            </v-col>                           
                        </v-row>
                    </v-card-subtitle>
                </v-card>
            </v-row>
            <v-row class="px-3 mb-5">
                <v-card height=140 width=90%>
                    <v-card-title>
                        <h5>Aktivitas Coaching Clinic</h5>
                    </v-card-title>
                    <v-card-subtitle class="mt-1">
                        <v-row class="px-3">
                            <v-col cols=5 class="no-padding">
                                <v-menu
                                    v-model="menu.activity"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        dense
                                        outlined
                                        v-model="dateRangeActivity"
                                        label="Tanggal Mulai dan Berakhir"                            
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        range
                                        no-title
                                        scrollable
                                        v-model="date.activity"                            
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols=7 class="no-padding text-center">
                                <v-btn @click="generateReport(3, 'xlsx')" medium depressed class="mt-0 excel-button mr-6">
                                    <h6 class="mr-2">Export To Excel</h6>
                                    <v-icon color="black-color">mdi-file-excel</v-icon> 
                                </v-btn>
                                <v-btn @click="generateReport(3, 'pdf')" medium depressed class="mt-0 pdf-button">
                                    <h6 class="mr-2">Export To PDF</h6>
                                    <v-icon color="black-color">mdi-file-pdf</v-icon> 
                                </v-btn>
                            </v-col>                           
                        </v-row>
                    </v-card-subtitle>
                </v-card>
            </v-row>            
        </div>

        <div v-if="admin != null" class="table-content">
            <v-row class="px-3 mb-5">
                <v-card height=140 width=90%>
                    <v-card-title>
                        <h5>Pendaftaran Coach</h5>
                    </v-card-title>
                    <v-card-subtitle class="mt-1">
                        <v-row class="px-3">
                            <v-col cols=5 class="no-padding">
                                <v-menu
                                    v-model="menu.coach"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        dense
                                        outlined
                                        v-model="dateRangeCoach"
                                        label="Tanggal Mulai dan Berakhir"                            
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        range
                                        no-title
                                        scrollable
                                        v-model="date.coach"                            
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols=7 class="no-padding text-center">
                                <v-btn @click="generateReport(4, 'xlsx')" medium depressed class="mt-0 excel-button mr-6">
                                    <h6 class="mr-2">Export To Excel</h6>
                                    <v-icon color="black-color">mdi-file-excel</v-icon> 
                                </v-btn>
                                <v-btn @click="generateReport(4, 'pdf')" medium depressed class="mt-0 pdf-button">
                                    <h6 class="mr-2">Export To PDF</h6>
                                    <v-icon color="black-color">mdi-file-pdf</v-icon> 
                                </v-btn>
                            </v-col>                           
                        </v-row>
                    </v-card-subtitle>
                </v-card>
            </v-row>
            <v-row class="px-3 mb-5">
                <v-card height=140 width=90%>
                    <v-card-title>
                        <h5>Pendaftaran Peserta</h5>
                    </v-card-title>
                    <v-card-subtitle class="mt-1">
                        <v-row class="px-3">
                            <v-col cols=5 class="no-padding">
                                <v-menu
                                    v-model="menu.participant"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        dense
                                        outlined
                                        v-model="dateRangeParticipant"
                                        label="Tanggal Mulai dan Berakhir"                            
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        range
                                        no-title
                                        scrollable
                                        v-model="date.participant"                            
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols=7 class="no-padding text-center">
                                <v-btn @click="generateReport(5, 'xlsx')" medium depressed class="mt-0 excel-button mr-6">
                                    <h6 class="mr-2">Export To Excel</h6>
                                    <v-icon color="black-color">mdi-file-excel</v-icon> 
                                </v-btn>
                                <v-btn @click="generateReport(5, 'pdf')" medium depressed class="mt-0 pdf-button">
                                    <h6 class="mr-2">Export To PDF</h6>
                                    <v-icon color="black-color">mdi-file-pdf</v-icon> 
                                </v-btn>
                            </v-col>                           
                        </v-row>
                    </v-card-subtitle>
                </v-card>
            </v-row>
            <v-row class="px-3 mb-5">
                <v-card height=140 width=90%>
                    <v-card-title>
                        <h5>Aktivitas Coaching Clinic</h5>
                    </v-card-title>
                    <v-card-subtitle class="mt-1">
                        <v-row class="px-3">
                            <v-col cols=5 class="no-padding">
                                <v-menu
                                    v-model="menu.activity"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        dense
                                        outlined
                                        v-model="dateRangeActivity"
                                        label="Tanggal Mulai dan Berakhir"                            
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        range
                                        no-title
                                        scrollable
                                        v-model="date.activity"                            
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols=7 class="no-padding text-center">
                                <v-btn @click="generateReport(3, 'xlsx')" medium depressed class="mt-0 excel-button mr-6">
                                    <h6 class="mr-2">Export To Excel</h6>
                                    <v-icon color="black-color">mdi-file-excel</v-icon> 
                                </v-btn>
                                <v-btn @click="generateReport(3, 'pdf')" medium depressed class="mt-0 pdf-button">
                                    <h6 class="mr-2">Export To PDF</h6>
                                    <v-icon color="black-color">mdi-file-pdf</v-icon> 
                                </v-btn>
                            </v-col>                           
                        </v-row>
                    </v-card-subtitle>
                </v-card>
            </v-row>            
        </div>
        
        <div>
            <vue-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="false"
                :preview-modal="true"
                :paginate-elements-by-height="1600"                                
                :manual-pagination="false"                                
                pdf-content-width="100%"
                :html-to-pdf-options="options"
                ref="html2Pdf"
            >
                <section slot="pdf-content">
                    <v-app style="background-color:white !important;">
                        <report-payment
                        ref="xlsxpayment"
                        v-if="choice == 1"
                        :report="report"
                        :coach="my"
                        :date="date.payment"
                        >
                        </report-payment>
                        <report-income
                        ref="xlsxincome"
                        v-if="choice == 2"
                        :report="report"
                        :coach="my"
                        :year="date.income"
                        :income="total"
                        >
                        </report-income>
                        <report-activity
                        ref="xlsxactivity"
                        v-if="choice == 3"
                        :report="report"
                        :coach="my"
                        :date="date.activity"
                        >
                        </report-activity>
                        <report-coach
                        ref="xlsxcoach"
                        v-if="choice == 4"
                        :report="report"
                        :date="date.coach"
                        >
                        </report-coach>
                        <report-participant
                        ref="xlsxparticipant"
                        v-if="choice == 5"
                        :report="report"
                        :date="date.participant"
                        >
                        </report-participant>
                    </v-app>
                </section>
            </vue-html2pdf>
        </div>

        
        
    </v-main>
</template>

<script src="https://unpkg.com/xlsx@0.15.1/dist/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import ReportPayment from '@/components/ReportPayment.vue'
import ReportIncome from '@/components/ReportIncome.vue'
import ReportActivity from '@/components/ReportActivity.vue'
import ReportCoach from '@/components/ReportCoach.vue'
import ReportParticipant from '@/components/ReportParticipant.vue'
import * as XLSX from 'xlsx';
export default {
    name: "report",
    data() {
        return {
            my: JSON.parse(localStorage.getItem('coach')),
            admin: JSON.parse(localStorage.getItem('admin')),
            menu: {
                payment: false,
                income: false,
                activity: false,
                coach: false,
                participant: false,
            },
            date: {
                payment: [(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),],
                income: 2022,
                activity: [(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),],
                coach: [(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),],
                participant: [(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),],
            },
            report: [],
            total: [],
            choice: 0,            
            options: {
                margin: 0.5,
                filename: "",
                image: { type: "jpeg", quality: 2 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
            },
        };
    },
    methods: {
        async loadReportTransactionsBasedOnDate(dtF, dtL) {            
            var url = this.$api + '/coach/get_report_transaction_dt/' + dtF + '_' + dtL + '/' + this.my.id;
            await this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.report = response.data.data_report
                this.options.filename = 'Laporan TransaksiPembayaran_' + this.date.payment[0] + '-' + this.date.payment[1] + '_' +  this.my.nama_coach
            })
        },
        async loadReportIncomeInYear(year) {
            var url = this.$api + '/coach/get_report_income_yr/' + year + '/' + this.my.id;
            await this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.report = response.data.data_all
                this.total = response.data.data_total                
                this.options.filename = 'Laporan KeuntunganPerTahun_' + this.date.income + '_' +  this.my.nama_coach
            })
        },
        async loadReportActivityCoachingClinic(dtF, dtL) {
            if (JSON.parse(localStorage.getItem('coach'))) {
                var url = this.$api + '/coach/get_report_activity_coaching_clinic_dt/' + dtF + '_' + dtL + '/' + this.my.id;
            } else {
                var url = this.$api + '/coach/get_report_activity_coaching_clinic_dt/' + dtF + '_' + dtL + '/all'
            }            
            await this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.report = response.data.data
                if (JSON.parse(localStorage.getItem('coach'))) {
                    this.options.filename = 'Laporan AktivitasCoachingClinic_' + this.date.activity[0] + '-' + this.date.activity[1] + '_' +  this.my.nama_coach
                } else {
                    this.options.filename = 'Laporan AktivitasCoachingClinic_' + this.date.activity[0] + '-' + this.date.activity[1]
                }                
            })
        },
        async loadReportListCoachBasedOnRegisterDate(dtF, dtL) {
            var url = this.$api + '/admin/get_report_coachs_register_dt/' + dtF + '_' + dtL;
            await this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.report = response.data.data_coachs
                this.options.filename = 'Laporan DaftarCoach_' + this.date.activity[0] + '-' + this.date.activity[1]
            })
        },
        async loadReportListParticipantBasedOnRegisterDate(dtF, dtL) {
            var url = this.$api + '/admin/get_report_participants_register_dt/' + dtF + '_' + dtL;
            await this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.report = response.data.data_participants
                this.options.filename = 'Laporan DaftarPeserta_' + this.date.activity[0] + '-' + this.date.activity[1]
            })
        },  
        increment(x) {
                return x = x + 1;
            },
        decrement(x) {
            x = x - 1;
            if (x >= 2022) {
                return x
            } else
                return 2022
        },
        async generateReport(value, tipe) {
            this.choice = value            
            if (this.choice == 1) {
                await this.loadReportTransactionsBasedOnDate(this.date.payment[0], this.date.payment[1])
            } else if (this.choice == 2) {
                await this.loadReportIncomeInYear(this.date.income)
            } else if (this.choice == 3) {
                await this.loadReportActivityCoachingClinic(this.date.activity[0], this.date.activity[1])
            } else if (this.choice == 4) {
                await this.loadReportListCoachBasedOnRegisterDate(this.date.coach[0], this.date.coach[1])
            } else if (this.choice == 5) {
                await this.loadReportListParticipantBasedOnRegisterDate(this.date.participant[0], this.date.participant[1])
            }
            if (this.report.length != 0) {
                if (tipe == 'pdf') {
                    await this.$refs.html2Pdf.generatePdf()                    
                } else {                    
                    this.exportExcel('xlsx')
                }
                this.$popup.success('Laporan berhasil diunduh')
            } else {
                this.$popup.warning('Tidak terdapat data dalam laporan pada waktu tersebut')
            }            
            this.choice = 0
            this.format = null
        },    
        exportExcel(type, fn, dl) {            
            if (this.choice == 1) {
                if (this.$refs.xlsxpayment.$refs.exportable_table != undefined) {
                    var elt = this.$refs.xlsxpayment.$refs.exportable_table                    
                }
            } else if (this.choice == 2) {                
                if (this.$refs.xlsxincome.$refs.exportable_table != undefined) {
                    var elt = this.$refs.xlsxincome.$refs.exportable_table                    
                }                
            } else if (this.choice == 3) {
                if (this.$refs.xlsxactivity.$refs.exportable_table != undefined) {
                    var elt = this.$refs.xlsxactivity.$refs.exportable_table                    
                }
            } else if (this.choice == 4) {
                if (this.$refs.xlsxcoach.$refs.exportable_table != undefined) {
                    var elt = this.$refs.xlsxcoach.$refs.exportable_table
                }
            } else if (this.choice == 5) {
                if (this.$refs.xlsxparticipant.$refs.exportable_table != undefined) {
                    var elt = this.$refs.xlsxparticipant.$refs.exportable_table
                }
            }

            var wb = XLSX.utils.table_to_book(elt, {sheet:"Laporan"})                    

            return dl ?
            XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
            XLSX.writeFile(wb, fn || (this.options.filename + '.' + (type || 'xlsx')));
            
        },
    },
    mounted() {
        
    },
    computed: {
      dateRangePayment () {
        return this.date.payment.join(' ~ ')
      },
      dateRangeActivity () {
        return this.date.activity.join(' ~ ')
      },
      dateRangeCoach () {
        return this.date.coach.join(' ~ ')
      },
      dateRangeParticipant () {
        return this.date.participant.join(' ~ ')
      },
    },
    components: {
        'report-payment': ReportPayment,
        'report-income': ReportIncome,
        'report-activity': ReportActivity,
        'report-coach': ReportCoach,
        'report-participant': ReportParticipant,
        VueHtml2pdf
    },
    
}
</script>