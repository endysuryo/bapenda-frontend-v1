<template>
  <div>
    <HeaderPage />
    <v-progress-linear
      class="loading-indicator"
      v-if="isLoadingFetchBillboard"
      color="success"
      indeterminate
      height="5"
    ></v-progress-linear>
    <v-data-table :headers="headers" :items="billboards" :search="search" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search Billboard"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="red lighten-1" dark class="mb-2" @click="showFormCreate">Create Billboard</v-btn>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ isCreateTitle ? 'Create' : 'Edit' }} Billboard</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-text-field v-model="editedItem.name" label="JenisReklame"></v-text-field>
                  <v-text-field v-model="editedItem.weight" label="Bobot"></v-text-field>
                  <v-text-field v-model="editedItem.price" label="Harga" prefix="Rp."></v-text-field>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn v-if="isCreateTitle" color="blue darken-1" text @click="save">Save</v-btn>
                <v-btn v-if="!isCreateTitle" color="blue darken-1" text @click="update">Update</v-btn>
              </v-card-actions>
            </v-card>
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

<script lang="ts" src="./billboard.ts"></script>