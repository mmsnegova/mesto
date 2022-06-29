export default class Api{
    constructor({baseUrl, headers}){
        this._baseUrl=baseUrl;
        this._headers=headers;
    }
    
    getInfo(){
        return fetch('https://mesto.nomoreparties.co/v1/cohort-44/users/me', {
            method: 'GET',
            headers: {
                authorization: '6858ce5a-0ca5-4508-bf3e-e6a0c057ab0d'
            }
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
            headers: {
              authorization: '6858ce5a-0ca5-4508-bf3e-e6a0c057ab0d'
            }
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