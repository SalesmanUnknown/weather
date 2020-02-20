window.addEventListener('load', ()=>{

    let long;
    let lat;
    let temperatureDesc = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/c2c3822d96e1ade6555a1f481bdbb939/${lat},${long}`;        
        
            fetch(api)
            .then(data =>{
                return data.json();
            })
            .then(res =>{
                const {temperature, summary, icon} = res.currently;
                let celsius = (temperature-32)*5;
                celsius = celsius/9;
                //set dom elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDesc.textContent = summaryToNormal(summary);
                locationTimeZone.textContent = res.timezone;
                // set icon
                setIcons(icon, document.querySelector('.icon'));
                
                //chng tmp to celsius
                temperatureSection.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else{
                        temperatureDegree.textContent = temperature;
                        temperatureSpan.textContent = "F";
                    }
                });
            });
        });

    } 

    function setIcons(icon, iconid){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconid, Skycons[currentIcon]);
    }

    function summaryToNormal(cast){

        var text = "";

        switch(cast){

            case "Clear":
                text = "Cisto";
                break;
            case "Clear throughout the day.": 
                text = "Cisto tokom dana";
                break;
            case "Partly cloudy throughout the day.":
                text = "Djelimicno oblacno tokom dana";
                break;
            case "Mostly cloudy throughout the day.":
                text= "Uglavnom oblacno tokom dana";
                break;
            case "No precipitation throughout the week.":
                text="Bez padavina tokom dana";
                break;
            case "Partly Cloudy":
                text="Djelimicno oblacno";
                break;
            case "Mostly Cloudy":
                text="Uglavnom oblacno";
                break;
            case "Overcast":
                text = "Oblacno";
                break;
        }

        return text;
    }

});