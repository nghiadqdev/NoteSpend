import { ChangePassDTO } from "~/modules/changePass";
// import toastService from "../../services/toast/toast.service";
import create from 'zustand'

const ChangePassStore = create(set => ({

})
)

export default ChangePassStore
// export class ChangePassStore {
//     @bindProp isLoading = false;
//     @bindProp models = {
//         oldPass: "",
//         newPass: "",
//         rePass: "",
//         secureOldPass: true,
//         secureNewPass: true,
//         secureRePass: true,
//     }
//     @bindProp valid = {
//         messOldPass: "",
//         validOldPass: false,
//         messNewPass: "",
//         validNewPass: false,
//         messRePass: "",
//         validRePass: false,
//     }

//     @action
//     handleChangePass = async () => {
//         this.isLoading = true;
//         const { rePass, oldPass, newPass } = this.models;
//         try {
//             const body: ChangePassDTO.ChangePassDTO = {
//                 confirmNewPassword: rePass,
//                 currentPassword: oldPass,
//                 newPassword: newPass,
//             }
//             // const changeDto = await changePassModule.changePass(body);
//             // await AsyncStorage.setItem(KeyHeader.password, body.newPassword);

//             this.isLoading = false;
//             this.models.newPass = "";
//             this.models.oldPass = "";
//             this.models.rePass = "";
//             // toastService.success(changeDto.message);
//         } catch (error) {
//             // toastService.error(error.data.message);
//             this.isLoading = false;
//         }
//     }
// }
