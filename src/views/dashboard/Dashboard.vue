<template>
  <div>
    <HeaderPage />
    <div class="flex-center-between">
      <div class="black--text">Laporan Data Reklame</div>
      <!-- <router-link class="grey--text" :to="{ name: 'program' }">See All Programs</router-link> -->
    </div>
    <v-row class="mb-3">
      <v-col cols="12">
        <v-card>
          <v-card-text class="pa-8">
            <div class="flex-center-between">
              <!-- <div v-for="n in 4" :key="n" class="d-flex"> -->
              <v-avatar dark width="50px" height="50px" color="red lighten-1" class="mr-4">
                <v-icon color="white">mdi-arrow-up-drop-circle</v-icon>
              </v-avatar>
              <div>
                <div class="body-2">Total Reklame Wajib Pajak</div>
                <div class="headline black--text">120 Reklame</div>
              </div>
              <v-avatar dark width="50px" height="50px" color="red lighten-1" class="mr-4">
                <v-icon color="white">mdi-arrow-up-drop-circle</v-icon>
              </v-avatar>
              <div>
                <div class="body-2">Total Wajib Pajak</div>
                <div class="headline black--text">76 Wajib Pajak</div>
              </div>
              <v-avatar dark width="50px" height="50px" color="red lighten-1" class="mr-4">
                <v-icon color="white">mdi-arrow-up-drop-circle</v-icon>
              </v-avatar>
              <div>
                <div class="body-2">Total Billboard</div>
                <div class="headline black--text">89 Billboard</div>
              </div>
              <v-avatar dark width="50px" height="50px" color="red lighten-1" class="mr-4">
                <v-icon color="white">mdi-arrow-up-drop-circle</v-icon>
              </v-avatar>
              <div>
                <div class="body-2">Total Kecamatan</div>
                <div class="headline black--text">16 Kecamatan</div>
              </div>
              <!-- </div> -->
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" src="./dashboard.ts"></script>
