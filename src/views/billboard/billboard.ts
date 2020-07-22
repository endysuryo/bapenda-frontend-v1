import { initBillboardData } from '@/common/utils/initialValue';
import { Hooper, Navigation, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { IBillboardData } from '../../common/interface/billboard.interface';
import HeaderPage from '../../components/HeaderPage.vue';
import { BillboardModule } from '../../store/modules/billboard';

@Component({
  name: 'Billboard',
  components: {
    HeaderPage,
    Hooper,
    Slide,
    Navigation,
  },
})
export default class Billboard extends Vue {
  isCreateTitle: boolean = true;
  search: any = '';
  dialog: boolean = false;
  dialogReset: boolean = false;
  billboardData: IBillboardData = Object.assign({}, initBillboardData);

  itemWillBeDeleted: any = {};
  dialogConfirmDelete: boolean = false;

  editedIndex: any = -1;
  editedItem: any = {
    name: '',
    weight: 0,
    price: 0,
  };
  defaultItem: any = {
    name: '',
    weight: 0,
    price: 0,
  };
  hooperSettings: any = {
    itemsToShow: 4.14,
    centerMode: false,
    pagination: 'no',
    wheelControl: false,
  };

  headers: any = [
    {
      text: 'Jenis Reklame',
      align: 'start',
      sortable: true,
      value: 'name',
    },
    {
      text: 'Bobot',
      align: 'start',
      sortable: true,
      value: 'weight',
    },
    {
      text: 'Harga (Rp)',
      align: 'start',
      sortable: true,
      value: 'price',
    },
    { text: 'Actions', value: 'actions', sortable: false },
  ];

  created() {
    this.getBillboardList();
  }

  get params() {
    return BillboardModule.paramsBillboard;
  }

  get billboards() {
    return BillboardModule.billboards;
  }

  get isLoadingFetchBillboard() {
    return BillboardModule.isLoadingFetchBillboard;
  }

  getBillboardList() {
    BillboardModule.fetchBillboard(this.params);
  }

  editItem(item: any) {
    this.editedIndex = this.billboards;
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
    this.billboardData = Object.assign({}, initBillboardData);
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
    BillboardModule.deleteOneBillboard(this.itemWillBeDeleted.id);
  }

  save() {
    const dataAccount: any = {
      ...this.editedItem,
    };
    BillboardModule.createOneBillboard(dataAccount);
    this.close();
  }

  update() {
    const dataAccount: any = {
      ...this.editedItem,
    };
    BillboardModule.updateOneBillboard(dataAccount);
    this.close();
  }
}
