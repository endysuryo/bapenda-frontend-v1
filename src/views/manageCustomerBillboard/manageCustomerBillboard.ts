import { initCustomerBillboardData } from '@/common/utils/initialValue';
import { Hooper, Navigation, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
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
      text: 'Bobot Billboard',
      align: 'start',
      sortable: true,
      value: 'billboard_weight',
    },
    {
      text: 'Total Billboard',
      align: 'start',
      sortable: true,
      value: 'billboard_total',
    },
    {
      text: 'Bobot Kecamatan',
      align: 'start',
      sortable: true,
      value: 'subdistrict_weight',
    },
    { text: 'Actions', value: 'actions', sortable: false },
  ];

  created() {
    this.getCustomerBillboardList();
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

  getCustomerBillboardList() {
    CustomerBillboardModule.fetchCustomerBillboard(this.params);
  }

  editItem(item: any) {
    this.editedIndex = this.customerBillboards;
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
    console.info('idnya: ', this.editedItem.id);
    const dataAccount: any = {
      ...this.editedItem,
    };
    CustomerBillboardModule.updateOneCustomerBillboard(dataAccount);
    this.close();
  }
}
