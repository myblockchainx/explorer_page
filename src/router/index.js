import Vue from 'vue';
import Router from 'vue-router';
//index
const index = () => import('../page/index');
//miner
const miner = () => import('../page/miner');
//首页内页
//blocklist
const BlockList = () => import('../page/indexpage/BlockList');
const BlockListDetail = () => import('../page/indexpage/block_list/BlockListDetail');
//txlist
const TxList = () => import('../page/indexpage/TxList');
const TxEaDetail = () => import('../page/indexpage/tx_list/TxEaDetail');
const TxCaDetail = () => import('../page/indexpage/tx_list/TxCaDetail');
//EA_address
const EaAddress = () => import('../page/indexpage/EaAddress');
//Ca_Address
const CaAddress = () => import('../page/indexpage/CaAddress');
//VerifyContract
const VerifyContract = () => import('../page/indexpage/ca_address/VerifyContract');
//echart
const echart = () => import('../components/Echart');
//calculator
const calculator = () => import('../components/Calculator');

Vue.use(Router);

let router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {name: 'home'}
    },
    {
      path: '/home',
      name: 'home',
      component: index,
    },
    //首页内页
    //blocklist
    {
      path: '/blocklist',
      name: 'blocklist',
      component: BlockList
    },
    {
      path: '/blocklistdetail',
      name: 'blocklistdetail',
      component: BlockListDetail
    },
    //tx_list
    {
      path: '/txlist',
      name: 'txlist',
      component: TxList
    },
    {
      path: '/txeadetail',
      name: 'txeadetail',
      component: TxEaDetail
    },
    {
      path: '/txcadetail',
      name: 'txcadetail',
      component: TxCaDetail
    },
    //EA_address
    {
      path: '/eaaddress',
      name: 'eaaddress',
      component: EaAddress
    },
    //Ca_Address
    {
      path: '/caaddress',
      name: 'caaddress',
      component: CaAddress
    },
    //VerifyContract
    {
      path: '/verifycontract',
      name: 'verifycontract',
      component: VerifyContract
    },
    {
      path: '/miner',
      name: 'miner',
      component: miner
    },
    {
      path: '/echart',
      name: 'echart',
      component: echart
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: calculator
    }
 ]
});
export default router;

// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//       document.title = to.meta.title;
//   };
//   next();
// });
