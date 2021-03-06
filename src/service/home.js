import axios from "axios";
var url = "http://13.251.6.203:3001/";
var near_url = "http://13.250.204.142:3030"
var data_url = "http://13.250.204.142:3000/"
// var url = "http://134.209.104.209:3001/"
// var url = "http://localhost:3001/";
// var url = "http://106.13.216.136:3001/"
// var url = urls;
class home {
    /**
     * 首页公告
     */
    // todayRewards() {
    //     return axios({
    //         method: 'POST',
    //         url: '/api/todayRewards',
    //         data: {}
    //     });
    // }
    //当前网络算力数量
    postUrl(method,params){
        return  axios.post(near_url,{
            "jsonrpc":"2.0",
            "method":method,
            "params":params,
            "id":"dontacare"})
    }
    // getAccountDetail(account) {
    //     return axios({
    //         method: 'GET',
    //         url: data_url + 'api/block/getAccount',
    //         params: { "account": account }
    //     });
    // }
    //index--> blocklistdetail 查询block信息
    block(block) {
        return axios({
            method: 'GET',
            url: data_url + 'api/block/getHeaderByHeight',
            params: { "height": block }
        });
    }
    blockList(page){
        return axios({
            method: 'GET',
            url: data_url + 'api/block/getBlockList',
            params:{
                "page":page
            }
        })
    }
    txList(page){
        return axios({
            method: 'GET',
            url : data_url + 'api/transaction/getTxListOrByAccount',
            params:{
                "page":page
            }
        })
    }
    latestMesg(){
        return axios({
            method: 'GET',
            url : data_url + 'api/common/getLatestMesg',
            params:{}
        })
    }
    getAccountById(account_id){
        return axios({
            method: 'GET',
            url : data_url + 'api/account/getAccount',
            params:{"account":account_id}
        })
    }
    totalHashRate() {
        return axios({
            method: 'POST',
            url: url + 'api/hashRate',
            data: {}
        });
    }
    //最新交易数据
    reloadTransactions() {
        return axios({
            method: 'POST',
            url: url + 'api/transaction_latest',
            data: {}
        });
    }
    
    //index--> blocklistdetail 查询block奖励明细
    blockRewardData(block) {
        return axios({
            method: 'POST',
            url: url + 'api/block_reward_detail',
            data: { "blockNumber": block }
        });
    }
    //index--> txeadetail 查询hash信息
    transactionRelay(tx) {
        return axios({
            method: 'GET',
            url: data_url + 'api/transaction/getTxByHash',
            params: { "hash": tx, }
        });
    }
    //index--> eaaddress 查询address信息
    addrTXcounts(addr) {
        return axios({
            method: 'POST',
            url: url + 'addrTXcounts',
            data: { "address": addr }
        });
    }
    addr(addr, count, addrtx, draw, length, start) {
        return axios({
            method: 'POST',
            url: url + 'addr',
            data: { "addr": addr, "count": count, "totalTX": addrtx, "draw": draw, "length": length, "start": start }
        });
    }
    web3relay(addr) {
        return axios({
            method: 'POST',
            url: url + 'api/get_balance',
            data: { "address": addr }
        });
    }
    //index--> blocklist 查询block列表信息
    totalblocks(length, start) {
        return axios({
            method: 'POST',
            // url: `http://localhost:3001/totalblocks?length=${length}&start=${start}`,
            url: url + 'api/totalblocks',
            data: {
                'length': length,
                'start': start
            }
        });
    }
    //index--> blocklist 查询tx列表信息
    totaltx(options,length, start) {
        return axios({
            method: 'get',
            // url: `http://localhost:3001/totaltx?length=${length}&start=${start}`,
            url: url + 'totaltx',
            params: {
                'options':options,
                'length': length,
                'start': start
            }
        });
    }
    //判断是否为合约账户或者外部账户
    tokenrelay(address) {
        return axios({
            method: 'POST',
            url: url + 'tokenrelay',
            data: { "action": "info", "address": address }
        });
    }
    //合约账户里面代币交易列表
    contokenrelay(address, transferPage) {
        return axios({
            method: 'POST',
            url: url + 'tokenrelay',
            data: { "action": "tokenTransfer", "address": address, "transferPage": transferPage }
        });
    }
    //合约内部事件日志
    eventLog(txHash) {
        return axios({
            method: 'POST',
            url: url + 'eventLog',
            data: { "txHash": txHash }
        });
    }
    //获取tx合约林的内部交易数据
    Txinnertx(tx, page) {
        return axios({
            method: 'get',
            url: url + 'innertx',
            params: {
                'tx': tx,
                'page': page
            }
        });
    }
    //获取tx合约林的内部交易数据
    Adinnertx(address, page) {
        return axios({
            method: 'get',
            url: url + 'innertx',
            params: {
                'address': address,
                'page': page
            }
        });
    }
    //请求外部的url（验证合约里面的一个json数据）
    CompilerJson() {
        return axios({
            method: 'get',
            url: 'https://ethereum.github.io/solc-bin/bin/list.json',
            // dataType: json
        });
    }
    //内部交易合约代码
    Compile(addr) {
        return axios({
            method: 'POST',
            url: url + 'compile',
            data: { "action": "find", "addr": addr }
        });
    }
    //账本页面数据
    Accountbook(page, condition) {
        return axios({
            method: 'POST',
            url: url + 'transactionRelay',
            data: { "action": "sortTX", "transactionPage": page, "condition": condition }
        });
    }
    //首页节点变化
    WitnessData(days) {
        return axios({
            method: 'POST',
            url: url + 'witnessData',
            data: { "action": "newNodeNumber", "period": days }
        });
    }
    minerList(page) {
        return axios({
            method: 'GET',
            url: data_url + 'api/account/getAccountList',
            params: { "page": page ,"isValidator":true}
        });
    }
    //矿工页面信息（全部矿工）
    dataCal() {
        return axios({
            method: 'POST',
            url: url + 'api/data_cal'
        });
    }
    //矿工个人信息
    minerInfo(address) {
        return axios({
            method: 'POST',
            url: url + 'api/miner_info',
            data: { "address": address }
        });
    }
    //矿工个人信息 --> 出块记录
    minerRewardList(address, page) {
        return axios({
            method: 'POST',
            url: url + 'api/miner_reward_list',
            data: { "address": address, "page": page }
        });
    }
    //区块详情 --> 交易表格
    findTxByNumber(block, page) {
        return axios({
            method: 'GET',
            url: data_url + 'api/transaction/getTxByHeight',
            params: { "height": block, "page": page }
        });
    }
    //矿工个人信息 --> 收益明细
    // getBenefitData(address, page) {
    //     return axios({
    //         method: 'POST',
    //         url: url + 'api/get_benefit_data',
    //         data: { "address": address, "page": page }
    //     });
    // }
}

export default new home();
