import React from "react";

export const preview_data = (number, setPreviewData, setPopout, setIsValidNumber, setIsPreview, setErrorInfo, setActivePanel) => {
    setIsPreview(false)
    fetch(`https://data.gibdd-proverka.ru/check/auto/prerequest/?vin_grz=${number}&key=Yu8fJszHk4p73pvc`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if("error" in data) {
            setErrorInfo("Некорректный VIN или госномер")
            setIsValidNumber(false)
            setPopout(null)
        } else if ("not_found" in data) {
            setErrorInfo("По вашему запросу ничего не найдено")
            setIsValidNumber(false)
            setPopout(null)
        }else {
            setPreviewData(data)
            setPopout(null)
            setActivePanel("PreviewHistiry")
        }
    })
}

export const gibdd_history = (number, setGibddHistory, setPopout, setIsValidNumber, setActiveStory,  user_id = 0 ) => {
    let url = user_id === 0 ? `https://data.gibdd-proverka.ru/check/auto/?vin_grz=${number}&key=Dq4pEfzGk4p09cnv` : `https://data.gibdd-proverka.ru/check/auto/?vin_grz=${number}&key=Dq4pEfzGk4p09cnv&user_id=${user_id}`
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if("error" in data) {
                setIsValidNumber(false)
                setPopout(null)
            } else {
                setGibddHistory(data)
                setActiveStory('FullHistory')
                setPopout(null)
            }
        })

}

export const gibdd_history_ios = (number, setGibddHistory, setPopout, setIsValidNumber, setActivePanel, user_id = 0, mail, price ) => {
    let url = user_id === 0 ? `https://data.gibdd-proverka.ru/check/auto/?vin_grz=${number}&key=Dq4pEfzGk4p09cnv&ios=1&email=${mail}&price=${price}` : `https://data.gibdd-proverka.ru/check/auto/?vin_grz=${number}&key=Dq4pEfzGk4p09cnv&user_id=${user_id}&ios=1&email=${mail}&price=${price}`
    fetch(url)
        .then(function(response) {
            // return response.json();
        })
        .then(function(data) {
            // if("error" in data) {
            //     setIsValidNumber(false)
            //     setPopout(null)
            // } else {
            //     setGibddHistory(data)
            //     setActivePanel('FullHistory')
            //     setPopout(null)
            // }
        })

}

export const get_preview_report = (number, setPopout, setGibddHistory, setActiveStory) => {

    fetch(`https://data.gibdd-proverka.ru/check/auto/?vin_grz=${number}&key=Dq4pEfzGk4p09cnv`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            setGibddHistory(data)
            setActiveStory('FullHistory')
            setPopout(null)
        })
}

export const getPrice = (setPrice) => {
    fetch(`https://data.gibdd-proverka.ru/check/auto/const_data/?key=Dq4pEfzGk4p09cnv`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if("error" in data) {
            } else {
                setPrice(data.price)
            }
        })

}

export const getTerms = (setTerms) => {
    fetch(`https://data.gibdd-proverka.ru/check/auto/uterms/?key=Dq4pEfzGk4p09cnv&ios=1`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if("error" in data) {
            } else {
                setTerms(data.text)
            }
        })

}

export const old_history = ( user_id, setOldHistoryArr, setActivePanel, setPopout ) => {
    fetch(`https://data.gibdd-proverka.ru/check/auto/get_user_data/?key=Dq4pEfzGk4p09cnv&user_id=${user_id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if("error" in data) {
                // setIsValidNumber(false)
                setPopout(null)
            } else {
                setOldHistoryArr(data)
                setActivePanel('my-checks')
                setPopout(null)
            }
        })

}

export const SetOldHstoryPanel = ( user_id, setOldHistoryArr, setActivePanel, setPopout ) => {
    fetch(`https://data.gibdd-proverka.ru/check/auto/get_user_data/?key=Dq4pEfzGk4p09cnv&user_id=${user_id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if("error" in data) {
                // setIsValidNumber(false)
                setPopout(null)
            } else {
                setOldHistoryArr(data)
                setActivePanel('my-checks')
                setPopout(null)
            }
        })

}
