export function capitalizeFirstLetter(string) {
    string = normalizar(string)
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function normalizar(string) {

    string = string.replace('banios','baños');
    return string;
}