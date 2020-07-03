import { initSubdistrictData } from '@/common/utils/initialValue';
import { Hooper, Navigation, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { ISubdistrictData } from '../../common/interface/subdistrict.interface';
import HeaderPage from '../../components/HeaderPage.vue';
import { SubdistrictModule } from '../../store/modules/subdistrict';

@Component({
  name: 'Subdistrict',
  components: {
    HeaderPage,
    Hooper,
    Slide,
    Navigation,
  },
})
export default class Subdistrict extends Vue {
  isCreateTitle: boolean = true;
  search: any = '';
  dialog: boolean = false;
  dialogReset: boolean = false;
  subdistrictData: ISubdistrictData = Object.assign({}, initSubdistrictData);

  itemWillBeDeleted: any = {};
  dialogConfirmDelete: boolean = false;

  editedIndex: any = -1;
  editedItem: any = {
    name: '',
    weight: '',
  };
  defaultItem: any = {
    name: '',
    weight: '',
  };
  hooperSettings: any = {
    itemsToShow: 4.14,
    centerMode: false,
    pagination: 'no',
    wheelControl: false,
  };

  headers: any = [
    {
      text: 'Nama Kecamatan',
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
    { text: 'Actions', value: 'actions', sortable: false },
  ];

  mounted() {
    this.getSubdistrictList();
  }

  get params() {
    return SubdistrictModule.paramsSubdistrict;
  }

  get subdistricts() {
    console.info(SubdistrictModule.subdistricts);
    return SubdistrictModule.subdistricts;
  }

  get isLoadingFetchSubdistrict() {
    return SubdistrictModule.isLoadingFetchSubdistrict;
  }

  getSubdistrictList() {
    SubdistrictModule.fetchSubdistrict(this.params);
  }

  editItem(item: any) {
    this.editedIndex = this.subdistricts;
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
    this.subdistrictData = Object.assign({}, initSubdistrictData);
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
    SubdistrictModule.deleteOneSubdistrict(this.itemWillBeDeleted.id);
  }

  save() {
    const dataAccount: any = {
      ...this.editedItem,
    };
    console.info('itemnya : ', dataAccount);
    SubdistrictModule.createOneSubdistrict(dataAccount);
    this.close();
  }

  update() {
    console.info('idnya: ', this.editedItem.id);
    const dataAccount: any = {
      ...this.editedItem,
    };
    SubdistrictModule.updateOneSubdistrict(dataAccount);
    this.close();
  }
}
