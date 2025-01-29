window.onload = wetterTime("Hamburg");
const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
);

function wetterParse(wetterJSON){
    let main = wetterJSON.main;
    let weather = wetterJSON.weather[0];
    let sys = wetterJSON.sys;
    console.log(weather);

    showIcon(weather.icon)
    showTemp(main.temp);
    showTempMax(main.temp_max);
    showTempMin(main.temp_min);
    showCity(wetterJSON.name)
    showDesc(weather.description);
    showHumidity(main.humidity);
    showCountry(sys.country);


}


function showIcon(message){
    document.getElementById('icon').src = "https://openweathermap.org/img/wn/" + message + "@2x.png"

}

function showTemp(message){
    document.getElementById('Temp').textContent = message  + "°C" ;
}

function showTempMax(message){
    document.getElementById('TempMax').textContent = "Max: " + message + "°C";
}

function showTempMin(message){
    document.getElementById('TempMin').textContent = "Min: " + message + "°C";
}

function showCity(message){
    document.getElementById('City').textContent = message;
}

function showDesc(message){
    document.getElementById('Desc').textContent = message;
}

function showHumidity(message){
    document.getElementById('Humidity').textContent = "Humidity: " + message + "%";
}

function showCountry(message){
    try{
        document.getElementById('country').textContent = regionNames.of(message);
    }catch(error){
        document.getElementById('country').textContent = message;
        console.log(error)
    }
}

function wetterTime(city){
        let cityInput = city.toLowerCase();
        let from = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=c1e2120945a0c1d7a5ca12a57d5f4179&units=metric";
        let url = new URL(from);

        fetch(url)
        .then(res => res.json())
        .then(out => wetterParse(out))
        .catch(err => { 
            console.log(err);
            alert(city + " is not a city! \nPlease type in an actual city name! \nCheck if you've made a typo! :) ");
            return true;
         }); 

         getMoonSun(cityInput);

    }

function getMoonSun(city){
    let cityInput = city.toLowerCase();
    let from = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + cityInput + "/?unitGroup=us&" +
                            "key=FRFSZPNB6GVU3VGLT993BHSXS&include=days&elements=datetime,moonphase,moonrise,moonset,sunrise,sunset&contentType=json"
    let url = new URL(from);

    fetch(url)
    .then(res => res.json())
    .then(out => moonSunParse(out))
    .catch(err => { 
         console.log(err);
    }); 
}

function moonSunParse(moonSunJSON){
    let moonSun = moonSunJSON.days[0];

    showMoonSet(moonSun.moonset)
    showMoonRise(moonSun.moonrise)
    showMoonphase(moonSun.moonphase)

    showSunSet(moonSun.sunset)
    showSunRise(moonSun.sunrise)

}

function calculateMoonPhase(message){
    let mess = message + "";
    const moonValueString = mess;

    if (mess.includes('.')){
        moonValueString = mess.split('.')[1];
    }
    
    console.log("Moonvalue: " + moonValueString);
    let moonValue = parseInt(moonValueString);
    let moonString = "";
    

    switch(true){
        case(moonValue <= 0):
            moonString = "New Moon";
            break;
        case(moonValue < 25):
            moonString = "Waxing Cresent";
            break;
        case(moonValue == 25):
            moonString = "First Quarter";
            break;
        case(moonValue < 50):
            moonString = "Waxing Gibbous";
            break;
        case(moonValue == 50):
            moonString = "Full Moon";
            break;
        case(moonValue < 75):
            moonString = "Waning Gibbous";
            break;
        case(moonValue == 75):
            moonString = "Last Quarter";
            break;
        case(moonValue <= 100):
            moonString = "Waning Cresent";
            break;
        default:
            moonString = "No Data"
        
    }
    return moonString;
}



function showMoonSet(message){
    document.getElementById('moonSet').textContent = "Moon set: " + message;
}

function showMoonRise(message){
    document.getElementById('moonRise').textContent = "Moon rise: " + message;
}

function showMoonphase(message){
    let moonPhase = calculateMoonPhase(message);
    document.getElementById('moonPhase').textContent = "Moon phase: " + moonPhase;
}

function showSunSet(message){
    document.getElementById('sunSet').textContent = "Sun set: " + message;
}

function showSunRise(message){
    document.getElementById('sunRise').textContent = "Sun rise: " + message;
}




    
const butt = document.getElementById('change');
butt.addEventListener('click',function(){
    let cityInput = document.getElementById('cityInput').value;
    console.log(cityInput);
    wetterTime(cityInput);

});

