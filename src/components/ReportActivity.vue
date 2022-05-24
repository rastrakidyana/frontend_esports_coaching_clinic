<template>
    <v-main class="no-padding report_activity_coach">
        <div>
            <h2 class="text-center">Laporan Aktivitas Coaching Clinic</h2>
            <br>
            <br>
            <v-row v-if="!checkUser()" class="ml-3">
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
                        <th v-if="checkUser()" class="text-left">
                            Coach
                        </th>
                        <th class="text-left">
                            Tanggal Pelaksanaan
                        </th>
                        <th class="text-left">
                            Waktu
                        </th>
                        <th class="text-left">
                            Judul
                        </th>
                        <th class="text-left">
                            Game
                        </th>
                        <th class="text-left">
                            Jumlah Peserta
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(item, index) in report"
                        :key="item.no"
                        >
                        <td class="text-left">{{ index + 1 }}</td>
                        <td v-if="checkUser()" class="text-left">{{ item.coach }}</td>
                        <td class="text-left">{{ getIdDate(item.tanggal) }}</td>
                        <td v-if="item.berakhir != null" class="text-left">{{ getIdTime(item.mulai) }} - {{ getIdTime(item.berakhir) }} WIB</td>
                        <td v-else class="text-left">{{ getIdTime(item.mulai) }} WIB</td>
                        <td class="text-left">{{ item.judul_coaching_clinic }}</td>
                        <td class="text-left">{{ item.game_coaching_clinic }}</td>
                        <td class="text-left">{{ item.jml_pendaftar }}</td>                        
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
                    <th v-if="checkUser()" class="text-left">
                        Coach
                    </th>
                    <th class="text-left">
                        Tanggal Pelaksanaan
                    </th>
                    <th class="text-left">
                        Waktu
                    </th>
                    <th class="text-left">
                        Judul
                    </th>
                    <th class="text-left">
                        Game
                    </th>
                    <th class="text-left">
                        Jumlah Peserta
                    </th>
                    </tr>
            </thead>
            <template
                v-for="(item, index) in report"
                >
                    <tr :key="item.no">
                        <td class="text-left">{{ index + 1 }}</td>
                        <td v-if="checkUser()" class="text-left">{{ item.coach }}</td>
                        <td class="text-left">{{ getIdDate(item.tanggal) }}</td>
                        <td v-if="item.berakhir != null" class="text-left">{{ getIdTime(item.mulai) }} - {{ getIdTime(item.berakhir) }} WIB</td>
                        <td v-else class="text-left">{{ getIdTime(item.mulai) }} WIB</td>
                        <td class="text-left">{{ item.judul_coaching_clinic }}</td>
                        <td class="text-left">{{ item.game_coaching_clinic }}</td>
                        <td class="text-left">{{ item.jml_pendaftar }}</td>
                    </tr>
            </template>
        </table>
    </v-main>
</template>

<script>
import moment from "moment";
export default {
    name: "report_activity_coach",
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
        getIdTime(time) {                    
            return moment(moment(time,'HH:mm:ss')).format("HH:mm");
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
        checkUser() {
            if (JSON.parse(localStorage.getItem('admin'))) {
                return true
            } else if (JSON.parse(localStorage.getItem('coach'))) {
                return false
            }
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