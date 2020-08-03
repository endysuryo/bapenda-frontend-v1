<template>
  <div>
    <v-snackbar
      top
      v-model="snackbar"
      color="red"
    >Centorid yang dipilih kurang atau lebih dari 3, siliahkan ulangi.</v-snackbar>
    <v-dialog v-model="centroid_dialog">
      <v-card>
        <v-card-title class="headline">Centroid Summary :</v-card-title>
        <v-card-text>
          <v-data-table :headers="centroid_headers" :items="selected" class="elevation-1">
            <template v-slot:item.number="{ item }">
              {{
              selected.map(
              function(x) {
              return x.id;
              }).indexOf(item.id) + 1
              }}
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red lighten-1" @click="generateKmeans" dark>Proses</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <HeaderPage />
    <h1>Laporan</h1>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          :return-value.sync="start_date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="start_date" label="Start Date" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="start_date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu1.save(start_date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :return-value.sync="end_date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="end_date" label="End Date" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="end_date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu2.save(end_date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-btn
      block
      color="red lighten-1"
      dark
      class="mb-5"
      @click="getCustomerBillboard"
      :loading="isLoadingFetchCustomerBillboard"
    >Search</v-btn>
    <h2 class="mb-5">Pilih 3 data sebagai centroid</h2>
    <v-progress-linear indeterminate color="yellow darken-2" v-if="isLoadingFetchCustomerBillboard"></v-progress-linear>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="customerBillboardByDates"
      item-key="id"
      show-select
      class="elevation-1"
    ></v-data-table>
    <v-btn
      block
      color="red lighten-1"
      :disabled="customerBillboardByDates.length === 0"
      dark
      class="mt-5"
      :loading="isLoadingFetchCustomerBillboard"
      @click="checkCentroid"
    >Generate K-Means</v-btn>
    <v-row justify="center">
      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title>Hasil Perhitungan K-Means</v-card-title>
          <v-card-subtitle class="mt-1">
            Jumlah perulangan:
            <b>{{ kmeans.loop_total }}</b>
          </v-card-subtitle>
          <v-progress-linear
            indeterminate
            color="yellow darken-2"
            v-if="isLoadingFetchCustomerBillboard"
          ></v-progress-linear>
          <v-data-table :headers="kmeans_headers" :items="kmeans.data" class="elevation-1">
            <template v-slot:item.info="{ item }">
              <v-chip dark v-if="item.minimum_cluster === 1" color="error">Kurang Strategis</v-chip>
              <v-chip dark v-else-if="item.minimum_cluster === 2" color="warning">Cukup Strategis</v-chip>
              <v-chip dark v-else-if="item.minimum_cluster === 3" color="success">Sangat Strategis</v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts" src="./kmeans.ts"></script>
