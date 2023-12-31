/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-11-18 21:16:57
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-11-18 21:20:06
 */
import {request} from '../utils/request';
import {flow} from 'mobx';
import {save} from '../utils/Storage';
import Loading from '../components/widget/Loading';

class UserStore {
  userInfo: any;

  // requestLogin = async (phone: string, pwd: string, callback: (success: boolean) => void) => {
  //     try {
  //         const params = {
  //             name: phone,
  //             pwd: pwd,
  //         };
  //         const { data } = await request('login', params);
  //         if (data) {
  //             this.userInfo = data;
  //             callback?.(true);
  //         } else {
  //             this.userInfo = null;
  //             callback?.(false);
  //         }
  //     } catch (error) {
  //         console.log(error);
  //         this.userInfo = null;
  //         callback?.(false);
  //     }
  // };

  requestLogin = flow(function* (
    this: UserStore,
    phone: string,
    pwd: string,
    callback: (success: boolean) => void,
  ) {
    Loading.show();
    try {
      const params = {
        name: phone,
        pwd: pwd,
      };
      const {data} = yield request('login', params);
      if (data) {
        save('userInfo', JSON.stringify(data));
        this.userInfo = data;
        callback?.(true);
      } else {
        this.userInfo = null;
        callback?.(false);
      }
    } catch (error) {
      console.log(error);
      this.userInfo = null;
      callback?.(false);
    } finally {
      Loading.hide();
    }
  });
}

// ESM单例导出
export default new UserStore();
