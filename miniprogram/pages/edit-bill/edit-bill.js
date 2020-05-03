// pages/edit-bill/edit-bill.js
const app = getApp()
const util = require('../../util/util')
const CONST = require('../../util/const')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    typeRange: CONST.billType,
    billTypeIndex: 0,
    borrowDate: util.formatDate(new Date()),
    returnDate: undefined,
    money: undefined,
    name: undefined,
    payType: undefined,
    note: undefined,

    billId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options && options.id){
      this.setData({
        billId: options.id
      });
      console.log(options);
      this.queryBillInfo(options.id);
    }
    
  },

  queryBillInfo(id){
    const bills = app.globalData.db.collection(CONST.COLLECTION_BILLS);
    bills.where({
      _id: id
    }).get().then(res => {
      console.log(res)
      if(!res.data.length){
        this.setData({billId: ''});
        return;
      }
      let billInfo = res.data[0];
      let billTypeIndex = CONST.billTypeMap[billInfo.billType].index;
      this.setData({
        ...billInfo, // _openid, _id, billType
        billTypeIndex
      })
    })
  },

  setSingleData(key, value){
    let obj = {};
    obj[key] = value;
    this.setData(obj);
  },
  inputMoney(e){
    this.setSingleData('money', e.detail.value);
  },
  inputName(e){
    this.setSingleData('name', e.detail.value);
  },

  changeBillType({detail}){
    this.setSingleData('billTypeIndex', detail.value);
  },

  changeBorrowDate({detail}){
    this.setSingleData('borrowDate', detail.value);
  },

  changeReturnDate({detail}){
    this.setSingleData('returnDate', detail.value);
  },

  clearReturnDate(){
    console.log('clear return date')
    this.setSingleData('returnDate', 0);
  },

  inputPayType(e){
    this.setSingleData('payType', e.detail.value);
  },

  inputNote(e){
    this.setSingleData('note', e.detail.value);
  },

  handleSubmit(){
    if(this.data.billId){
      this.updateBill();
    }else{
      this.addBill();
    }
  },

  addBill(){
    this.setData({
      loading: true
    });
    const db = app.globalData.db
    const billInfo = db.collection(CONST.COLLECTION_BILLS)
    billInfo.add({
      data: {
        name: this.data.name,
        money: this.data.money,
        billType: this.data.typeRange[this.data.billTypeIndex].value,
        borrowDate: this.data.borrowDate,
        returnDate: this.data.returnDate,
        payType: this.data.payType,
        note: this.data.note
      }
    }).then(res => {
      console.log(res);
      wx.navigateBack()
    }).finally(() => {
      this.setData({
        loading: false
      })
    })
  },
  updateBill(){
    this.setData({
      loading: true
    });
    const db = app.globalData.db
    const billInfo = db.collection(CONST.COLLECTION_BILLS)
    let data = {
      name: this.data.name,
      money: this.data.money,
      billType: this.data.typeRange[this.data.billTypeIndex].value,
      borrowDate: this.data.borrowDate,
      returnDate: this.data.returnDate,
      payType: this.data.payType,
      note: this.data.note
    }
    billInfo.where({_id: this.data.billId}).update({data}).then(res => {
      console.log(res);
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.emit('changeBillInfo', data);
      wx.navigateBack()
    }).finally(() => {
      this.setData({
        loading: false
      })
    })
  }
})