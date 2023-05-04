let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // reject('Error in the promise!');
        resolve('Everything is good in the promise!');
    }, 2000)
});


promise
    .then((resp) => {
        console.log(resp);
        return resp + ' I added this in the then 1';
    })
    .then((resp) => {
        console.log('Resp from then 2', resp);
    })
    .catch((err) => { 
        console.error(err) 
    });