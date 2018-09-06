

export default (url) => {
    return fetch(url)
        .then((response) => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code : ' +
                    response.status
                );

                return;
            }
            return response.json();
        })
        .then((jsonData) => {
            return jsonData;
        });
};