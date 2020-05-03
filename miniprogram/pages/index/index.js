//index.js
const app = getApp()
const util = require('../../util/util')
const CONST = require('../../util/const')

Page({
  data: {
    openid: undefined,
    tabValue: 'total',
    loading: true,
    billList: [],
    showBillList: [],
    billTypeMap: CONST.billTypeMap
  },

  onLoad: function() {
    if (!wx.cloud) {
      console.error('wx.cloud does not exist')
      return
    }
  },
  onShow: function(options) {
    util.getOpenid(app).then(openid => {
      this.loadBillList(openid);
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    util.getOpenid(app).then(openid => {
      this.loadBillList(openid);
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    util.getOpenid(app).then(openid => {
      this.loadBillList(openid);
    })
  },

  loadBillList(openid){
    const bills = app.globalData.db.collection(CONST.COLLECTION_BILLS);
    bills.where({_openid: openid}).get().then(res => {
      console.log(res);
      this.setData({
        loading: false,
        billList: res.data,
        showBillList: this.filterBillList(res.data)
      })
    })
  },
 
  handleTabChange ({ detail }) {
    this.setData({
        tabValue: detail.key,
        showBillList: this.filterBillList(undefined, detail.key)
    });
  },

  filterBillList(billList, tabValue){
    let _tabValue = tabValue || this.data.tabValue;
    let _billList = billList || this.data.billList;
    if(_tabValue === 'total'){
      return _billList;
    }
    let type = _tabValue === 'borrow' ? 2 : 1;
    return _billList.filter(item => item.billType === type);
  },

  clickBillItem (params) {
    console.log(params);
  }
})
