export class ApiHandler{


    private apiKey = '9fcbf0032afb2c9c309efe1a889d469d';
    private citiesArr: string[];

    public constructor(cities:string[]){
        console.log("const");
        this.citiesArr = cities;
        this.createWeatherBlocks();
    }

    KtoC(val: number){
        return val - 273.15;
    }

    async createWeatherDiv(city: string): Promise<any> {
        console.log("createWeatherDiv" + city);
        let place:HTMLDivElement =  document.querySelector("#weatherBlocks");
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();
        console.log(weatherData);
        let WeatherDiv= `<div class="weatherInfo"><h2>`+city+`</h2> 
        <h4>{`+weatherData.coord.lon+`,`+weatherData.coord.lat+`}</h4>
        Weather:
        <br/>Temp{`+this.KtoC(weatherData.main.temp).toString().substr(0,5)+`C ,`+weatherData.main.temp+`K }
        <br/>Clouds: `+weatherData.clouds.all+`
        <br/>Wind{speed: `+weatherData.wind.speed+`, degree:`+weatherData.wind.deg+`}
        <br/> Visibility: `+weatherData.visibility.toString().substr(0,3)+` 
        `;
        place.innerHTML +=WeatherDiv;
    }
    createWeatherBlocks(){
        document.querySelector("#weatherBlocks").innerHTML = "";
        console.log("createWeatherBlocks");
        for(let city  of this.citiesArr){
            this.createWeatherDiv(city);
        }
    }
    addNewCity(city: string){
        console.log("addNewCity");
        this.citiesArr.push(city);

    }

}