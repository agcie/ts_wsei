

import {LocalStorageCityHandler} from './localStorageCityHandler'
import {ApiHandler} from './apiHandler'
export class App{
    private storageHandler: LocalStorageCityHandler;
    private apiHandler: ApiHandler;

    public constructor(){
        document.addEventListener('keypress', this.onKeyPress);
        this.storageHandler= new LocalStorageCityHandler("cities2");
        if(this.storageHandler.isNotNull()){
            this.apiHandler= new ApiHandler(this.storageHandler.getCityArray());
        }

    }

    onKeyPress(ev: KeyboardEvent): void{
        if(ev.key == 'Enter'){
           let nameOfCity :  HTMLInputElement= document.querySelector("#city");
           let name: string = nameOfCity.value;
           if(name){
            let storageHandler2= new LocalStorageCityHandler("cities2");
            if(storageHandler2.isNotNull()){
                let apiHandler2= new ApiHandler(storageHandler2.getCityArray());
                storageHandler2.addCityToArray(name);
                console.log(name);
                apiHandler2.addNewCity(name);
                console.log(storageHandler2.getCityArray());
            }

            else{
                storageHandler2.addCityToArray(name);
                let apiHandler2= new ApiHandler(storageHandler2.getCityArray());
                apiHandler2.addNewCity(name);
            }

           }
           else{
               console.log("Name city empty");
           }

        }
    }
}