export class RequestError extends Error {
    constructor(message, response) {
        super(message);
    }
}


export class RequestErrorJSON extends Error {
    constructor(message){
        super(message);
    }
}

export function getHeaders() {
    let windowHeaders = {};
    return windowHeaders;
}

export function get(url, headers) {
    headers = Object.assign({}, getHeaders(), headers);
    return fetch(url, {
        method: 'GET',
        headers: headers,
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.status != 200){
            throw new RequestError(res.statusText, res);
        }
        return res;
    });
}


export function post(url, headers, json) {
    let body = '';
    headers = Object.assign({}, getHeaders(), headers);

    if(json) {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(json);
    }

    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
        credentials: 'same-origin'
    })
    .then(res => {
        if(res.status != 200){
            throw new RequestError(res.statusText, res);
        }
        return res;
    });
}


export function getJSON(url, headers) {
    return get({url, headers})
    .then(res => res.json())
    .catch((err) => {
        return err.response.json()
        .then(errorJSON => {
            throw new RequestErrorJSON(errorJSON);
        });
    });
}

export function postJSON(url, headers, json) {
    return post(url, headers, json)
    .then(res => res.json())
    .catch((err) => {
        return err.response.json()
        .then(errorJSON => {
            throw new RequestErrorJSON(errorJSON);
        });
    });
}
