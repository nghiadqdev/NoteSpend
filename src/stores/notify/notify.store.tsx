import { BodyNotifyDTO, NotifyDTO } from "~/modules/notify/notify.dto";
import notifyModule from "~/modules/notify/notify.module";
import create from 'zustand'


const NotifyStore = create(set => ({

})
)

export default NotifyStore

// export class NotifyStore {
//     @bindProp isLoading = false;
//     @bindProp dataNotify: NotifyDTO[] = [];
//     @bindProp notifyId: string = '';
//     @bindProp detailNotifyDTO: NotifyDTO = {};

//     @action
//     loadNotify = async (body: BodyNotifyDTO, isLoadMore: boolean) => {
//         this.isLoading = true;
//         try {
//             const res = await notifyModule.loadNotify(body);
//             this.dataNotify = res.data;
//             this.isLoading = false;
//         } catch {
//             this.dataNotify = [];
//             this.isLoading = false;
//         }
//         this.isLoading = false;
//     }

//     @action
//     detailNotify = async () => {
//         this.isLoading = true;
//         try {
//             if (this.notifyId) {
//                 const res = await notifyModule.detailNotify(this.notifyId);
//                 if (res) {
//                     this.detailNotifyDTO = res;
//                 }
//             }
//             this.isLoading = false;
//         } catch {
//             this.isLoading = false;
//         }
//         this.isLoading = false;
//     }

//     @action
//     comfirmNotify = async () => {
//         this.isLoading = true;
//         try {
//             const res = await notifyModule.comfirmNotify(this.notifyId);
//             this.isLoading = false;
//             return res;
//         } catch {
//             this.isLoading = false;
//         }
//         this.isLoading = false;
//     }
// }
