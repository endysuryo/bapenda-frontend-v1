<template>
  <v-app id="base-app">
    <v-navigation-drawer
      :mini-variant="miniVariant"
      clipped
      app
      dark
      color="red lighten-1"
      width="280"
      v-model="drawerAppStatus"
    >
      <v-list>
        <v-list-item two-line :class="miniVariant && 'px-0'" class="my-5">
          <v-list-item-content class="px-3">
            <!-- <img src="./../assets/images/bapenda-logo.png" /> -->
            <h2>E-Potensi</h2>
            <h5>Bapenda Kota Semarang</h5>
          </v-list-item-content>
        </v-list-item>

        <div class="px-5">
          <!-- <v-subheader v-if="!miniVariant">Dashboard</v-subheader> -->
          <v-list-item
            class="mb-2"
            v-for="item in itemsAccount"
            :key="item.text"
            :to="{ name: item.routeName }"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-subheader v-if="!miniVariant">Master Data</v-subheader>
          <v-list-item v-for="item in itemsCourse" :key="item.text" :to="{ name: item.routeName }">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-content class="ash">
      <div class="inner-content">
        <router-view />
      </div>
    </v-content>
  </v-app>
</template>

<script lang="ts" src="./baseApp.ts"></script>
