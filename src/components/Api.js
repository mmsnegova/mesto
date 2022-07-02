export default class Api{
    constructor({baseUrl, headers}){
        this._baseUrl=baseUrl;
        this._headers=headers;
    }

    _handleResponse(res){
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    handleError(err){
        console.log(err);
    }
    
    getInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'GET',
                headers: this._headers
            })
            .then(res => this._handleResponse(res))
    }

    patchUserInfo(data){
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(res => this._handleResponse(res))
    }

    patchAvatar(data){
        return fetch(`${this._baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar: data.avatar})
        })
        .then(res => this._handleResponse(res))
    }

    getCards(){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => this._handleResponse(res))
    }

    createCard(data){
        return fetch(`${this._baseUrl}/cards`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(res => this._handleResponse(res))
    }


    deleteCard(id){
        return fetch(`${this._baseUrl}/cards/${id} `,{
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => this._handleResponse(res))
    }

    putLike(id, data){
        return fetch(`${this._baseUrl}/cards/${id}/likes `,{
            method: 'PUT',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then(res => this._handleResponse(res))
    }

    deleteLike(id){
        return fetch(`${this._baseUrl}/cards/${id}/likes `,{
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => this._handleResponse(res))
    }
}