const languageResource = {
  vi: {
    spending: 'Chi tiêu',
    name: 'Tên',
    MushHave: 'Cần thiết',
    NiceToHave: 'Có thì tốt',
    Wasted: 'Lãng phí',
    update: 'Cập nhật',
    stChart: 'Biểu đồ theo dõi chi tiêu',
    total: 'Tổng cộng',
  },
  en: {
    spending: 'Spending',
    name: 'Name',
    MushHave: 'Must have',
    NiceToHave: 'Nice to have',
    Wasted: 'Wasted',
    update: 'Update',
    stChart: 'Spend tracking chart',
    total: 'Total',
  }
}
type keys = 'spending' | 'name' | 'MushHave'
  | 'NiceToHave' | 'Wasted' | 'update' | 'stChart' | 'total';
export type Shape = {
  [key in keys]?: string;
}
export default languageResource