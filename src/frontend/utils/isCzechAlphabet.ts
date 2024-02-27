const isCzechAlphabet = (value: string) => {
    // Czech alphabet regex (excluding special characters)
    const czechAlphabetRegex = /^[a-zA-ZáčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ\s]+$/
    return czechAlphabetRegex.test(value)
}

export default isCzechAlphabet
