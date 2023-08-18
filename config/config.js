import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
// import proxy from './proxy';
// const { REACT_APP_ENV } = process.env;

export default defineConfig({
  history: { type: 'hash' },
  chainWebpack(config) {
    config.module
      .rule('mp3')
      .test(/\.mp3$/)
      .use('file-loader')
      .loader('file-loader')
      .end();
  },
  hash: true,
  antd: {
    dark: false,
    // compact: true,
  },
  dva: {
    hmr: true,
  },
  outputPath: './dist/renderer',
  publicPath: './',
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          // authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: '首页',
              icon: 'SmileOutlined',
              component: './Welcome',
            },
            {
              name: '报价',
              icon: 'AccountBookOutlined',
              path: '/quote',
              component: './quote',
            },
            {
              name: '销售',
              icon: 'ShoppingCartOutlined',
              path: '/sales',
              component: './sales',
            },
            {
              name: '资料',
              icon: 'ReadOutlined',
              path: '/supplier',
              component: './supplier',
            },
            {
              path: '/bill',
              name: '账单',
              icon: 'crown',
              routes: [
                // {
                //   path: '/bill/billSales',
                //   name: '销售单',
                //   icon: 'smile',
                //   component: './bill/billSales',
                // },
                {
                  path: '/bill/billSalesDays',
                  name: '入库对账',
                  icon: 'smile',
                  component: './bill/billSalesDays',
                },
                {
                  path: '/bill/billMonth',
                  name: '月对账单',
                  icon: 'smile',
                  component: './bill/billMonth',
                },
                // {
                //   path: '/bill/billRefund',
                //   name: '退货单',
                //   icon: 'smile',
                //   component: './bill/billRefund',
                // },
              ],
            },
            {
              name: '退货明细',
              icon: 'ShopOutlined',
              path: '/refund',
              component: './refund',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  // proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  headScripts: [{ src: './renderer.js' }],
  define: {
    'process.env': process.env,
  },
});
