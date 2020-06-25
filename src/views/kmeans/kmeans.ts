import { CustomerBillboardModule } from '@/store/modules/customerBillboard';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import HeaderPage from '../../components/HeaderPage.vue';

@Component({
  name: 'Kmeans',
  components: {
    HeaderPage,
  },
})
export default class Kmeans extends Vue {
  dialog: boolean = false;
  snackbar: boolean = false;
  centroid_dialog: boolean = false;
  start_date: string = new Date().toISOString().substr(0, 10);
  end_date: string = new Date().toISOString().substr(0, 10);
  menu1: boolean = false;
  modal: boolean = false;
  menu2: boolean = false;
  selected: any = [];
  headers: any = [
    {
      text: 'Billing ID',
      align: 'start',
      sortable: false,
      value: 'billing_id',
    },
    { text: 'SKPD', value: 'skpd_number' },
    { text: 'Customer', value: 'customer.name' },
    { text: 'Jenis Billboard', value: 'billboard.name' },
    { text: 'Lokasi Kecamatan', value: 'subdistrict.name' },
    { text: 'Bobot Kecamatan', value: 'subdistrict_weight' },
    { text: 'Total Billboard', value: 'billboard_total' },
    { text: 'Bobot Billboard', value: 'billboard_weight' },
  ];

  centroid_headers: any = [
    {
      text: 'Billing ID',
      align: 'start',
      sortable: false,
      value: 'billing_id',
    },
    { text: 'SKPD', value: 'skpd_number' },
    { text: 'Customer', value: 'customer.name' },
    { text: 'Jenis Billboard', value: 'billboard.name' },
    { text: 'Lokasi Kecamatan', value: 'subdistrict.name' },
    { text: 'Bobot Kecamatan', value: 'subdistrict_weight' },
    { text: 'Total Billboard', value: 'billboard_total' },
    { text: 'Bobot Billboard', value: 'billboard_weight' },
  ];

  kmeans_headers: any = [
    {
      text: 'Billing ID',
      align: 'start',
      sortable: false,
      value: 'billing_id',
    },
    { text: 'SKPD', value: 'skpd_number' },
    { text: 'Customer', value: 'customer.name' },
    { text: 'Jenis Billboard', value: 'billboard.name' },
    { text: 'Lokasi Kecamatan', value: 'subdistrict.name' },
    { text: 'Bobot Kecamatan', value: 'subdistrict_weight' },
    { text: 'Total Billboard', value: 'billboard_total' },
    { text: 'Bobot Billboard', value: 'billboard_weight' },
    { text: 'Data Klaster 1', value: 'data_cluster1' },
    { text: 'Data Klaster 2', value: 'data_cluster2' },
    { text: 'Data Klaster 3', value: 'data_cluster3' },
    { text: 'Klaster Minimum', value: 'minimum_cluster' },
  ];

  get isLoadingFetchCustomerBillboard() {
    return CustomerBillboardModule.isLoadingFetchCustomerBillboard;
  }

  get customerBillboardByDates() {
    return CustomerBillboardModule.customerBillboardByDates;
  }

  get kmeans() {
    return CustomerBillboardModule.kmeans;
  }

  async getCustomerBillboard() {
    const params: any = {
      start_date: this.start_date,
      end_date: this.end_date,
    };

    CustomerBillboardModule.fetchCustomerBillboardByDate(params);
  }

  async checkCentroid() {
    if (this.selected.length === 3) {
      this.centroid_dialog = true;
    } else {
      this.snackbar = true;
    }
  }

  async generateKmeans() {
    console.info('selected: ', this.selected);
    this.centroid_dialog = false;
    if (this.selected.length === 3) {
      const payload = {
        start_date: this.start_date,
        end_date: this.end_date,
        cluster_1: this.selected[0],
        cluster_2: this.selected[1],
        cluster_3: this.selected[2],
      };
      console.info('payload: ', payload);
      CustomerBillboardModule.generateKmeans(payload);
      this.dialog = true;
    } else {
      console.info('tidak mantap');
    }
  }
}
