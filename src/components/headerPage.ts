import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
// import { UserModule } from '../store/modules/user';
import { AppModule } from '../store/modules/app';

@Component({
  name: 'HeaderPage',
})
export default class HeaderPage extends Vue {
  drawer: boolean = false;

  get title() {
    return this.$route.meta.title;
  }

  get drawerAppStatus() {
    return AppModule.drawerAppStatus;
  }

  changeDrawer(status: boolean) {
    this.drawer = status;
    AppModule.toggleDrawerApp(status);
  }
  VERSION_APP: string = process.env.VUE_APP_VERSION;
  ENV: string = process.env.NODE_ENV;
}
