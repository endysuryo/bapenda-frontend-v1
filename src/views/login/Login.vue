<template>
  <div>
    <v-snackbar v-model="snackbar" color="alert" top>
      Username atau password salah
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-card class="mx-auto" max-width="400">
      <v-img
        class="white--text align-end justify-center"
        height="200"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>Potensi - Bapenda Kota Semarang</v-card-title>
      </v-img>

      <!-- <v-card-subtitle class="pb-0">Login</v-card-subtitle> -->

      <form>
        <v-card-text class="text--primary">
          <v-text-field v-model="username" label="Username" required></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            @click:append="show = !show"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red lighten-1" block dark @click="login">Login</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </div>
</template>

<script lang="ts" src="./login.ts"></script>
