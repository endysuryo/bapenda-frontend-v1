<template>
  <div>
    <HeaderPage />
    <v-card class="mx-auto" max-width="450">
      <v-card-title class="d-flex justify-center">
        <v-avatar color="red lighten-1" size="100">
          <v-icon dark x-large>mdi-account</v-icon>
        </v-avatar>
      </v-card-title>
      <v-card-subtitle class="mt-2">
        <div class="d-flex justify-center">
          <v-text-field v-model="user.firstname" label="First Name" class="mr-3"></v-text-field>
          <v-text-field v-model="user.lastname" label="Last Name"></v-text-field>
        </div>
        <v-text-field v-model="user.email" label="E-Mail"></v-text-field>
        <v-text-field v-model="user.phone" label="Phone"></v-text-field>
      </v-card-subtitle>

      <v-card-actions>
        <v-btn block color="red lighten-1" dark @click="updateAccount">Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts" src="./account.ts"></script>
