<template>
    <v-main class="detail_coaching_clinic">
        <h2 class = "white-color mb-5">Detail Coaching Clinic</h2>
        <div class="table-content" v-if="isLoad == false">
            <v-row>
                <v-col cols=3>
                    <v-card height=200 width=80%>
                        <div class="img-border-detail">
                            <v-img
                                class="img-form-detail"
                                :src="getImgFromDB(coachingClinic.gambar_coaching_clinic)">
                            </v-img>
                        </div>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card height=200>
                        <v-card-title>
                            <h5 class="font-weight-bold">Deskripsi</h5>
                        </v-card-title>
                        <v-card-text class="enable-scroll-y text-justify">
                            <span class="black-color">{{ coachingClinic.desc_coaching_clinic }}</span>
                        </v-card-text>
                    </v-card>                    
                </v-col>
            </v-row>
            <v-row>
                <v-col cols=3>
                    <v-card height=480 width=90% style="overflow-x: hidden;">
                        <div class="info-detail">
                            <v-card-title class="info-title">
                                <h5 class="font-weight-bold">Judul</h5>
                            </v-card-title>
                            <v-card-subtitle class="text-left info-title">
                                <h4 class="font-weight-regular black-color">{{ coachingClinic.judul_coaching_clinic }}</h4>
                            </v-card-subtitle>
                        </div>
                        <div class="info-detail">
                            <v-card-title class="info-title">
                                <h5 class="font-weight-bold">Game</h5>
                            </v-card-title>
                            <v-card-subtitle class="text-left info-title">
                                <h4 class="font-weight-regular black-color">{{ coachingClinic.game_coaching_clinic }}</h4>
                            </v-card-subtitle>
                        </div>
                        <div class="info-detail">
                            <v-card-title class="info-title">
                                <h5 class="font-weight-bold">Harga</h5>
                            </v-card-title>
                            <v-card-subtitle class="text-left info-title">
                                <h4 class="font-weight-regular black-color">{{ getCurrency(coachingClinic.harga_coaching_clinic) }}</h4>
                            </v-card-subtitle>
                        </div>
                        <div class="info-detail">
                            <v-card-title class="info-title">
                                <h5 class="font-weight-bold">Tipe</h5>
                            </v-card-title>
                            <v-card-subtitle class="text-left info-title">
                                <h4 class="font-weight-regular black-color">{{ coachingClinic.tipe_coaching_clinic }}</h4>
                            </v-card-subtitle>
                        </div>
                        <div class="info-detail">
                            <v-card-title class="info-title">
                                <h5 v-if="coachingClinic.tipe_coaching_clinic == 'Online'" class="font-weight-bold">Via</h5>
                                <h5 v-else class="font-weight-bold">Lokasi</h5>
                            </v-card-title>
                            <v-card-subtitle class="text-left info-title">
                                <h4 class="font-weight-regular black-color">{{ coachingClinic.at_coaching_clinic }}</h4>
                            </v-card-subtitle>
                        </div>
                        <div class="info-detail" v-if="coachingClinic.link_coaching_clinic != null">
                            <v-card-title class="info-title">
                                <h5 class="font-weight-bold">Tautan</h5>
                            </v-card-title>
                            <v-card-subtitle class="text-left info-title">
                                <h4 class="font-weight-regular black-color">{{ coachingClinic.link_coaching_clinic }}</h4>
                            </v-card-subtitle>
                        </div>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card height=300>
                        <v-card-title>
                            <h5 class="font-weight-bold">Jadwal Coaching Clinic</h5>
                            <v-spacer></v-spacer>
                            <v-btn class="light-blue-color" text @click="dialog.schedule = true">
                                <v-icon class="btn-add" large>mdi-plus-circle</v-icon>
                            </v-btn>
                        </v-card-title>
                        <div class="enable-scroll-y">
                            <v-data-table :headers="headers" :items="schedules" :items-per-page="5">
                                <template v-slot:[`item.aksi`]="{ item }">
                                    <v-btn x-small text class="mr-2">
                                        <v-icon color="black-color">mdi-account-group</v-icon> 
                                    </v-btn>
                                    <v-btn x-small text >
                                        <v-icon color="black-color" @click="updateData(item)">mdi-pencil</v-icon> 
                                    </v-btn>
                                    <v-btn x-small text >
                                        <v-icon color="black-color" @click="handleDeleteSchedule(item.id)">mdi-delete</v-icon> 
                                    </v-btn>                        
                                </template>
                                <template v-slot:[`item.waktu`]="{ item }">
                                    <span v-if="item.berakhir_coaching_clinic != null">{{ getIdTime(item.mulai_coaching_clinic) }} - {{ getIdTime(item.berakhir_coaching_clinic) }} WIB</span>
                                    <span v-else>{{ getIdTime(item.mulai_coaching_clinic) }} WIB</span>
                                </template>
                                <template v-slot:[`item.tgl_coaching_clinic`]="{ item }">
                                    {{ getIdDate(item.tgl_coaching_clinic)}}
                                </template>
                            </v-data-table>
                        </div>
                    </v-card>
                    <v-card height=150 class="mt-7">
                        <v-card-title>
                            <h5 class="font-weight-bold">Modul Coaching Clinic</h5>
                            <v-spacer></v-spacer>                            
                            <v-btn class="light-blue-color" text @click="triggerAddModule">
                                <v-icon class="btn-add" large>mdi-plus-circle</v-icon>
                            </v-btn>
                            <input 
                                ref="uploadModule" 
                                class="d-none" 
                                type="file"
                                accept=".pdf, .docx, .pptx"
                                @change="handleAddModule"
                            >
                        </v-card-title>
                        <div class="enable-scroll-module">
                            <v-card-subtitle>
                                <div class="mb-2"
                                    v-for="item in modules"
                                    :key="item.file_modul"> 
                                    <span class="module-download" @click="downloadModule(item.file_modul)">{{ item.file_modul }}</span>
                                    <v-btn class="ml-3" x-small text >
                                        <v-icon color="black-color" @click="handleDeleteModule(item.id)">mdi-delete</v-icon> 
                                    </v-btn>
                                </div>                               
                            </v-card-subtitle>
                        </div>
                    </v-card>                   
                </v-col>
            </v-row>
        </div>
        <div v-else class="loading-table">
            <v-progress-circular
                class="white-color"
                :size="100"
                :width="10"                                                   
                indeterminate
            ></v-progress-circular>
        </div>

        <v-dialog v-model="dialog.schedule" persistent width="500">
            <v-card class="card-custom-schedule">
                <v-card-title>
                    <span class="headline font-weight-bold">{{ formTitle }} Jadwal Coaching Clinic</span>
                    <v-spacer></v-spacer>
                    <v-btn class="btn-close" text @click="close">
                        <v-icon large>mdi-close-circle</v-icon>
                    </v-btn>
                </v-card-title>
                <div class="tab-form">
                    <div class="mx-9">
                        <v-form ref="form">
                            <v-row class="form-register-row">
                                <v-col class="form-column">
                                    <v-text-field
                                        v-model="form.tgl"
                                        label="Tanggal"
                                        :rules="[rules.tglRequired]"                                        
                                        type="date"                                        
                                        outlined
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col class="form-column">
                                    <v-text-field
                                        v-model="form.kuota"
                                        label="Kuota"
                                        :rules="[rules.kuotaRequired]"
                                        min=1                                        
                                        type="number"                                        
                                        outlined
                                        required
                                    ></v-text-field>
                                </v-col>                                
                            </v-row>
                            <v-row class="form-register-row">
                                <v-col class="form-column">
                                    <v-text-field
                                        v-model="form.mulai"
                                        label="Mulai"
                                        :rules="[rules.mulaiRequired]"                                        
                                        type="time"
                                        :messages="form.mulai == null ? '' : 'Zona Waktu Dalam WIB'"
                                        outlined
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col class="form-column">
                                    <v-text-field
                                        v-model="form.berakhir"
                                        label="Selesai"                                        
                                        type="time"
                                        clearable
                                        outlined
                                        required
                                    ></v-text-field>
                                </v-col>                                
                            </v-row>
                        </v-form>
                    </div>
                    <div class="mb-5 text-center">
                        <v-divider class="my-5"></v-divider>
                        <v-btn
                            class="register-as-button font-weight-bold"
                            x-large
                            depressed
                            @click="inputType == 'Tambah' ? handleAddSchedule() : handleUpdateSchedule()"
                        >
                            <span v-if="isLoad == false">{{ inputType }}</span>
                            <v-progress-circular 
                                v-else
                                indeterminate
                            ></v-progress-circular>
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </v-main>
</template>

