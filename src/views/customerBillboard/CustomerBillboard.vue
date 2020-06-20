<template>
  <div>
    <HeaderPage />
    <v-snackbar v-model="snackbar" color="alert" top>
      Username atau password salah
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-card class="mx-auto">
      <!-- <v-card-subtitle class="pb-0">Login</v-card-subtitle> -->

      <v-card-text class="text--primary">
        <v-text-field v-model="customerBillboard.billing_id" label="ID Billing" required></v-text-field>
        <v-text-field v-model="customerBillboard.skpd_number" label="Nomor SKPD" required></v-text-field>
        <v-select
          :items="billboards"
          label="Jenis Billboard"
          item-value="id"
          item-text="name"
          v-model="customerBillboard.billboard_id"
        ></v-select>
        <v-select
          :items="subdistricts"
          label="Lokasi Kecamatan"
          item-value="id"
          item-text="name"
          v-model="customerBillboard.subdistrict_id"
        ></v-select>
        <v-text-field v-model="customerBillboard.billboard_weight" label="Bobot Billboard" required></v-text-field>
        <v-text-field v-model="customerBillboard.billboard_total" label="Total Billboard" required></v-text-field>
        <v-text-field
          v-model="customerBillboard.subdistrict_weight"
          label="Bobot Kecamatan"
          required
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red lighten-1" block dark @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts" src="./customerBillboard.ts"></script>
