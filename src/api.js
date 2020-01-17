

const preview_data = () = {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=5')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        if(data.success) {
            // process success response
        } else {
            // proccess server errors
        }
    })
}

const gibdd_history = () = {

}