

export const preview_data = (number, setPreviewData, setPopout, setIsValidNumber) => {
    fetch(`https://data.gibdd-proverka.ru/check/auto/prerequest/?vin_grz=${number}&key=Yu8fJszHk4p73pvc`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if("error" in data) {
            setIsValidNumber(false)
            setPopout(null)
        } else {
            setPreviewData(data)
            setPopout(null)
        }
    })
}

export const gibdd_history = (number, setGibddHistory, setPopout, setIsValidNumber, setActivePanel) => {
    fetch(`https://data.gibdd-proverka.ru/check/auto/?vin_grz=${number}&key=Dq4pEfzGk4p09cnv`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if("error" in data) {
                setIsValidNumber(false)
                setPopout(null)
            } else {
                setGibddHistory(data)
                setActivePanel('FullHistory')
                setPopout(null)
            }
        })

}