import { ICustomerBillboardData } from '@/common/interface/customerBillboard.interface';
import { initCustomerBillboardData } from '@/common/utils/initialValue';
import { BillboardModule } from '@/store/modules/billboard';
import { CustomerModule } from '@/store/modules/customer';
import { SubdistrictModule } from '@/store/modules/subdistrict';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import HeaderPage from '../../components/HeaderPage.vue';

@Component({
  name: 'CustomerBillboard',
  components: {
    HeaderPage,
  },
})
export default class CustomerBillboard extends Vue {
  customerBillboard: ICustomerBillboardData = initCustomerBillboardData;

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
