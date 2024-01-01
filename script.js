const api_key = "####"; // the api key from https://openweathermap.org, Current Weather Data API
const api_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // the url for the API
const weather_icon = document.querySelector(".weather-ico"); // Selects the weather icon image element


async function check_weather(){
    let city_input = document.querySelector('.search_bar input').value;
    const response = await fetch(api_url + city_input + '&appid='+ api_key);
    var data = await response.json();


    // Case where the user enters the name of a city that doesn't exist.
    if (data.cod== "404"){
        document.querySelector(".city_name").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = " ";
        document.querySelector(".humidity").innerHTML ="?%" ;
        document.querySelector(".wind").innerHTML = "? km/h";
        weather_icon.src = "./assets/images/question_mark.png"
    }

    else if(data.cod == "400"){
        document.querySelector(".city_name").innerHTML = " "
    }

    else if(data.cod == "401"){
        document.querySelector(".city_name").innerHTML = "API key is invalid"
        weather_icon.src = "./assets/images/wrong_key.png"

    }



    // Otherwise, processing takes place
    else{
        console.log(city_input);
        console.log(data);
        console.log((data.cod== "404"));
        document.querySelector(".city_name").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity+"%" ;
        document.querySelector(".wind").innerHTML = data.wind.speed+" km/h";

        // In the case that it is one of these
        let atmosphere_set = new Set(["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall", "Tornado"]);

        if (data.weather[0].main == "Clouds"){
            changeWeatherIcon("./assets/images/cloudy.png");
        }

        else if (data.weather[0].main == "Snow"){
            changeWeatherIcon("./assets/images/snowy.png");
        }

        else if (data.weather[0].main == "Rain"){
            changeWeatherIcon("./assets/images/rain.png");
        }

        else if (data.weather[0].main == "Drizzle"){
            changeWeatherIcon("./assets/images/drizzle.png");
        }

        else if (atmosphere_set.has(data.weather[0].main)){
            changeWeatherIcon("./assets/images/mist.png");
        }

        else if (data.weather[0].main == "Clear"){
            changeWeatherIcon("./assets/images/clear.png");
        }

        else if (data.weather[0].main == "Thunderstorm"){
            changeWeatherIcon("./assets/images/thunderstorm.png");
        }

    }
    
}



function changeWeatherIcon(iconSrc) {
    const weatherIcon = document.querySelector(".weather-ico");
    weatherIcon.style.opacity = '0'; // Fade out the icon
  
    setTimeout(function() {
      weatherIcon.src = iconSrc; // Change the icon source after fade out
  
      // Fade in the new icon after a slight delay
      setTimeout(function() {
        weatherIcon.style.opacity = '1'; // Fade in the new icon
      }, 1300);
    }, 900); // Delay to match the transition duration (0.5s = 500ms)
  }



// Only activate the function once the button is pressed
const myButton = document.getElementById('.search_bar button');
myButton.addEventListener('click',check_weather()) ;{
    check_weather();
    };