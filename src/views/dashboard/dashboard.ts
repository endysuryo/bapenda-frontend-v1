import { BillboardModule } from '@/store/modules/billboard';
import { CustomerModule } from '@/store/modules/customer';
import { SubdistrictModule } from '@/store/modules/subdistrict';
import { Hooper, Navigation, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import HeaderPage from '../../components/HeaderPage.vue';

@Component({
  name: 'Dashboard',
  components: {
    HeaderPage,
    Hooper,
    Slide,
    Navigation,
  },
})
export default class Dashboard extends Vue {
  hooperSettings: any = {
    itemsToShow: 4.14,
    centerMode: false,
    pagination: 'no',
    wheelControl: false,
  };

  get paramsBillboard() {
    return BillboardModule.paramsBillboard;
  }

  get paramsCustomer() {
    return CustomerModule.paramsCustomer;
  }

  get paramsSubdistrict() {
    return SubdistrictModule.paramsSubdistrict;
  }

  get customers() {
    return CustomerModule.customers;
  }

  get billboards() {
    return BillboardModule.billboards;
  }

  get subdistricts() {
    return SubdistrictModule.subdistricts;
  }

  created() {
    this.getCustomerList();
    this.getBillboardList();
    this.getSubdistrictList();
  }

  mounted() {
    console.info(this.$refs.hooper);
  }

  getCustomerList() {
    CustomerModule.fetchCustomer(this.paramsCustomer);
  }

  getBillboardList() {
    BillboardModule.fetchBillboard(this.paramsBillboard);
  }

  getSubdistrictList() {
    SubdistrictModule.fetchSubdistrict(this.paramsSubdistrict);
  }
}
