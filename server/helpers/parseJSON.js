const jsonParse = (jsonString) => {
    return jsonString.map(element => JSON.parse(element))
}

module.exports = jsonParse