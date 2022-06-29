export default class UserInfo{
    constructor({name, about}){
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
    }

    getUserInfo(){
        this._userInfo = {
            name: this._name.textContent,
            about: this._about.textContent
        }
        return  this._userInfo;
    }

    setUserInfo(data){
        this._name.textContent = data.name;
        this._about.textContent = data.about;
    }
}