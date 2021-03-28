//creating the app object
const dateApp = {};

//creating the url and key variables and namespacing them to the app object
dateApp.apiUrl = "https://pixabay.com/api/";
dateApp.apiKey = "20890385-997b58abe422f53e03d97cdbf";

//where we will store the img array response
dateApp.imgArray = [];
dateApp.selectedPic = {};

//create a method to get the dataset from the api
dateApp.getPics = () => {
    //here we use the URL constructor to use our URL and set our search parameters to include in our endpoint
    const url = new URL(dateApp.apiUrl);
    url.search = new URLSearchParams({
        //passing in the api key
        key: dateApp.apiKey,
        //test query
        q: "toronto",
        //only one page of results
        page: 1
    })
    fetch(url)
        .then((response) => {
            //parse this response in JSON
            //return JSON response so that it can be used in the next function
            return response.json();
        })
        //wait for the JSOn response and log out readable data in json format
        .then((jsonResponse) => {
            //finally we use our built showPics method and pass it our readable json data as an parameter
            return jsonResponse;
        })
        .then((finalResponse) => {
            dateApp.randomPic(finalResponse);
        })
}

console.log(dateApp.selectedPic);





// here will be our function to display the img
dateApp.showPics = (picData) => {
    // querying the doc and find the first div
    const divOne = document.getElementsByClassName('localOne');
    // query to find the second div
    const divTwo = document.getElementsByClassName('localTwo');
    //for EACH object in the API we will:
    //const imgElement = document.createElement('img');
    //append the new child img element to the parent div
    //imgElement.src = picSelect.imageURL;
    //console.log(imgElement);
}




// function to obtain random img, it will iterate through the query result array
dateApp.randomPic = (dataResponse) => {
    //obtain total amount of hits
    let totalHits = dataResponse.total;
    //obtain array
    let results = dataResponse.hits;
    //as long as the array container has fewer items than the total amount of hits...
    while (dateApp.imgArray.length < totalHits) {
        // we will pick a random index number within the limits of how many hits we received
        let i = Math.floor(Math.random() * totalHits);
        // we will push these results to the array until we have ten items
        if (dateApp.imgArray < 10) {
            // here we are, pushing the results onto the globally declared array variable
            dateApp.imgArray.push = results[i];
        }
        // we return the new array
        return dateApp.imgArray;
    }

    console.log(results[0]);
}




//creating an init method
dateApp.init = () => {
    //first the function that gets pics
    dateApp.getPics();
    //then the function that queries the images with the user location input
    //then the function that selects a random one out of the results
    //then a function to insert that result into the img element
    //dateApp.resultTotal = dateApp.getPics.data[0].total;
    //console.log(dateApp.resultTotal);
}

//calling our init method to start the app
dateApp.init();