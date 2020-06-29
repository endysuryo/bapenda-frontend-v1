import { initCustomerData } from '@/common/utils/initialValue';
import { Hooper, Navigation, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ICustomerData } from '../../common/interface/customer.interface';
import HeaderPage from '../../components/HeaderPage.vue';
import { CustomerModule } from '../../store/modules/customer';

@Component({
  name: 'Customer',
  components: {
    HeaderPage,
    Hooper,
    Slide,
    Navigation,
  },
})
export default class Customer extends Vue {
  isCreateTitle: boolean = true;
  search: any = '';
  dialog: boolean = false;
  dialogReset: boolean = false;
  customerData: ICustomerData = Object.assign({}, initCustomerData);

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
      text: 'Nama Depan',
      align: 'start',
      sortable: false,
      value: 'name',
    },
    {
      text: 'Nama Belakang',
      align: 'start',
      sortable: false,
      value: 'address',
    },
    {
      text: 'Email',
      align: 'start',
      sortable: false,
      value: 'phone',
    },
    {
      text: 'NPWPD',
      align: 'start',
      sortable: false,
      value: 'npwp',
    },
    { text: 'Actions', value: 'actions', sortable: false },
  ];

  created() {
    this.getCustomerList();
  }

  get params() {
    return CustomerModule.paramsCustomer;
  }

  get customers() {
    console.info(CustomerModule.customers);
    return CustomerModule.customers;
  }

  get isLoadingFetchCustomer() {
    return CustomerModule.isLoadingFetchCustomer;
  }

  getCustomerList() {
    CustomerModule.fetchCustomer(this.params);
  }

  editItem(item: any) {
    this.editedIndex = this.customers;
    this.editedItem = Object.assign({}, item);
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
    this.customerData = Object.assign({}, initCustomerData);
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
    CustomerModule.deleteOneCustomer(this.itemWillBeDeleted.id);
  }

  save() {
    const dataAccount: any = {
      ...this.editedItem,
    };
    console.info('itemnya : ', dataAccount);
    CustomerModule.createOneCustomer(dataAccount);
    this.dialog = false;
  }

  update() {
    console.info('idnya: ', this.editedItem.id);
    const dataAccount: any = {
      ...this.editedItem,
    };
    CustomerModule.updateOneCustomer(dataAccount);
    this.dialog = false;
  }
}
