const app = {};

app.imgApiUrl = "https://pixabay.com/api/";
app.imgApiKey = "20890385-997b58abe422f53e03d97cdbf";

app.responseArray1 = [];
app.responseArray2 = [];
app.imgArray1 = [];
app.imgArray2 = [];

app.getPic1 = (query) => {
    const url = new URL(app.imgApiUrl);
    url.search = new URLSearchParams({
        key: app.imgApiKey,
        q: query,
        category: "places",
        order: "popular",
        page: 1
    })
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            app.responseArray1 = jsonResponse;
            app.makeArray1(jsonResponse);
        })
}

app.getPic2 = (query) => {
    const url = new URL(app.imgApiUrl);
    url.search = new URLSearchParams({
        key: app.imgApiKey,
        q: query,
        page: 1
    })
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
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
        app.showLocation2(this.value);
        app.getPic2(this.value);
    });
}

app.showLocation1 = (locationValue) => {
    const location1 = document.querySelector('#leftLocation');
    location1.innerHTML = `${locationValue}`
}

app.showLocation2 = (locationValueTwo) => {
    const location2 = document.querySelector('#rightLocation');
    location2.innerHTML = `${locationValueTwo}`
}


app.makeArray1 = (returnedArray1) => {
    const randomPic = Math.floor(Math.random() * 5);
    const divOne = document.querySelector('#localOne');
    divOne.innerHTML = '';
    const image1 = document.createElement('img');
    image1.src = returnedArray1.hits[randomPic].largeImageURL;
    divOne.appendChild(image1);
}

app.makeArray2 = (returnedArray2) => {
    const randomPic = Math.floor(Math.random() * 5);
    const divTwo = document.querySelector('#localTwo');
    divTwo.innerHTML = '';
    const image2 = document.createElement('img');
    image2.src = returnedArray2.hits[randomPic].largeImageURL;
    divTwo.appendChild(image2);
}



app.showPic2 = (imgObject2) => {
    const divTwo = document.querySelector('#localTwo');
    divTwo.innerHTML = '';

    const image2 = document.createElement('img');
    image2.src = imgObject2.webformatURL;
    divTwo.appendChild(image2);
}

app.getFirstImg = () => {
    app.getPic1(app.query1);
    app.getPic2(app.query1);
}

app.apiKey = "3e2bae0bdf207133adb310d92315a2ec";
app.apiMovie = "https://api.themoviedb.org/3/movie/popular"


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

app.init = () => {
    app.getMovie();
    app.getFirstImg();
    app.showFinal();
    app.submitImg1();
    app.submitImg2();
}

app.init();