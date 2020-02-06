
export const getGibddHistoryDataArr = (object, name) => {
    let arr = []
    if (object) {
        for (let key in object) (
            arr.push(key)
        )
    }
    if (name === "status") {
        return arr.includes(name) && object[name]
    }
    return arr.includes(name) && object[name] && object[name].length > 0
}

export const getCircleColor = (length) => {
    if (length > 2) {
        return 'red_circle'
    } else if (length === 2) {
        return 'yellow_circle'
    } else if (length === 1) {
        return 'green_circle'
    }
    return ""
}

export const damageClass = (arrDtp) => {
    let dtp= arrDtp.map((damage_points) => `V${damage_points} `)
    return dtp.join("")
}

export const modifyUrl = (url) => {
    if (url.indexOf("http:") != -1) {
        return "https" + url.slice(4)
    } else {
        return url
    }
}

export const getNewArrFines = (fines) => {
    let arr = []
    for (let i = 0; i < fines.length; i++) {
        if ('status' in fines[i] && fines[i].status === 1) {

        } else {
            arr.push(fines[i])
        }
    }
    return arr
}
