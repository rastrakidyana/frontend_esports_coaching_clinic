<template>
    <v-main class="no-padding report_income">
        <div>
            <h2 class="text-center">Laporan Keuntungan Per Tahun</h2>
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
                    <h4 class="text-left font-weight-medium">Tahun</h4>        
                </v-col>
                <v-col class="no-padding">
                    <h4 class="text-left font-weight-medium">: {{year}}</h4>
                </v-col>
            </v-row>
            <v-row class="ml-3">
                <v-col cols=2 class="no-padding">
                    <h4 class="text-left font-weight-medium">Total Keuntungan</h4>
                </v-col>
                <v-col class="no-padding">
                    <h4 class="text-left font-weight-medium">: {{getCurrency(income)}}</h4>
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
                            Bulan
                        </th>
                        <th class="text-left">
                            Keuntungan
                        </th>
                        <th class="text-left">
                            Jumlah Transaksi
                        </th>                                                                                               
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(item, index) in report"
                        :key="item.no"
                        >
                        <td class="text-left">{{ index + 1 }}</td>
                        <td class="text-left">{{ item.bulan }}</td>
                        <td class="text-left">{{ getCurrency(item.keuntungan) }}</td>
                        <td class="text-left">{{ item.jumlah_transaksi }}</td>                        
                        </tr>
                    </tbody>                    
                </template>
            </v-simple-table>            
            <h6 class="text-center mt-2">Dicetak Pada {{now()}}</h6>
        </div>

        <table ref="exportable_table" class="d-none">
            <thead>
                <tr>
                    <th class="text-left">
                        No
                    </th>
                    <th class="text-left">
                        Bulan
                    </th>
                    <th class="text-left">
                        Keuntungan
                    </th>
                    <th class="text-left">
                        Jumlah Transaksi
                    </th>
                    </tr>
            </thead>
            <template
                v-for="(item, index) in report"
                >
                    <tr :key="item.no">
                        <td class="text-left">{{ index + 1 }}</td>
                        <td class="text-left">{{ item.bulan }}</td>
                        <td class="text-left">{{ getCurrency(item.keuntungan) }}</td>
                        <td class="text-left">{{ item.jumlah_transaksi }}</td>
                    </tr>
            </template>
        </table>
    </v-main>
</template>

<script>
import moment from "moment";
export default {
    name: "report_payment",
    props: ['report', 'coach', 'income', 'year'],
    data() {
        return {
            
                  
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
        now() {
            moment.locale("id");
            return moment().format("D MMMM YYYY");
        }
    },
    mounted() {
        
    },
    computed: {
      
    },
    
}
</script>