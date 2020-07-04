import { initCustomerBillboardData } from '@/common/utils/initialValue';
import { BillboardModule } from '@/store/modules/billboard';
import { CustomerModule } from '@/store/modules/customer';
import { SubdistrictModule } from '@/store/modules/subdistrict';
import { Hooper, Navigation, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { ICustomerBillboardData } from '../../common/interface/customerBillboard.interface';
import HeaderPage from '../../components/HeaderPage.vue';
import { CustomerBillboardModule } from '../../store/modules/customerBillboard';

@Component({
  name: 'ManageCustomerBillboard',
  components: {
    HeaderPage,
    Hooper,
    Slide,
    Navigation,
  },
})
export default class CustomerBillboard extends Vue {
  isCreateTitle: boolean = true;
  search: any = '';
  dialog: boolean = false;
  dialogReset: boolean = false;
  customerBillboardData: ICustomerBillboardData = Object.assign(
    {},
    initCustomerBillboardData,
  );

  itemWillBeDeleted: any = {};
  dialogConfirmDelete: boolean = false;

  editedIndex: any = -1;
  editedItem: any = {
    name: '',
    password: '',
    phone: '',
    npwp: '',
  };
  defaultItem: any = {
    name: '',
    password: '',
    phone: '',
    npwp: '',
  };
  hooperSettings: any = {
    itemsToShow: 4.14,
    centerMode: false,
    pagination: 'no',
    wheelControl: false,
  };

  headers: any = [
    {
      text: 'Billing ID',
      align: 'start',
      sortable: true,
      value: 'billing_id',
    },
    {
      text: 'Nomor SKPD',
      align: 'start',
      sortable: true,
      value: 'skpd_number',
    },
    {
      text: 'Customer',
      align: 'start',
      sortable: true,
      value: 'customer.name',
    },
    {
      text: 'Billboard',
      align: 'start',
      sortable: true,
      value: 'billboard.name',
    },
    {
      text: 'Bobot Kecamatan',
      align: 'start',
      sortable: true,
      value: 'subdistrict_weight',
    },
    {
      text: 'Total Billboard',
      align: 'start',
      sortable: true,
      value: 'billboard_total',
    },
    {
      text: 'Bobot Billboard',
      align: 'start',
      sortable: true,
      value: 'billboard_weight',
    },
    { text: 'Actions', value: 'actions', sortable: false },
  ];

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
  tempCustomerBillboard: any = {
    id: '',
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

  @Watch('tempCustomerBillboard.billboard_id')
  onChangeBillboard(data: any) {
    const billboardWeight = this.tempBillboard.find((el: any) => {
      return el.id === data;
    });
    this.tempCustomerBillboard.billboard_weight = billboardWeight.weight;
  }

  @Watch('tempCustomerBillboard.subdistrict_id')
  onChangeSubdistrict(data: any) {
    const subdistrictWeight = this.tempSubdistrict.find((el: any) => {
      return el.id === data;
    });
    this.tempCustomerBillboard.subdistrict_weight = subdistrictWeight.weight;
  }

  created() {
    this.getCustomerList();
    this.getBillboardList();
    this.getSubdistrictList();
    this.getCustomerBillboardList();
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

  get params() {
    return CustomerBillboardModule.paramsCustomerBillboard;
  }

  get customerBillboards() {
    console.info(CustomerBillboardModule.customerBillboards);
    return CustomerBillboardModule.customerBillboards;
  }

  get isLoadingFetchCustomerBillboard() {
    return CustomerBillboardModule.isLoadingFetchCustomerBillboard;
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

  getCustomerBillboardList() {
    CustomerBillboardModule.fetchCustomerBillboard(this.params);
  }

  editItem(item: any) {
    // this.editedIndex = this.customerBillboards;
    this.tempCustomerBillboard = Object.assign({}, item);
    console.info('item will edit: ', this.tempCustomerBillboard);
    this.isCreateTitle = false;
    this.dialog = true;
  }

  close() {
    this.dialog = false;
    this.isCreateTitle = true;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }

  showFormCreate() {
    this.customerBillboardData = Object.assign({}, initCustomerBillboardData);
    this.dialog = true;
    this.isCreateTitle = true;
  }

  showConfirmDeleteItem(item: any) {
    this.itemWillBeDeleted = Object.assign({}, item);
    this.dialogConfirmDelete = true;
  }

  cancelDelete() {
    this.itemWillBeDeleted = {};
    this.dialogConfirmDelete = false;
  }

  deleteItem() {
    CustomerBillboardModule.deleteOneCustomerBillboard(
      this.itemWillBeDeleted.id,
    );
  }

  save() {
    const dataAccount: any = {
      ...this.editedItem,
    };
    console.info('itemnya : ', dataAccount);
    CustomerBillboardModule.createOneCustomerBillboard(dataAccount);
    this.close();
  }

  update() {
    console.info('idnya: ', this.tempCustomerBillboard.id);
    const dataAccount: any = {
      ...this.tempCustomerBillboard,
    };
    CustomerBillboardModule.updateOneCustomerBillboard(dataAccount);
    this.close();
  }
}
