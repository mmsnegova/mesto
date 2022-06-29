export default class Api{
    constructor({baseUrl, headers}){
        this._baseUrl=baseUrl;
        this._headers=headers;
    }
    
    getInfo(){
        return fetch('https://mesto.nomoreparties.co/v1/cohort-44/users/me', {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    patchUserInfo(data){
        return fetch('https://mesto.nomoreparties.co/v1/cohort-44/users/me',{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    getCards(){
        return fetch('https://mesto.nomoreparties.co/v1/cohort-44/cards', {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

}