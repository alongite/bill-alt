// miniprogram/pages/bill-detail/bill-detail.js
const CONST = require('../../util/const')

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billTypeMap: CONST.billTypeMap,

    name: '',
    money: '',
    billType: 0,
    borrowDate: '',
    returnDate: '',
    payType: '',
    note: '',
    isReturned: true,

    billId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      billId: options.id
    })
    this.queryBillInfo(options.id);
  },

  queryBillInfo(id){
    const bills = app.globalData.db.collection(CONST.COLLECTION_BILLS);
    bills.where({
      _id: id
    }).get().then(res => {
      console.log(res)
      let billInfo = res.data[0];
      this.setData(Object.assign({isReturned: false}, {
        ...billInfo // _openid, _id
      }))
    })
  },

  deleteBill(){
    wx.showModal({
      content: '确认删除本记录？',
      success: ret => {
        if(ret.confirm){
          this.updateDB({isDelete: true}).then(() => wx.navigateBack());
        }
      }
    })
  },

  returnBill(){
    wx.showModal({
      content: '确认归还？',
      success: ret => {
        if(ret.confirm){
          this.updateDB({isReturned: true}).then(res => {
            console.log(res);
            this.setData({
              isReturned: true
            })
          });
        }
      }
    })
  },

  editBill(){
    wx.navigateTo({
      url: '/pages/edit-bill/edit-bill?id=' + this.data.billId,
      events: {
        changeBillInfo: (data) => {
          this.setData({...data});
        }
      }
    })
  },

  updateDB(data){
    const bills = app.globalData.db.collection(CONST.COLLECTION_BILLS);
    return bills.where({
      _id: this.data.billId
    }).update({
      data
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})