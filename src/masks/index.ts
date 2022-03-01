function cepMask(cep: string) {
    cep = cep
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d{3})/g, "$1-$2")
        .substring(0, 9);
    return cep;
}

function cardNumberMask(number: string) {
    number = number
        .replace(/\D/g, "")
        .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/g, "$1 $2 $3 $4")
        .substring(0, 19);
    return number;
}

function textMask(text: string) {
    text = text.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "").toUpperCase();
    return text;
}

function monthYearMask(value: string) {
    value = value
        .replace(/\D/g, "")
        .replace(/(\d{2})/g, "$1")
        .substring(0, 2);
    return value;
}

function cvvMask(cvv: string) {
    cvv = cvv
        .replace(/\D/g, "")
        .replace(/(\d{2})/g, "$1")
        .substring(0, 3);
    return cvv;
}

export { cepMask, cardNumberMask, textMask, monthYearMask, cvvMask };
