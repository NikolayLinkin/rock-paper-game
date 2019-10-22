export const callApi = (url, options) => {
    return fetch(url, options)
        .then(
            response => response.ok ? response.json() : Promise.reject(response),
            error => Promise.reject(error),
        )
        .then(
            json => json ? json : Promise.reject(json),
            error => ({error}),
        )
        .catch(
            error => ({error})
        )
};