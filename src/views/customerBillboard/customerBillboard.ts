import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import HeaderPage from '../../components/HeaderPage.vue';

@Component({
  name: 'CustomerBillboard',
  components: {
    HeaderPage,
  },
})
export default class CustomerBillboard extends Vue {}
