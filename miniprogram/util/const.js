const billType = [
  {title: '借出', value: 1},
  {title: '借入', value: 2}
]

const billTypeMap = {}
billType.forEach((item, index) => {
  billTypeMap[item.value] = item;
  item.index = index;
})

const COLLECTION_BILLS = 'bill-info';

module.exports = {
  billType,
  billTypeMap,
  COLLECTION_BILLS
}