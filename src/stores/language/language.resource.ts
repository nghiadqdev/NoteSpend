const languageResource = {
  vi: {
    spending: 'Chi tiêu',
    name: 'Tên',
    mHave: 'Cần thiết',
    nTHave: 'Có thì tốt',
    wasted: 'Lãng phí',
    update: 'Cập nhật',
    stChart: 'Biểu đồ theo dõi chi tiêu',
  },
  en: {
    spending: 'Spending',
    name: 'Name',
    mHave: 'Must have',
    nTHave: 'Nice to have',
    wasted: 'Wasted',
    update: 'Update',
    stChart: 'Spend tracking chart',
  }
}
type keys = 'spending' | 'name' | 'mHave'
  | 'nTHave' | 'wasted' | 'update' | 'stChart';
export type Shape = {
  [key in keys]?: string;
}
export default languageResource