//creating the app namespace
const app = {};

//creating the url and key variables and namespacing them to the app object
app.imgApiUrl = "https://pixabay.com/api/";
app.imgApiKey = "20890385-997b58abe422f53e03d97cdbf";

//where we will store the img array response
app.responseArray1 = [];
app.responseArray2 = [];
app.imgArray1 = [];
app.imgArray2 = [];


//HERE IS OUR INITAL SUBMIT
// event listeners for thedrop down
// app.submitImg1 = () => {
//     document.querySelector(`#cities1`).addEventListener('change', function() {
//         app.getPic1(this.value);
//     });
// }

// app.submitImg2 = () => {
//     document.querySelector(`#cities2`).addEventListener('change', function() {
//         app.query2 = this.value;
//     });
// }

//create a method to get the dataset from the api
app.getPic1 = (query) => {
    //here we use the URL constructor to use our URL and set our search parameters to include in our endpoint
    const url = new URL(app.imgApiUrl);
    url.search = new URLSearchParams({
        //passing in the api key
        key: app.imgApiKey,
        //test query
        q: query,
        //only one page of results
        category: "places",
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
            app.responseArray1 = jsonResponse;
            app.makeArray1(jsonResponse);
        })
}

app.getPic2 = (query) => {
    //here we use the URL constructor to use our URL and set our search parameters to include in our endpoint
    const url = new URL(app.imgApiUrl);
    url.search = new URLSearchParams({
        //passing in the api key
        key: app.imgApiKey,
        //test query
        q: query,
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
            app.responseArray2 = jsonResponse;
            app.makeArray2(jsonResponse);
        })
}



app.submitImg1 = () => {
    document.querySelector(`#cities1`).addEventListener('change', function() {
        app.showLocation1(this.value);
        app.getPic1(this.value);
    });
}

app.submitImg2 = () => {
        document.querySelector(`#cities2`).addEventListener('change', function() {
            app.getPic1(this.value);
        });

        app.showLocation1 = (locationValue) => {
            console.log(locationValue);
            const location1 = document.querySelector('#leftLocation');
            location1.innerHTML = `${locationValue}`
        }

        app.makeArray1 = (returnedArray1) => {
            // push the first 20 results onto the empty array
            const randomPic = Math.floor(Math.random() * 5);

            console.log(returnedArray1.hits[randomPic].largeImageURL);


            const divOne = document.querySelector('#localOne');
            divOne.innerHTML = '';
            //here we create the first img element
            const image1 = document.createElement('img');
            image1.src = returnedArray1.hits[randomPic].largeImageURL;

            //append the new child img element to the parent div
            divOne.appendChild(image1);
        }

        app.makeArray2 = (returnedArray2) => {
            // push the first 20 results onto the empty array
            const randomPic = Math.floor(Math.random() * 5);
            console.log(returnedArray2.hits[randomPic].largeImageURL);


            const divTwo = document.querySelector('#localTwo');
            divTwo.innerHTML = '';
            //here we create the first img element
            const image2 = document.createElement('img');
            image2.src = returnedArray2.hits[randomPic].largeImageURL;

            //append the new child img element to the parent div
            divTwo.appendChild(image2);
        }


        //function to obtain random image
        // app.randomPic1 = (newArray) => {
        //     let randomNum = Math.floor(Math.random() * 20);

        //     //app.showPic1(newArray[randomNum]);
        // }

        //app.randomPic2 = (array) => {
        //   let randomNum = Math.floor(Math.random() * 20);

        //   app.showPic2(array[randomNum]);
        //}



        // here will be our function to display the img
        //app.showPic1 = (imgObject1) => {
        // querying the doc and find the first div
        //const divOne = document.querySelector('#localOne');
        //divOne.innerHTML = '';
        //here we create the first img element
        //const image1 = document.createElement('img');
        //image1.src = imgObject1.webformatURL;

        //append the new child img element to the parent div
        //divOne.appendChild(image1);
        //imgElement.src = picSelect.imageURL;
        //console.log(imgElement);
        // console.log(divOne);
        // console.log(divTwo);
        //}

        // here will be our function to display the img
        app.showPic2 = (imgObject2) => {
            // query to find the second div 
            const divTwo = document.querySelector('#localTwo');
            divTwo.innerHTML = '';

            const image2 = document.createElement('img');
            image2.src = imgObject2.webformatURL;
            //append the new child img element to the parent div
            divTwo.appendChild(image2);
            //imgElement.src = picSelect.imageURL;
            //console.log(imgElement);
            // console.log(divOne);
            // console.log(divTwo);
        }

        app.getFirstImg = () => {
            // app.submitImg1();
            app.getPic1(app.query1);
            app.getPic2(app.query1);
            // app.makeArray1(app.responseArray1);
            // app.randomPic1(app.imgArray1);
        }

        //creating an init method
        //first the function that gets pics
        //then the function that queries the images with the user location input
        //then the function that selects a random one out of the results
        //then a function to insert that result into the img element


        /////////////////////////////////////////////////
        ////// ALL THE MOVIE CODE WILL GO HERE //////////
        /////////////////////////////////////////////////



        // movie api keys
        app.apiKey = "3e2bae0bdf207133adb310d92315a2ec";
        app.apiMovie = "https://api.themoviedb.org/3/movie/popular"

        // gets the movies to display based on a popular list
        app.getMovie = () => {
            for (let i = 1; i <= 20; i++) {
                const movieUrl = new URL(app.apiMovie);
                movieUrl.search = new URLSearchParams({
                    api_key: app.apiKey,
                    page: i
                })
                fetch(movieUrl)
                    .then((x) => {
                        return x.json();
                    })
                    .then((list0fMovies) => {
                        app.displayMovies(list0fMovies.results);
                    })
            }
        }

        //Get the data of the movie and populates options dropdown
        app.displayMovies = (movieData) => {
            const select = document.querySelector('select');
            let counter = 0;
            movieData.forEach((movieObject) => {
                if (counter <= 19) {
                    const optionElement = document.createElement("option");
                    optionElement.value = movieData[counter].poster_path;
                    optionElement.innerHTML = movieData[counter].original_title;
                    select.appendChild(optionElement);
                }
                counter += 1;
            })
        }




        app.showFinal = () => {
            const movieSubmit = document.getElementById('finalBtn');
            const final = document.getElementById("final");
            const initial = document.getElementById("initial");
            movieSubmit.addEventListener('click', function(event) {
                const selected = document.getElementById("movieList");
                const inputValue = selected.value;
                const imgElement = document.getElementById("poster")
                imgElement.src = `https://image.tmdb.org/t/p/w400/${inputValue}`;
                final.style.display = "block";
                final.style.animation = "showup 3.6s ease-in-out forwards";
                initial.style.display = "none";
                movieSubmit.style.display = 'none'
                const personLeft = document.getElementById("personLeft");
                const personRight = document.getElementById("personRight");
                const pink = document.getElementById("pink");
                const blue = document.getElementById("blue");
                blue.style.animation = "slidingChair  3.6s ease-in-out forwards";
                pink.style.animation = "slidingChair  3.6s ease-in-out forwards";
                personLeft.style.animation = "slidingPerson  3.6s ease-in-out forwards";
                personRight.style.animation = "slidingPersonRight  3.6s ease-in-out forwards";
            });
        }


        // initializing fetch api to get data
        app.init = () => {
            app.getMovie();
            app.getFirstImg();
            app.showFinal();
            app.submitImg1();
        }

        app.init();