import { UserModule } from '@/store/modules/user';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import HeaderPage from '../../components/HeaderPage.vue';

@Component({
  name: 'Account',
  components: {
    HeaderPage,
  },
})
export default class Account extends Vue {
  user_id: string = 'd162781c-e965-4ff3-9798-421d4080ea74';

  created() {
    this.fetchOneUser();
  }

  get user() {
    return UserModule.users;
  }

  fetchOneUser() {
    UserModule.fetchOneUser(this.user_id);
  }

  updateAccount() {
    const tempData: any = this.user;
    UserModule.updateOneUser(tempData);
  }
}
