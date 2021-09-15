export class LocalStorageCityHandler{
    private cityTab: string;

    public constructor(name:string){
        this.cityTab = name;
    }
    isNotNull(): boolean{
        if(localStorage.getItem(this.cityTab)){
            return true;
        }
        else{
            return false;
        }
    }
    getCityArray(): string[]{
        let tab: string[] = localStorage.getItem(this.cityTab).split("-");
        return tab;
    }

    addCityToArray(name: string): void{
        if(this.isNotNull()){
            let tab: string[] = localStorage.getItem(this.cityTab).split("-");
            tab.push(name);
            let newTabStrinigied: string = tab.join("-");
            localStorage.setItem(this.cityTab, newTabStrinigied);
        }
        else{
            localStorage.setItem(this.cityTab, name);
        }

    }
}