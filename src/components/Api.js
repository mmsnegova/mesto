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

    patchAvatar(data){
        return fetch('https://mesto.nomoreparties.co/v1/cohort-44/users/me/avatar',{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar: data.avatar})
        })
        .then(res => {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
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

    createCard(data){
        return fetch('https://mesto.nomoreparties.co/v1/cohort-44/cards',{
            method: 'POST',
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


    deleteCard(id){
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-44/cards/${id} `,{
            method: 'DELETE',
            headers: this._headers,
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

    putLike(id, data){
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-44/cards/${id}/likes `,{
            method: 'PUT',
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
    deleteLike(id){
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-44/cards/${id}/likes `,{
            method: 'DELETE',
            headers: this._headers,
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