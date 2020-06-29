import CustomerBillboard from '@/views/customerBillboard/CustomerBillboard.vue';
import Login from '@/views/login/Login.vue';
import Vue from 'vue';
import Router from 'vue-router';
import Account from '../views/account/Account.vue';
import Billboard from '../views/billboard/Billboard.vue';
import Customer from '../views/customer/Customer.vue';
import Dashboard from '../views/dashboard/Dashboard.vue';
import Kmeans from '../views/kmeans/Kmeans.vue';
import Subdistrict from '../views/subdistrict/Subdistrict.vue';

Vue.use(Router);

class RouteMeta {
  back?: string;
  title: string;
  requiredAuth?: boolean;
  roles?: any[];
  sidebar?: boolean;

  constructor({
    back,
    title,
    requiredAuth,
    roles,
    sidebar,
  }: {
    back?: string;
    title: string;
    requiredAuth?: boolean;
    roles?: any[];
    sidebar?: boolean;
  }) {
    this.back = back;
    this.title = title;
    this.requiredAuth = requiredAuth;
    this.roles = roles;
    this.sidebar = sidebar;
  }
}

export const routes: any[] = [
  {
    path: '/',
    name: 'home',
    component: Login,
    meta: {
      requiresAuth: true,
      title: 'Login',
      // roles: Object.values(ROLES),
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      requiredAuth: true,
    },
  },
  {
    path: '/customer-billboard',
    name: 'customer-billboard',
    component: CustomerBillboard,
    meta: {
      title: 'Customer Billboard',
      requiredAuth: true,
    },
  },
  {
    path: '/kmeans',
    name: 'kmeans',
    component: Kmeans,
    meta: {
      title: 'Laporan',
      requiredAuth: true,
    },
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer,
    meta: {
      title: 'Customer',
      requiredAuth: true,
    },
  },
  {
    path: '/billboard',
    name: 'billboard',
    component: Billboard,
    meta: {
      title: 'Billboard',
      requiredAuth: true,
    },
  },
  {
    path: '/customer',
    name: 'customer',
    component: Customer,
    meta: {
      title: 'Customer',
      requiredAuth: true,
    },
  },
  {
    path: '/subdistrict',
    name: 'subdistrict',
    component: Subdistrict,
    meta: {
      title: 'Data Kecamatan',
      requiredAuth: true,
    },
  },
  /* author-account */
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: new RouteMeta({ title: 'Account' }),
  },
];

const realm = window.location.pathname.split('/')[2];

const baseRouter = new Router({
  mode: 'history',
  // base: process.env.BASE_URL + window.location.pathname,
  base: process.env.BASE_URL,
  routes,
});

baseRouter.beforeEach((to, from, next) => {
  let routePermission: string[] = [];

  if (realm !== 'master') {
    routePermission = ['report'];
  } else {
    routePermission = ['program', 'account'];
  }

  const exp = to.fullPath.split('/author/' + realm);
  if (!to.name) {
    if (exp.length < 2) {
      next();
    } else {
      next(exp[1]);
    }
  } else {
    routePermission.forEach((item: any) => {
      if (to.path.includes(item)) {
        next({ name: 'dashboard' });
      } else {
        next();
      }
    });
  }
});

export default baseRouter;
