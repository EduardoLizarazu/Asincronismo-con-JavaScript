

//Aqui la promesa se ejecuta al cargar el archivo
const somethingWillHappen = () => {
    /**
     * Param1: Se resuelve
     * Param2: Si no se resuelve 
    */
    return new Promise((resolve, reject) => {
        if (true) {
            resolve("Hey!");
        } else {
            reject("Whooooo!");
        }
    });
};

somethingWillHappen()
    .then(response => console.log(response)) // si lo resuelve
    .catch(err => console.error(err)); // si no lo resuelves


const somethingWillHappen2 = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            setTimeout(() => {
                resolve("True");
            }, 2000);
        } else {
            const error = new Error("Whoop!");
            reject(error);
        }
    });
};

somethingWillHappen2()
    .then(response => console.log(response))
    .then(() => console.log("hello")) // puedo encadenar then
    .catch(err => console.error(err));


// Va a iterar las dos promesas en un array
Promise.all([somethingWillHappen(), somethingWillHappen2()])
    .then(response => {
        console.log("array of result", response);
    })
    .catch(err => {
        console.error(err);
    });