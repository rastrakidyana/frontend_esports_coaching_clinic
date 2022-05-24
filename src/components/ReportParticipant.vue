<template>
    <v-main class="no-padding report_participant">
        <div>
            <h2 class="text-center">Laporan Daftar Peserta</h2>
            <br>
            <br>     
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
                            Tanggal Terdaftar
                        </th>
                        <th class="text-left">
                            Nama
                        </th>
                        <th class="text-left">
                            Email
                        </th>
                        <th class="text-left">
                            Telp
                        </th>
                        <th class="text-left">
                            Jumlah Transaksi
                        </th>
                        <th class="text-left">
                            Jumlah Terdaftar Coaching Clinic
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="item in report"
                        :key="item.no"
                        >
                        <td class="text-left">{{ item.no }}</td>
                        <td class="text-left">{{ getIdDate(item.terdaftar) }}</td>
                        <td class="text-left">{{ item.nama }}</td>
                        <td class="text-left">{{ item.email }}</td>
                        <td class="text-left">{{ item.telp }}</td>
                        <td class="text-left">{{ item.jml_transaksi }}</td>                        
                        <td class="text-left">{{ item.jml_kelas }}</td>
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
                        Tanggal Terdaftar
                    </th>
                    <th class="text-left">
                        Nama
                    </th>
                    <th class="text-left">
                        Email
                    </th>
                    <th class="text-left">
                        Telp
                    </th>
                    <th class="text-left">
                        Jumlah Transaksi
                    </th>
                    <th class="text-left">
                        Jumlah Terdaftar Coaching Clinic
                    </th>
                    </tr>
                </thead>
                <template
                    v-for="item in report"
                    >
                   
                        <tr :key="item.no">
                        <td class="text-left">{{ item.no }}</td>
                        <td class="text-left">{{ getIdDate(item.terdaftar) }}</td>
                        <td class="text-left">{{ item.nama }}</td>
                        <td class="text-left">{{ item.email }}</td>
                        <td class="text-left">{{ item.telp }}</td>
                        <td class="text-left">{{ item.jml_transaksi }}</td>                        
                        <td class="text-left">{{ item.jml_kelas }}</td>
                        </tr>                                       
                </template>
            </table>
    </v-main>
</template>

<script>
import moment from "moment";
export default {
    name: "report_participant",
    props: ['report', 'date'],
    data() {
        return {
            
                  
        };
    },
    methods: {
        getIdDate(dt) {
            moment.locale("id");
            return moment(dt).format("D MMMM YYYY");
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