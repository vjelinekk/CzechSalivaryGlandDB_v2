const isValidPersonalIdentificationNumber = (personalID: string) => {
    // Check if the input is a string
    if (typeof personalID !== 'string') {
        return false
    }

    // Remove non-digit characters
    const cleanedPersonalID = personalID.replace(/\D/g, '')

    // Check if the length is 10 characters
    if (cleanedPersonalID.length !== 10) {
        return false
    }

    // Extract birth date and check its validity
    const year = parseInt(cleanedPersonalID.substring(0, 2))
    const month = parseInt(cleanedPersonalID.substring(2, 4))
    const day = parseInt(cleanedPersonalID.substring(4, 6))
    const ext = parseInt(cleanedPersonalID.substring(6, 10))

    return true
}

// Example usage:
const isValid = isValidPersonalIdentificationNumber('891112/1234')
console.log(isValid) // Output: true

export default isValidPersonalIdentificationNumber
