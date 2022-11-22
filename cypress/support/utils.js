const randomString = () => {
    return Math.random().toString(36).substring(2);
}

const randomNumber = () => {
    return Math.floor((Math.random() * 100) + 1);
}

const currentDate = () => {
    return new Date().toJSON().slice(0, 10);
}

const getTomorrow = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return tomorrow.toJSON().slice(0, 10)
}

module.exports = {

    randomString,
    randomNumber,
    currentDate,
    getTomorrow
};

