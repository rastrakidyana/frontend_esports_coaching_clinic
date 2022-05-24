<template>
    <v-main class="no-padding card_konfirmasi_pendaftaran">
        <v-card height=700>
            <!-- <span>{{selected}}{{selectedChild}}{{temp}}</span> -->
            <div class="participant-profile-card enable-scroll-y-transaksi tes">                
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
                        :items="registers">
                            <template v-slot:default="props">
                                <div
                                    class="schedule-transaction-register-padding"
                                    v-for="item in props.items"
                                    :key="item.id">
                                        <v-row class="mt-4 mb-7">
                                            <v-card width=100%>
                                                <v-row>
                                                    <v-col md="auto" class="ml-4 no-padding-right">
                                                        <v-checkbox                                                            
                                                            @change="selectAll(item.data_register, item.id), setTotalBiaya(item.data_register)"
                                                            v-model="selected"
                                                            :value="item.id"
                                                        ></v-checkbox>
                                                    </v-col>
                                                    <v-col md="auto" class="no-padding-left">
                                                        <v-card-title>
                                                            <h4 class="black-color">Coach {{ item.nama_coach }}</h4>
                                                        </v-card-title>
                                                    </v-col>
                                                </v-row>
                                                <v-data-iterator
                                                    class="text-center"
                                                    disable-pagination
                                                    hide-default-footer
                                                    :items="item.data_register">
                                                        <template v-slot:default="props">
                                                            <div
                                                                class=""
                                                                v-for="r in props.items"
                                                                :key="r.id">
                                                                    <v-row class="margin-top-row-register">
                                                                        <v-col cols=1>

                                                                        </v-col>
                                                                        <v-col md="auto" class="ml-4 no-padding-right">
                                                                            <v-checkbox
                                                                                @change="checkIfAll(item, r.id), setTotalBiaya(item.data_register)"
                                                                                v-model="selectedChild"
                                                                                :value="r.id"
                                                                            ></v-checkbox>
                                                                        </v-col>
                                                                        <v-col md="auto" class="no-padding-left no-padding-right">
                                                                            <v-card-title>
                                                                                <h5 class="black-color">{{ r.judul_coaching_clinic }}</h5>
                                                                            </v-card-title>
                                                                        </v-col>
                                                                        <v-col md="auto" class="no-padding-left no-padding-right">
                                                                            <v-card-title>
                                                                                <h5 class="blue-border-color"><span class="text-register-kuota">{{ r.jml_beli_kuota }} Kuota</span></h5>
                                                                            </v-card-title>
                                                                        </v-col>
                                                                        <v-col md="auto" class="no-padding-left no-padding-right">
                                                                            <v-card-title>
                                                                                <h5 v-if="r.berakhir_coaching_clinic != null" class="blue-border-color"><span class="text-register-kuota">{{ getIdDate(r.tgl_coaching_clinic) }} {{ getIdTime(r.mulai_coaching_clinic) }}-{{ getIdTime(r.berakhir_coaching_clinic) }} WIB</span></h5>
                                                                                <h5 v-else class="blue-border-color"><span class="text-register-kuota">{{ getIdDate(r.tgl_coaching_clinic) }} {{ getIdTime(r.mulai_coaching_clinic) }} WIB</span></h5>
                                                                            </v-card-title>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <v-row class="margin-top-row-register">
                                                                        <v-col cols=2>
                                                                        </v-col>
                                                                        <v-col cols=5 class="no-padding-left no-padding-right">
                                                                            <v-card-title>
                                                                                <h6 class="black-color">Peserta : <span class="font-weight-medium">{{ getParticipant(r.data_participant) }}</span></h6>
                                                                            </v-card-title>
                                                                        </v-col>
                                                                        <v-col cols=5 class="no-padding-left">
                                                                            <v-card-title>
                                                                                <v-spacer></v-spacer>
                                                                                <h6 class="grey-color font-weight-medium">Biaya</h6>
                                                                            </v-card-title>
                                                                        </v-col>
                                                                    </v-row>
                                                                    <v-row class="margin-top-row-register">
                                                                        <v-col cols=2>
                                                                        </v-col>
                                                                        <v-col cols=5 class="no-padding-left no-padding-right">                                                                            
                                                                                <v-card-title>
                                                                                    <v-btn x-small text >
                                                                                        <v-icon color="black-color" @click="toUpdateRegisterCoachingClinic(r.id, r.id_coaching_clinic)">mdi-pencil</v-icon> 
                                                                                    </v-btn>
                                                                                    <v-btn x-small text >
                                                                                        <v-icon color="black-color" @click="toDeleteRegisterCoachingClinic(r.id)">mdi-delete</v-icon> 
                                                                                    </v-btn>
                                                                                </v-card-title>
                                                                        </v-col>
                                                                        <v-col cols=5 class="no-padding-left">
                                                                            <v-card-title>
                                                                                <v-spacer></v-spacer>
                                                                                <h5 class="yellow-color">{{ getCurrency(r.harga_pendaftaran) }}</h5>
                                                                            </v-card-title>
                                                                        </v-col>
                                                                    </v-row>
                                                            </div>
                                                        </template>
                                                </v-data-iterator>
                                            </v-card>
                                        </v-row>
                                </div>
                            </template>
                    </v-data-iterator>
                </div>
            </div>
            <v-footer
                absolute
                padless
            >
                <v-card
                width=100%
                height=110
                flat                
                class="yellow-background-color participant-profile-card"
                >
                    <v-row>
                        <v-col>
                            <v-card-title class="left-registrasi">
                                <v-btn @click="toAddPayment" large class="login-button">
                                    <h5 class="participant-profile-card">Konfirmasi Pendaftaran</h5>
                                </v-btn>
                            </v-card-title>
                        </v-col>
                        <v-col>
                            <v-row class="right-registrasi height-registrasi">
                                <v-card-title class="right-registrasi">                                     
                                    <h6 class="grey-color font-weight-medium">Total Biaya</h6>
                                </v-card-title>
                            </v-row>                    
                            <v-row class="right-registrasi height-registrasi">
                                <v-card-title class="right-registrasi">                                     
                                    <h5 class="white-color">{{ getCurrency(total) }}</h5>
                                </v-card-title>
                            </v-row>                    
                        </v-col>                        
                    </v-row>                    
                </v-card>
            </v-footer>
        </v-card>
    </v-main>
