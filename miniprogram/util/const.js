const billType = [
  {title: '借出', value: 1},
  {title: '借入', value: 2}
]

const billTypeMap = {}
for(let item of billType){
  billTypeMap[item.value] = item;
}

const COLLECTION_BILLS = 'bill-info';

module.exports = {
  billType,
  billTypeMap,
  COLLECTION_BILLS
}