<template>
  <div>
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
      @click="generateKmeans"
    >Generate K-Means</v-btn>
    <v-row justify="center">
      <v-dialog v-model="dialog">
        <v-card>
          <v-progress-linear
            indeterminate
            color="yellow darken-2"
            v-if="isLoadingFetchCustomerBillboard"
          ></v-progress-linear>
          <v-data-table :headers="kmeans_headers" :items="kmeans" class="elevation-1"></v-data-table>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts" src="./kmeans.ts"></script>
