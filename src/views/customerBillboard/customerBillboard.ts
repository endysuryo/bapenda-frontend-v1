import { ICustomerBillboardData } from '@/common/interface/customerBillboard.interface';
import { initCustomerBillboardData } from '@/common/utils/initialValue';
import { BillboardModule } from '@/store/modules/billboard';
import { CustomerModule } from '@/store/modules/customer';
import { CustomerBillboardModule } from '@/store/modules/customerBillboard';
import { SubdistrictModule } from '@/store/modules/subdistrict';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import HeaderPage from '../../components/HeaderPage.vue';

@Component({
  name: 'CustomerBillboard',
  components: {
    HeaderPage,
  },
})
export default class CustomerBillboard extends Vue {
  customerBillboard: any = {
    customer_id: '',
    billing_id: '',
    skpd_number: '',
    billboard_id: '',
    subdistrict_id: '',
    billboard_weight: 0,
    billboard_total: 0,
    subdistrict_weight: 0,
    user_id: '',
  };
  tempBillboard: any = this.billboards;
  tempSubdistrict: any = this.subdistricts;
  snackbar: boolean = true;

  @Watch('customerBillboard.billboard_id')
  onChangeBillboard(data: any) {
    const billboardWeight = this.tempBillboard.find((el: any) => {
      return el.id === data;
    });
    this.customerBillboard.billboard_weight = billboardWeight.weight;
  }

  @Watch('customerBillboard.subdistrict_id')
  onChangeSubdistrict(data: any) {
    const subdistrictWeight = this.tempSubdistrict.find((el: any) => {
      return el.id === data;
    });
    this.customerBillboard.subdistrict_weight = subdistrictWeight.weight;
  }

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

  get isLoadingCreateCustomerBillboard() {
    return CustomerBillboardModule.isLoadingCreateCustomerBillboard;
  }

  get isSnackBarSaveCustomerBillboard() {
    return CustomerBillboardModule.isSnackBarSaveCustomerBillboard;
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

  async saveData() {
    this.customerBillboard = {
      ...this.customerBillboard,
      user_id: 'd162781c-e965-4ff3-9798-421d4080ea74',
    };
    CustomerBillboardModule.createOneCustomerBillboard(this.customerBillboard);
    this.customerBillboard = {
      customer_id: '',
      billing_id: '',
      skpd_number: '',
      billboard_id: '',
      subdistrict_id: '',
      billboard_weight: 0,
      billboard_total: 0,
      subdistrict_weight: 0,
      user_id: '',
    };
  }
}
