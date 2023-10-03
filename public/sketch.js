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
            const text2 = await wmo_json[cond2];
            const temp2 = await json.hourly.temperature_2m[36];
            document.getElementById('summary2').textContent = text2;
            document.getElementById('temperature2').textContent = temp2;
            
            const cond3 = await json.hourly.weathercode[60];
            const text3 = await wmo_json[cond3];
            const temp3 = await json.hourly.temperature_2m[60];
            document.getElementById('summary3').textContent = text3;
            document.getElementById('temperature3').textContent = temp3;
            
            const cond4 = await json.hourly.weathercode[84];
            const text4 = await wmo_json[cond4];
            const temp4 = await json.hourly.temperature_2m[84];
            document.getElementById('summary4').textContent = text4;
            document.getElementById('temperature4').textContent = temp4;
            
            const cond5 = await json.hourly.weathercode[108];
            const text5 = await wmo_json[cond5];
            const temp5 = await json.hourly.temperature_2m[108];
            document.getElementById('summary5').textContent = text5;
            document.getElementById('temperature5').textContent = temp5;
            
            const cond6 = await json.hourly.weathercode[132];
            const text6 = await wmo_json[cond6];
            const temp6 = await json.hourly.temperature_2m[132];
            document.getElementById('summary6').textContent = text6;
            document.getElementById('temperature6').textContent = temp6;
            
            const cond7 = await json.hourly.weathercode[156];
            const text7 = await wmo_json[cond7];
            const temp7 = await json.hourly.temperature_2m[156];
            document.getElementById('summary7').textContent = text7;
            document.getElementById('temperature7').textContent = temp7;
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

            const out = {
                "condition":{text, text2, text3, text3, text4, text5, text6, text7},
                "temperature":{temp, temp2, temp3, temp4, temp5, temp6, temp7}
            };
            console.log(out);
            const option = {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(out),
            }
            const out_res = await fetch("/out", option);
        });
    } else {
        console.log("geolocation not available");
    }
} 
