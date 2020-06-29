<template>
  <div>
    <HeaderPage />
    <v-snackbar
      color="success"
      top
      v-model="isSnackBarSaveCustomerBillboard"
    >Success Create Customer Billboard</v-snackbar>
    <v-card class="mx-auto">
      <!-- <v-card-subtitle class="pb-0">Login</v-card-subtitle> -->

      <v-card-text class="text--primary">
        {{ isSnackBarSaveCustomerBillboard }}
        <v-text-field v-model="customerBillboard.billing_id" label="ID Billing" required></v-text-field>
        <v-text-field v-model="customerBillboard.skpd_number" label="Nomor SKPD" required></v-text-field>
        <v-select
          :items="customers"
          label="Customer"
          item-value="id"
          item-text="name"
          v-model="customerBillboard.customer_id"
        ></v-select>
        <v-select
          :items="billboards"
          label="Jenis Billboard"
          item-value="id"
          item-text="name"
          v-model="customerBillboard.billboard_id"
          @change="onChangeBillboard()"
        ></v-select>
        <v-select
          :items="subdistricts"
          label="Lokasi Kecamatan"
          item-value="id"
          item-text="name"
          v-model="customerBillboard.subdistrict_id"
          @change="onChangeSubdistrict()"
        ></v-select>
        <v-text-field
          v-model="customerBillboard.billboard_weight"
          label="Bobot Billboard"
          required
          readonly
        ></v-text-field>
        <v-text-field v-model="customerBillboard.billboard_total" label="Total Billboard" required></v-text-field>
        <v-text-field
          v-model="customerBillboard.subdistrict_weight"
          label="Bobot Kecamatan"
          required
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red lighten-1"
          block
          dark
          :loading="isLoadingCreateCustomerBillboard"
          @click="saveData"
        >Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts" src="./customerBillboard.ts"></script>
