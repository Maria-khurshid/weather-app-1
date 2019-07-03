window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/da572ecda72849670cc20cd6780de730/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    //set DOm elements from API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //formula for calsius
                    let celsius = (temperature - 32) * (5 / 9);
                    //set icons
                    setIcons(icon, document.querySelector('.icon'));

                    //change temperature to celsius from farenheit
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    }


    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});

function newCity() {
    switch (locationTimezone.weather[0].main) {
        case value:
            'clear';
            document.body.style.backgroundImage = 'url"images\clear.jpg"';
            break;
        case value:
            'rain';
            document.body.style.backgroundImage = 'url"images\rain.jpg"';
            break;
        case value:
            'cloud';
            document.body.style.backgroundImage = 'url"images\cloud.jpg"';
            break;
        case value:
            'storm';
            document.body.style.backgroundImage = 'url"images\storm.jpg"';
            break;
        case value:
            'snow';
            document.body.style.backgroundImage = 'url"images\snow.jpg"';
            break;

        default:
            'default';
            document.body.style.backgroundImage = 'url"images\default.jpg"';
            break;
    }
}