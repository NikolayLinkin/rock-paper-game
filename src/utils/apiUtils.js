export const callApi = (url, options) => {
    return fetch(url, options)
        .then(
            res => res.json(),
            error => Promise.reject(error),
        )
        .then(
            json => json ? ({json}) : Promise.reject(json),
            error => ({error}),
        )
        .catch(
            error => ({error})
        )
};