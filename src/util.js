import no_image from "./img/no_image.png";

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


export const getPhoto = (auto) => {
    if (getGibddHistoryDataArr(auto.preview,"image")) {
        return modifyUrl(auto.preview.image)
    } else if (auto.imgs && getGibddHistoryDataArr(auto.imgs, "status") && auto.imgs.status === 200 && auto.imgs.photo.length > 0){
        return modifyUrl(auto.imgs.photo[0].src)
    } else {
        return no_image
    }
}

export const getPhotoHistory = (auto) => {
    if (getGibddHistoryDataArr(auto.preview,"image")) {
        return modifyUrl(auto.preview.image)
    } else if (auto.imgs && getGibddHistoryDataArr(auto.imgs, "status") && auto.imgs.status === 200 && auto.imgs.photo.length > 0){
        return modifyUrl(auto.imgs.photo[0].src)
    } else {
        return false
    }
}

export const getYear = (gibddHistory) => {
    if (getGibddHistoryDataArr(gibddHistory.preview, "year")) {
        return ", " + gibddHistory.preview.year
    } else if (gibddHistory.history && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle,"year")) {
        return ", " + gibddHistory.history.gibdd_base.vehicle.year
    } else {
        return false
    }
}

export const getYearInfo = (gibddHistory) => {
    if (getGibddHistoryDataArr(gibddHistory.preview, "year")) {
        return gibddHistory.preview.year
    } else if (gibddHistory.history && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle,"year")) {
        return gibddHistory.history.gibdd_base.vehicle.year
    } else {
        return false
    }
}

export const getCategory = (gibddHistory) => {
    if (getGibddHistoryDataArr(gibddHistory.preview, "category")) {
        return gibddHistory.preview.category
    } else if (gibddHistory.history && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle,"category")) {
        return gibddHistory.history.gibdd_base.vehicle.category
    } else {
        return false
    }
}

export const getWheel = (gibddHistory) => {
    if (getGibddHistoryDataArr(gibddHistory.preview, "wheel")) {
        return gibddHistory.preview.wheel
    } else if (gibddHistory.history && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle,"wheel")) {
        return gibddHistory.history.gibdd_base.vehicle.wheel
    } else {
        return false
    }
}

export const getWeight = (gibddHistory) => {
    if (getGibddHistoryDataArr(gibddHistory.preview, "weight")) {
        return gibddHistory.preview.weight
    } else if (gibddHistory.history && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle,"weight")) {
        return gibddHistory.history.gibdd_base.vehicle.weight
    } else {
        return false
    }
}

export const getEngineVolume = (gibddHistory) => {
    if (getGibddHistoryDataArr(gibddHistory.preview, "capacity")) {
        return gibddHistory.preview.capacity
    } else if (gibddHistory.history && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "engine_volume")) {
        return gibddHistory.history.gibdd_base.vehicle.engine_volume
    } else {
        return false
    }
}

export const getEengineType = (gibddHistory) => {
    if (getGibddHistoryDataArr(gibddHistory.preview, "engine_type")) {
        return gibddHistory.preview.engine_type
    } else if (gibddHistory.history && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "engine_type")) {
        return gibddHistory.history.gibdd_base.vehicle.engine_type
    } else {
        return false
    }
}

export const newDateFormat = (date) => {
    return new Date(date).toLocaleString("ru-RU", {year: 'numeric', month: 'numeric', day: 'numeric'})
}
