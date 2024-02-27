function isPID(pid: string): boolean {
    if (pid.length < 9) {
        return false
    }

    let year = parseInt(pid.substring(0, 2), 10)
    let month = parseInt(pid.substring(2, 4), 10)
    const day = parseInt(pid.substring(4, 6), 10)

    if (pid.length === 9 && year < 54) {
        return true
    }

    let c = 0
    if (pid.length === 10) {
        c = parseInt(pid.substring(9, 10), 10)
    }

    let m = parseInt(pid.substring(0, 9), 10) % 11

    if (m === 10) {
        m = 0
    }

    if (m !== c) {
        return false
    }

    year += year < 54 ? 2000 : 1900

    if (month > 70 && year > 2003) {
        month -= 70
    } else if (month > 50) {
        month -= 50
    } else if (month > 20 && year > 2003) {
        month -= 20
    }

    if (month === 0 || month > 12) {
        return false
    }

    if (day === 0 || day > 31) {
        return false
    }

    return true
}

export default isPID
