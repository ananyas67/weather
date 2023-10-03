function setup(){
    let lat, lon;
    if ("geolocation" in navigator) {
        console.log("geolocation available");
        navigator.geolocation.getCurrentPosition(async (position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById("latitude").textContent = lat;
            document.getElementById("longitude").textContent = lon;
            
            const wmo = await fetch("/wmo");
            const wmo_json = await wmo.json();
            
            const api_url = `/w/${lat},${lon}`;

            const response = await fetch(api_url);
            const json = await response.json();
            const cond = await json.hourly.weathercode[12];
            const text = await wmo_json[cond];
            const temp = await json.hourly.temperature_2m[12];

            document.getElementById('summary').textContent = text;
            document.getElementById('temperature').textContent = temp;
            
            const cond2 = await json.hourly.weathercode[36];
            document.getElementById('summary2').textContent = wmo_json[cond2];
            document.getElementById('temperature2').textContent = json.hourly.temperature_2m[36];
            
            const cond3 = await json.hourly.weathercode[60];
            document.getElementById('summary3').textContent = wmo_json[cond3];
            document.getElementById('temperature3').textContent = json.hourly.temperature_2m[60];
            
            const cond4 = await json.hourly.weathercode[84];
            document.getElementById('summary4').textContent = wmo_json[cond4];
            document.getElementById('temperature4').textContent = json.hourly.temperature_2m[84];
            
            const cond5 = await json.hourly.weathercode[108];
            document.getElementById('summary5').textContent = wmo_json[cond5];
            document.getElementById('temperature5').textContent = json.hourly.temperature_2m[108];
            
            const cond6 = await json.hourly.weathercode[132];
            document.getElementById('summary6').textContent = wmo_json[cond6];
            document.getElementById('temperature6').textContent = json.hourly.temperature_2m[132];
            
            const cond7 = await json.hourly.weathercode[156];
            document.getElementById('summary7').textContent = wmo_json[cond7];
            document.getElementById('temperature7').textContent = json.hourly.temperature_2m[156];
            console.log(json);

            const data = { lat, lon, cond, temp };
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(data),
            };
            const db_response = await fetch("/api", options);
            const db_json = await db_response.json();
            console.log(db_json);
        });
    } else {
        console.log("geolocation not available");
    }
} 
