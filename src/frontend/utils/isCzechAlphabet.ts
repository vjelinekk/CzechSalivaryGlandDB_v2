const isCzechAlphabet = (value: string) => {
    // Czech alphabet regex (excluding special characters)
    const czechAlphabetRegex = /^[a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ\s]+$/
    // If first is uppercase and regex test is true, return true
    if (value[0] !== value[0].toUpperCase()) {
        return false
    }

    return czechAlphabetRegex.test(value)
}

export default isCzechAlphabet
