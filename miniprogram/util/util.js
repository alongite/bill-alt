function formatDate(dateStr){
  const d = new Date(dateStr);
  let month = d.getMonth() + 1;
  if(month < 10){
    month = '0' + month;
  }
  let day = d.getDate();
  if(day < 10){
    day = '0' + day;
  }
  return `${d.getFullYear()}-${month}-${day}`;
}

async function getOpenid(app){
    if(app.globalData.openid){
      return app.globalData.openid;
    }else{
      let ret = await wx.cloud.callFunction({
        name: 'login'
      })
      console.log('getopenid', ret);
      app.globalData.openid = ret.result.openid;
      return app.globalData.openid;
    }
}

module.exports = {
  formatDate,
  getOpenid
}