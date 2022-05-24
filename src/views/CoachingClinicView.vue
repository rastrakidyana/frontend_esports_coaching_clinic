<template>
    <v-main class="coaching_clinic">
        <h2 class = "white-color mb-5">Coaching Clinic</h2>
        <div class="table-content">
            <v-card height=400>
                <v-card-title>
                    <v-text-field
                        dense                            
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Cari Coaching Clinic"
                        outlined
                        hide-details>
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn class="light-blue-color" text @click="dialog = true">
                        <v-icon class="btn-add" large>mdi-plus-circle</v-icon>
                    </v-btn>
                </v-card-title>
                <v-data-table v-if="!isLoad" :headers="headers" :items="coachingClinics" :search="search" :items-per-page="5">
                    <template v-slot:[`item.aksi`]="{ item }">
                        <v-btn x-small text class="mr-2">
                            <v-icon color="black-color" @click="toDetailCoachingClinic(item.id)">mdi-card-text</v-icon> 
                        </v-btn>
                        <v-btn x-small text >
                            <v-icon color="black-color" @click="updateData(item)">mdi-pencil</v-icon> 
                        </v-btn>
                        <v-btn x-small text >
                            <v-icon color="black-color" @click="handleDeleteCoachingClinic(item.id)">mdi-delete</v-icon> 
                        </v-btn>                        
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                        <v-chip                            
                            :class="getStatusColor(item.status)">
                            {{ item.status }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.tipe_coaching_clinic`]="{ item }">
                        <v-chip                            
                            :class="getTipeColor(item.tipe_coaching_clinic)">
                            {{ item.tipe_coaching_clinic }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.harga_coaching_clinic`]="{ item }">
                        {{ getCurrency(item.harga_coaching_clinic) }}
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

        <v-dialog v-model="dialog" persistent width="700">
            <v-card class="card-custom">
                <v-card-title>
                    <span class="headline font-weight-bold">{{ formTitle }} Coaching Clinic</span>
                    <v-spacer></v-spacer>
                    <v-btn class="btn-close" text @click="close">
                        <v-icon large>mdi-close-circle</v-icon>
                    </v-btn>
                </v-card-title>
                <div class="tab-form">
                    <div class="mx-9">
                        <v-form ref="form">
                            <v-row class="form-register-row">
                                <v-text-field
                                    v-model="form.judul"
                                    label="Judul"
                                    :rules="[rules.judulRequired]"
                                    outlined
                                    required
                                ></v-text-field>
                            </v-row>
                            <v-row class="form-register-row">
                                <v-col class="form-column">
                                    <v-select
                                        v-model="form.game"
                                        label="Game"
                                        :items="options.game"
                                        item-text="nama"
                                        item-value="nama"                               
                                        :rules="[rules.gameRequired]"
                                        outlined
                                        required
                                    ></v-select>
                                </v-col>
                                <v-col class="form-column">
                                    <v-text-field
                                        v-model="form.harga"
                                        label="Harga"
                                        :rules="[rules.hargaRequired]"                                        
                                        type="number"
                                        prefix="Rp"
                                        outlined
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col class="form-column-last">
                                    <v-select
                                        v-model="form.tipe"
                                        label="Tipe"
                                        :items="options.tipe"
                                        item-text="nama"
                                        item-value="nama"                               
                                        :rules="[rules.tipeRequired]"
                                        @change="tipeChange(form.tipe)"
                                        outlined
                                        required
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row class="form-register-row">
                                <v-col class="form-column">
                                    <v-text-field
                                        v-model="form.link"
                                        label="Tautan"
                                        :disabled="isOnline == false ? true : false"                                        
                                        outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col class="form-column-last">
                                    <v-text-field
                                        v-if="isOnline == false"
                                        v-model="form.at"
                                        label="Lokasi"
                                        :rules="[rules.atRequired]"
                                        outlined
                                        required
                                    ></v-text-field>
                                    <v-select
                                        v-else
                                        v-model="form.at"
                                        label="Via"
                                        :items="options.via"
                                        item-text="nama"
                                        item-value="nama"                               
                                        :rules="[rules.viaRequired]"                                        
                                        outlined
                                        required
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row class="form-register-row-desc">
                                <v-textarea 
                                    v-model="form.desc"
                                    no-resize
                                    rows="4"
                                    label="Deskripsi"
                                    outlined
                                ></v-textarea>
                            </v-row>
                            <v-row class="form-register-row">
                                <v-file-input                                    
                                    v-model="image.form"
                                    prepend-icon=""
                                    accept="image/*"
                                    label="Gambar"
                                    :rules="inputType == 'Tambah' ? [rules.gambarRequired] : []"
                                    @change="previewImg"
                                    outlined>
                                </v-file-input>
                            </v-row>
                            <v-row v-if="showImg()" class="form-register-row-img">
                                <div class="img-border">
                                    <v-img
                                        class="img-form"                                         
                                        :src="image.show">
                                    </v-img>
                                </div>
                            </v-row>
                        </v-form>
                    </div>
                    <div class="mb-5 text-center">
                        <v-divider class="my-5"></v-divider>
                        <v-btn
                            class="register-as-button font-weight-bold"
                            x-large
                            depressed
                            @click="inputType == 'Tambah' ? handleAddCoachingClinic() : handleUpdateCoachingClinic()"
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
export default {
    // require('@/assets/images/image-not-found.png'),
    name: "coaching_clinic",
    data() {
        return {
            my: JSON.parse(localStorage.getItem('coach')),
            inputType: 'Tambah',
            isLoad: false,
            search: null,
            dialog: false,
            isOnline: false,
            editId: null,            
            image: {
                form: null,
                show: null,
            },
            headers: [
                {text: "Judul", align: "start", sortable: true, value: "judul_coaching_clinic"},
                {text: "Game", align: "start", value: "game_coaching_clinic"},
                {text: "Harga", align: "start", value: "harga_coaching_clinic"},
                {text: "Tipe", align: "start", value: "tipe_coaching_clinic"},
                {text: "Status", align: "start", value: "status"},
                {text: "Aksi", align: "start", value: "aksi"},
            ],
            form: {
                judul: null,
                game: null,
                harga: null,
                desc: null,
                tipe: null,
                at: null,
                link: null,
                gambar: null,
            },
            options: {
                game: [
                    {nama: 'Mobile Legends'},
                    {nama: 'PUBGM'},
                    {nama: 'Free Fire'},
                ],
                tipe: [
                    {nama: 'Online'},
                    {nama: 'Offline'},
                ],
                via: [
                    {nama: 'Zoom'},
                    {nama: 'Discord'},
                    {nama: 'Google Meet'},
                ]
            },
            coachingClinic: new FormData,
            coachingClinics: [],
            scheduleCoachingClinics: [],
            rules: {
                judulRequired: value => !!value || 'Judul tidak boleh kosong',
                gameRequired: value => !!value || 'Game tidak boleh kosong',
                hargaRequired: value => !!value || 'Harga tidak boleh kosong',
                tipeRequired: value => !!value || 'Tipe tidak boleh kosong',
                atRequired: value => !!value || 'Lokasi tidak boleh kosong',
                viaRequired: value => !!value || 'Via tidak boleh kosong',
                gambarRequired: value => !!value || 'Gambar tidak boleh kosong',
            },            
        };
    },
    methods: {
        loadListCoachingClinicByIdCoach() {
            this.isLoad = true;
            var url = this.$api + '/coach/get_coach_coaching_clinics/' + this.my.id;
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.coachingClinics = response.data.data_coach.daftar_coaching_clinic;
                this.isLoad = false;
            })
        },
        handleAddCoachingClinic() {
            if (this.$refs.form.validate()) {
                this.isLoad = true;
                this.coachingClinic.append('judul_coaching_clinic', this.form.judul);
                this.coachingClinic.append('game_coaching_clinic', this.form.game);
                this.coachingClinic.append('harga_coaching_clinic', this.form.harga);
                if (this.form.desc == null) this.coachingClinic.append('desc_coaching_clinic', '');
                else this.coachingClinic.append('desc_coaching_clinic', this.form.desc);
                if (this.form.link == null) this.coachingClinic.append('link_coaching_clinic', '');
                else this.coachingClinic.append('link_coaching_clinic', this.form.link);
                this.coachingClinic.append('gambar_coaching_clinic', this.image.form);
                this.coachingClinic.append('tipe_coaching_clinic', this.form.tipe);
                this.coachingClinic.append('at_coaching_clinic', this.form.at);                
                this.coachingClinic.append('id_coach', this.my.id);
                                
                var url = this.$api + '/coach/add_coaching_clinic'
                this.$http.post(url, this.coachingClinic, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.loadListCoachingClinicByIdCoach();
                    this.close();
                    this.isLoad = false;
                    this.$popup.success(response.data.message);
                }).catch(error => {
                    this.$popup.warning(error.response.data.message);
                    this.isLoad = false;
                })
            }
        },
        handleUpdateCoachingClinic(){
            if (this.$refs.form.validate()) {
                this.isLoad = true;
                let data = new FormData;
                if (this.image.form != null) {                                             
                    data.append('judul_coaching_clinic', this.form.judul);
                    data.append('game_coaching_clinic', this.form.game);
                    data.append('harga_coaching_clinic', this.form.harga);
                    if (this.form.desc == null) data.append('desc_coaching_clinic', '');
                    else data.append('desc_coaching_clinic', this.form.desc);
                    if (this.form.link == null) data.append('link_coaching_clinic', '');
                    else data.append('link_coaching_clinic', this.form.link);
                    data.append('gambar_coaching_clinic', this.image.form);
                    data.append('tipe_coaching_clinic', this.form.tipe);
                    data.append('at_coaching_clinic', this.form.at);                       
                } else {                    
                    data.append('judul_coaching_clinic', this.form.judul);
                    data.append('game_coaching_clinic', this.form.game);
                    data.append('harga_coaching_clinic', this.form.harga);
                    if (this.form.desc == null) data.append('desc_coaching_clinic', '');
                    else data.append('desc_coaching_clinic', this.form.desc);
                    if (this.form.link == null) data.append('link_coaching_clinic', '');
                    else data.append('link_coaching_clinic', this.form.link);                    
                    data.append('tipe_coaching_clinic', this.form.tipe);
                    data.append('at_coaching_clinic', this.form.at);
                }
            
                var url = this.$api + '/coach/update_coaching_clinic/' + this.editId;
                this.$http.post(url, data, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.loadListCoachingClinicByIdCoach();
                    this.close();
                    this.isLoad = false;
                    this.$popup.success(response.data.message);
                }).catch(error => {
                    this.$popup.warning(error.response.data.message);
                    this.isLoad = false;
                })
            }
        },
        handleDeleteCoachingClinic(id){
            this.$popup.question(
                'Apakah anda yakin menghapus coaching clinic ini ?',
                () => {
                    this.isLoad = true;
                    var url = this.$api + '/coach/delete_coaching_clinic/' + id;
                    this.$http.get(url, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {                                        
                        this.loadListCoachingClinicByIdCoach();
                        this.isLoad = false;
                        this.$popup.success(response.data.message);
                    }).catch(error => {
                        this.$popup.warning(error.response.data.message);                
                    })       
                },
            )            
        },
        updateData(item) {
            this.inputType = 'Ubah';
            this.editId = item.id;
            this.form = {
                judul: item.judul_coaching_clinic,
                game: item.game_coaching_clinic,
                harga: item.harga_coaching_clinic,
                desc: item.desc_coaching_clinic,
                tipe: item.tipe_coaching_clinic,
                at: item.at_coaching_clinic,
                link: item.link_coaching_clinic,
                gambar: item.gambar_coaching_clinic,
            };
            if (item.tipe_coaching_clinic == 'Online') {
                this.isOnline =  true;
            }
            this.image.show = this.$baseUrl + '/images/' + item.gambar_coaching_clinic;
            this.dialog = true;
        },
        getStatusColor(status) {
            if (status == 'Aktif') return 'status-blue-color'
            else return 'status-red-color'
        },
        getTipeColor(tipe) {
            if (tipe == 'Online') return 'tipe-green-color'
            else return 'tipe-orange-color'
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
        tipeChange(tipe){
            if (tipe == 'Online') {
                this.isOnline = true
            } else {
                this.isOnline = false
                this.form.link = null
                this.form.at = null
            }
        },
        previewImg() { 
            if (this.image.form != null) {
                this.image.show = this.getImgFromDBOrFile(this.image.form)
            } else{
                if (this.formTitle == 'Tambah') {
                    this.image.show = null
                } else {
                    this.image.show = this.getImgFromDBOrFile(this.form.gambar)
                }                
            }
        },
        showImg(){
            if (this.formTitle == 'Tambah') {
                if (this.image.form != null) {
                    return true
                } else {
                    return false
                }                    
            } else {
                if (this.image.form != null) {
                    return true
                } else {
                    return true
                }                
            }
        },
        getImgFromDBOrFile(img) {
            if (typeof img === "string") {
                return this.$baseUrl + '/images/' + img
            } else {
                return URL.createObjectURL(img)
            }
        },
        toDetailCoachingClinic(id){
            this.$router.push({name : "Detail Coaching Clinic", params :{coachingClinicId : id}})
        },
        close() {                
            this.dialog = false;
            this.inputType = 'Tambah';
            this.clear();
        },
        clear() {
            this.$refs.form.reset(); 
            this.image = {
                form: null,
                show: null,
            };
            this.isOnline = false;
        }
    },
    computed: {
        formTitle() {
            return this.inputType
        },            
    },
    mounted() {
        this.loadListCoachingClinicByIdCoach();
    }
}
</script>