</template>

<script>
import moment from "moment";
export default {
    name: "card_konfirmasi_pendaftaran",
    props: ['registers'],
    data() {
        return {
            my: JSON.parse(localStorage.getItem('participant')),
            search: null,
            selected: null,
            temp: null,            
            selectedChild: [],
            total: 0,           
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
            return moment(moment(time,'HH:mm:ss')).format("HH:mm");
        },
        getParticipant(participant) {
            var list = ''
            for (let i = 0; i < participant.length; i++) {
                list = list + participant[i] + ', '
            }
            return list
        },        
        selectAll(registers, id) {            
            if (this.selected != null) {
                var value = [];                
                for (let i = 0; i < registers.length; i++) {
                    value[i] = registers[i].id                   
                }
                this.temp = id                
                return this.selectedChild = value
            } else {
                this.temp = null                
                return this.selectedChild = []
            }            
        },
        checkIfAll(item, register) {
            if (this.temp == null || this.temp == item.id) {
                if (item.data_register.length == this.selectedChild.length) {                    
                    this.temp = item.id
                    return this.selected = item.id
                } else
                    if (this.selectedChild.length != 0) {
                        this.temp = item.id                    
                    }else {
                        this.temp = null
                    }
                    return this.selected = null
            } else {                
                this.selectedChild = []
                this.selectedChild[0] = register
                if (item.data_register.length == this.selectedChild.length) {
                    this.selected = item.id
                } else {
                    this.selected = null
                }
                this.temp = item.id                
            }
        },
        setTotalBiaya(registers) {
            var price = 0
            if (this.selectedChild.length != 0) {
                for (let i = 0; i < this.selectedChild.length; i++) {
                    for (let j = 0; j < registers.length; j++) {
                        if (this.selectedChild[i] == registers[j].id) {
                            price = price + registers[j].harga_pendaftaran                            
                        }                        
                    }                    
                }
                return this.total = price
            } else {
                this.total = 0
            }
        },
        toAddPayment() {            
            if (this.selectedChild.length != 0) {
                let data = {
                    id_coach: this.temp,
                    id_peserta: this.my.id,
                    id_pendaftaran_coaching_clinic: this.selectedChild,
                };   
                this.$emit('addPayment', data)                
            } else {
                this.$popup.warning('Konfirmasi Pendaftaran Belum Ada Yang Dipilih');
            }            
        },
        toUpdateRegisterCoachingClinic(idRegister, idCoachingClinic){
            this.$router.push({name : "Register Coaching Clinic", query:{coachingClinicId: idCoachingClinic, registerId: idRegister} })
        },
        toDeleteRegisterCoachingClinic(id){
            this.$emit('deleteRegister', id)
        }
    },
    mounted() {
        
    }
}
</script>   