<script>
import moment from "moment";
export default {
    name: "detail_coaching_clinic",
    data() {
        return {
            my: JSON.parse(localStorage.getItem('coach')),
            inputType: 'Tambah',
            isLoad: false,
            dialog: {
                schedule: false,
                participant: false,
            },
            editId: null,            
            coachingClinic: [],
            schedule: new FormData,
            module: new FormData,
            schedules: [],
            modules: [],
            headers: [
                {text: "Tanggal", align: "start", sortable: true, value: "tgl_coaching_clinic"},
                {text: "Waktu", align: "start", value: "waktu"},
                {text: "Kuota", align: "start", value: "kuota_coaching_clinic"},                
                {text: "Aksi", align: "start", value: "aksi"},
            ],
            form: {
                tgl: null,
                mulai: null,
                berakhir: null,
                kuota: null,
            },
            rules: {
                tglRequired: value => !!value || 'Tanggal tidak boleh kosong',
                kuotaRequired: value => !!value || 'Kuota tidak boleh kosong',
                mulaiRequired: value => !!value || 'Waktu mulai tidak boleh kosong',                
            },
        };
    },
    methods: {
        loadCoachingClinicById() {
            this.isLoad = true;
            var url = this.$api + '/coach/get_coaching_clinic/' + this.$route.params.coachingClinicId;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.coachingClinic = response.data.data_coaching_clinic;
                this.isLoad = false;
            })
        },
        loadListScheduleByIdCoachingClinic() {
            this.isLoad = true;
            var url = this.$api + '/coach/get_coaching_clinic_schedules/' + this.$route.params.coachingClinicId;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.schedules = response.data.data_coaching_clinic.daftar_jadwal_coaching_clinic;
                this.isLoad = false;
            })
        },
        loadListModuleByIdCoachingClinic() {
            this.isLoad = true;
            var url = this.$api + '/coach/get_coaching_clinic_modules/' + this.$route.params.coachingClinicId;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.modules = response.data.data_module.daftar_modul_coaching_clinic;
                this.isLoad = false;
            })
        },
        handleAddSchedule() {
            if (this.$refs.form.validate()) {
                this.isLoad = true;
                this.schedule.append('tgl_coaching_clinic', this.form.tgl);
                this.schedule.append('kuota_coaching_clinic', this.form.kuota);
                this.schedule.append('mulai_coaching_clinic', this.form.mulai);
                if (this.form.berakhir == null) this.schedule.append('berakhir_coaching_clinic', '');
                else this.schedule.append('berakhir_coaching_clinic', this.form.berakhir);
                this.schedule.append('id_coaching_clinic', this.$route.params.coachingClinicId);

                var url = this.$api + '/coach/add_schedule_coaching_clinic'
                this.$http.post(url, this.schedule, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.loadListScheduleByIdCoachingClinic();
                    this.close();
                    this.isLoad = false;
                    this.$popup.success(response.data.message);
                }).catch(error => {
                    this.$popup.warning(error.response.data.message);
                    this.isLoad = false;
                })
            }
        },
        handleUpdateSchedule(){
            if (this.$refs.form.validate()) {
                this.isLoad = true;                
                let data = {
                    tgl_coaching_clinic: this.form.tgl,
                    kuota_coaching_clinic: this.form.kuota,
                    mulai_coaching_clinic: this.form.mulai,
                    berakhir_coaching_clinic: this.form.berakhir,                    
                };

                var url = this.$api + '/coach/update_schedule_coaching_clinic/' + this.editId;
                this.$http.put(url, data, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.loadListScheduleByIdCoachingClinic();
                    this.close();
                    this.isLoad = false;
                    this.$popup.success(response.data.message);
                }).catch(error => {
                    this.$popup.warning(error.response.data.message);
                    this.isLoad = false;
                })
            }
        },
        handleDeleteSchedule(id){
            this.$popup.question(
                'Apakah anda yakin menghapus jadwal coaching clinic ini ?',
                () => {
                    this.isLoad = true;
                    var url = this.$api + '/coach/delete_schedule_coaching_clinic/' + id;
                    this.$http.get(url, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {                                        
                        this.loadListScheduleByIdCoachingClinic();
                        this.isLoad = false;
                        this.$popup.success(response.data.message);
                    }).catch(error => {
                        this.$popup.warning(error.response.data.message);                
                        this.isLoad = false;
                    })       
                },
            )            
        },
        handleAddModule(e) {
            const files = e.target.files || e.dataTransfer.files
            this.module.append('file_modul', files[0])
            this.module.append('id_coaching_clinic', this.$route.params.coachingClinicId)

            var url = this.$api + '/coach/add_module_coaching_clinic'
            this.$http.post(url, this.module, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.loadCoachingClinicById()
                this.loadListScheduleByIdCoachingClinic()
                this.close();
                this.isLoad = false;
                this.$popup.success(response.data.message);
            }).catch(error => {
                this.$popup.warning(error.response.data.message);
                this.isLoad = false;
            })            
        },
        handleDeleteModule(id){
            this.$popup.question(
                'Apakah anda yakin menghapus modul coaching clinic ini ?',
                () => {
                    this.isLoad = true;
                    var url = this.$api + '/coach/delete_module_coaching_clinic/' + id;
                    this.$http.get(url, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {                                        
                        this.loadListModuleByIdCoachingClinic();
                        this.isLoad = false;
                        this.$popup.success(response.data.message);
                    }).catch(error => {
                        this.$popup.warning(error.response.data.message);                
                        this.isLoad = false;
                    })       
                },
            )            
        },
        updateData(item) {
            this.inputType = 'Ubah';
            this.editId = item.id;
            this.form = {
                tgl: item.tgl_coaching_clinic,
                kuota: item.kuota_coaching_clinic,
                mulai: item.mulai_coaching_clinic,
                berakhir: item.berakhir_coaching_clinic,
            };                        
            this.dialog.schedule = true;
        },
        downloadModule(file) {
            // return this.$baseUrl + '/modules/' + file
            console.log(this.$baseUrl + '/modules/' + file)

            this.$http.get(this.$baseUrl + '/modules/' + file, {responseType: 'blob'})
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file);
                document.body.appendChild(link);
                link.click();
            })
            .catch(e => {
                console.log(e);
            });
            
        },
        triggerAddModule() {
            this.$refs.uploadModule.click();
        },
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
        getImgFromDB(img) {
            return this.$baseUrl + '/images/' + img
        },
        close() {                
            this.dialog = {
                schedule: false,
                participant: false,
            };
            this.inputType = 'Tambah';
            this.clear();
        },
        clear() {
            this.$refs.form.reset();
        }
    },
    computed: {
        formTitle() {
            return this.inputType
        },            
    },
    mounted() {
        this.loadCoachingClinicById()
        this.loadListScheduleByIdCoachingClinic()
        this.loadListModuleByIdCoachingClinic()
    }
}
</script>