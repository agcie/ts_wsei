export class ApiHandler{


    private apiKey = '9fcbf0032afb2c9c309efe1a889d469d';
    private readonly citiesArr: string[];

    public constructor(cities:string[]){
        console.log("const");
        this.citiesArr = cities;
        this.createWeatherBlocks();
    }

    KtoC(val: number){
        return val - 273.15;
    }

    async getInfo(city: string): Promise<any> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();
        return weatherData;
    }

    createCityDiv(weatherData: any, city: string ){
        let place:HTMLDivElement =  document.querySelector("#weatherBlocks");
        let div = document.createElement("div");
        div.className = "weatherInfo";
        let h2 = document.createElement("h2");
        h2.innerHTML = city;
        let h4 = document.createElement("h4");
        h4.innerHTML = `{`+weatherData.coord.lon+`,`+weatherData.coord.lat+`}`;
        div.appendChild(h2);
        div.appendChild(h4);

        let innerHTML =`Weather:
        <br/>Temp{`+this.KtoC(weatherData.main.temp).toString().substr(0,5)+`C ,`+weatherData.main.temp+`K }
        <br/>Clouds: `+weatherData.clouds.all+`
        <br/>Wind{speed: `+weatherData.wind.speed+`, degree:`+weatherData.wind.deg+`}
        <br/> Visibility: `+weatherData.visibility.toString().substr(0,3)+` `;
        div.innerHTML +=innerHTML;

        place.appendChild(div);
    }

    createWeatherBlocks(){
        document.querySelector("#weatherBlocks").innerHTML = "";
        console.log("createWeatherBlocks");
        for(let city  of this.citiesArr){
            this.getInfo(city).then(res=>this.createCityDiv(res, city));
        }
    }

    addNewCity(city: string){
        console.log("addNewCity");
        this.citiesArr.push(city);
        this.getInfo(city).then(res=>this.createCityDiv(res, city));
    }

}