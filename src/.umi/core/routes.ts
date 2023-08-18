// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/longy1/Desktop/DT-code/DTSupplierClient/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/user",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/Users/longy1/Desktop/DT-code/DTSupplierClient/src/layouts/UserLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "name": "login",
        "path": "/user/login",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__login' */'/Users/longy1/Desktop/DT-code/DTSupplierClient/src/pages/user/login'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'/Users/longy1/Desktop/DT-code/DTSupplierClient/src/layouts/SecurityLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/Users/longy1/Desktop/DT-code/DTSupplierClient/src/layouts/BasicLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/",
            "redirect": "/welcome",
            "exact": true
          },
          {
            "path": "/welcome",
            "name": "首页",
            "icon": "SmileOutlined",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/longy1/Desktop/DT-code/DTSupplierClient/src/pages/Welcome'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "报价",
            "icon": "AccountBookOutlined",
            "path": "/quote",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__quote' */'/Users/longy1/Desktop/DT-code/DTSupplierClient/src/pages/quote'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "销售",
            "icon": "ShoppingCartOutlined",
            "path": "/sales",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__sales' */'/Users/longy1/Desktop/DT-code/DTSupplierClient/src/pages/sales'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "资料",
            "icon": "ReadOutlined",
            "path": "/supplier",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__supplier' */'/Users/longy1/Desktop/DT-code/DTSupplierClient/src/pages/supplier'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/bill",
            "name": "账单",
            "icon": "crown",
            "routes": [
              {
                "path": "/bill/billSalesDays",
                "name": "入库对账",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__bill__billSalesDays' */'/Users/longy1/Desktop/DT-code/DTSupplierClient/src/pages/bill/billSalesDays'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/bill/billMonth",
                "name": "月对账单",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__bill__billMonth' */'/Users/longy1/Desktop/DT-code/DTSupplierClient/src/pages/bill/billMonth'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "退货明细",
            "icon": "ShopOutlined",
            "path": "/refund",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__refund' */'/Users/longy1/Desktop/DT-code/DTSupplierClient/src/pages/refund'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/longy1/Desktop/DT-code/DTSupplierClient/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/longy1/Desktop/DT-code/DTSupplierClient/src/pages/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/longy1/Desktop/DT-code/DTSupplierClient/src/pages/404'), loading: LoadingComponent}),
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
