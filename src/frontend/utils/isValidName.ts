const isValidName = (value: string) => {
    if (value === '') {
        return false
    }

    if (/\d/.test(value)) {
        return false
    }

    // If first is uppercase and regex test is true, return true
    if (value[0] !== value[0].toUpperCase()) {
        return false
    }

    return true
}

export default isValidName
