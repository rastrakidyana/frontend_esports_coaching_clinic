<template>
    <v-main class="no-padding report_payment">
        <div>
            <h2 class="text-center">Laporan Transaksi Pembayaran</h2>
            <br>
            <br>
            <v-row class="ml-3">
                <v-col cols=2 class="no-padding">
                    <h4 class="text-left font-weight-medium">Coach</h4>        
                </v-col>
                <v-col class="no-padding">
                    <h4 class="text-left font-weight-medium">: {{coach.nama_coach}}</h4>        
                </v-col>
            </v-row>
            <v-row class="ml-3">
                <v-col cols=2 class="no-padding">
                    <h4 class="text-left font-weight-medium">Tanggal</h4>        
                </v-col>
                <v-col class="no-padding">
                    <h4 class="text-left font-weight-medium">: {{getIdDate(date[0])}} - {{getIdDate(date[1])}}</h4>
                </v-col>
            </v-row>
            <br>                        
            <v-divider class="mt-2 mb-2"></v-divider>
            <v-simple-table class="">
                <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            No
                        </th>
                        <th class="text-left">
                            Tanggal Transaksi
                        </th>
                        <th class="text-left">
                            No Transaksi
                        </th>
                        <th class="text-left">
                            Nama Pemesan
                        </th>
                        <th class="text-left">
                            Pembayaran Transaksi
                        </th>                                                                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(item, index) in report"
                        :key="item.id"                            
                        >
                        <td class="text-left">{{ index + 1 }}</td>
                        <td class="text-left">{{ getIdDate(item.created_at) }}</td>
                        <td class="text-left">{{ item.id }}</td>
                        <td class="text-left">{{ item.nama_peserta }}</td>
                        <td class="text-left">{{ getCurrency(item.total_pembayaran) }}</td>
                        </tr>
                    </tbody>                    
                </template>
            </v-simple-table>
            <v-divider class="mt-2 mb-2"></v-divider>
            <h6 class="text-center">Dicetak Pada {{now()}}</h6>
        </div>
        
        <table ref="exportable_table" class="d-none">
                <thead>
                    <tr>
                    <th class="text-left">
                        No
                    </th>
                    <th class="text-left">
                        Tanggal Transaksi
                    </th>
                    <th class="text-left">
                        No Transaksi
                    </th>
                    <th class="text-left">
                        Nama Pemesan
                    </th>
                    <th class="text-left">
                        Pembayaran Transaksi
                    </th>                                                                        
                    </tr>
                </thead>
                <template
                    v-for="(item, index) in report"
                    >
                   
                        <tr :key="item.id">
                        <td class="text-left">{{ index + 1 }}</td>
                        <td class="text-left">{{ getIdDate(item.created_at) }}</td>
                        <td class="text-left">{{ item.id }}</td>
                        <td class="text-left">{{ item.nama_peserta }}</td>
                        <td class="text-left">{{ getCurrency(item.total_pembayaran) }}</td>
                        </tr>                                       
                </template>
            </table>
    </v-main>
</template>

<script>
import moment from "moment";
export default {
    name: "report_payment",
    props: ['report', 'coach', 'date'],
    data() {
        return {
            
                  
        };
    },
    methods: {
        getIdDate(dt) {
            moment.locale("id");
            return moment(dt).format("D MMMM YYYY");
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
        now() {
            return moment().format("D MMMM YYYY");
        }
    },
    mounted() {
        
    },
    computed: {
      
    },
    
}
</script>