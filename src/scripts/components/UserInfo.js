//изменяет информацию о пользователе на странице
export class UserInfo {
  constructor ({name, info}){
    this._name = name;
    this._info = info;
  }
  getUserInfo() {
    this._userData = {};
    this._userData.name = this._name.textContent;
    this._userData.info = this._info.textContent;

    return this._userData;
  }
  setUserInfo(newData) {
    this._name.textContent = newData.name;
    this._info.textContent = newData.info;
  }
}