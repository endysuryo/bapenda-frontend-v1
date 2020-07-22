<template>
  <div>
    <HeaderPage />
    <v-progress-linear
      class="loading-indicator"
      v-if="isLoadingFetchCustomerBillboard"
      color="success"
      indeterminate
      height="5"
    ></v-progress-linear>
    <v-data-table
      :headers="headers"
      :items="customerBillboards"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search Customer Billboard"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <div>
              <v-card class="mx-auto">
                <v-card-title>
                  <span class="headline">{{ isCreateTitle ? 'Create' : 'Edit' }} Customer Billboards</span>
                </v-card-title>
                <v-card-text class="text--primary">
                  <v-text-field
                    v-model="tempCustomerBillboard.billing_id"
                    label="ID Billing"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="tempCustomerBillboard.skpd_number"
                    label="Nomor SKPD"
                    required
                  ></v-text-field>
                  <v-select
                    :items="customers"
                    label="Customer"
                    item-value="id"
                    item-text="name"
                    v-model="tempCustomerBillboard.customer_id"
                  ></v-select>
                  <v-select
                    :items="tempBillboard"
                    label="Jenis Billboard"
                    item-value="id"
                    item-text="name"
                    v-model="tempCustomerBillboard.billboard_id"
                    @change="onChangeBillboard()"
                  ></v-select>
                  <v-select
                    :items="tempSubdistrict"
                    label="Lokasi Kecamatan"
                    item-value="id"
                    item-text="name"
                    v-model="tempCustomerBillboard.subdistrict_id"
                    @change="onChangeSubdistrict()"
                  ></v-select>
                  <v-text-field
                    v-model="tempCustomerBillboard.billboard_weight"
                    label="Bobot Billboard"
                    required
                    readonly
                  ></v-text-field>
                  <v-text-field
                    v-model="tempCustomerBillboard.billboard_total"
                    label="Total Billboard"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="tempCustomerBillboard.subdistrict_weight"
                    label="Bobot Kecamatan"
                    required
                    readonly
                  ></v-text-field>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red lighten-1" text @click="close">Cancel</v-btn>
                  <v-btn v-if="isCreateTitle" color="red lighten-1" text @click="save">Save</v-btn>
                  <v-btn v-if="!isCreateTitle" color="red lighten-1" text @click="update">Update</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="showConfirmDeleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <!-- Delete Dialog -->
    <v-dialog v-model="dialogConfirmDelete" max-width="450">
      <v-card>
        <v-card-title>Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialogConfirmDelete = false">Cancel</v-btn>

          <v-btn color="green darken-1" text @click="dialogConfirmDelete = deleteItem(item)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" src="./manageCustomerBillboard.ts"></script>