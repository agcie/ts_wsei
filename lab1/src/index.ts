import "./style.scss";
class Maths{
    public constructor(private nums: number[])
    {
        console.log(nums);
    }
    fill()
    {
        this.nums.sort();
        const sum = this.nums.reduce((a, b)=> a+b);
        document.querySelector("#min").innerHTML = this.nums[0].toString();
        document.querySelector("#max").innerHTML = this.nums[this.nums.length-1].toString();
        document.querySelector("#sum").innerHTML = sum.toString();
        document.querySelector("#avg").innerHTML = (sum/this.nums.length).toString();
    }

    del(int: number)
    {
        console.log(this.nums);
        const i = this.nums.find(el => el = int);
        this.nums.splice(i, i);
        console.log(this.nums);
    }
}
class Blocks{
    public constructor(private quantity: number) {
        this.cleanWorkingSpace();
        this.clearResults();
        this.createInputElements();
    }
    getMainContainer(): HTMLDivElement{
        return document.querySelector("#blocks");
}
    cleanWorkingSpace(){
        document.querySelector("#blocks").innerHTML = "";
    }
    createInputElements(){
        const space : HTMLDivElement = this.getMainContainer();
        for (let _i = 1; _i <= this.quantity; _i++) {
            let block = document.createElement("input");
            block.id = "block"+_i;
            space.appendChild(block);
            block.addEventListener("change", () => this.calculate());

            let del = document.createElement("button");
            del.id = "del"+_i;
            del.value = "del";
            space.appendChild(del);
            del.addEventListener("click", (e) => this.delete(e));
        }
    }
    delete( ev: MouseEvent){
        const id = (ev.target as HTMLInputElement).id.slice(3,4);
        const block = document.querySelector("#block"+id);
        const button = document.querySelector("#del"+id);
        const space : HTMLDivElement =this.getMainContainer();
        space.removeChild(block);
        space.removeChild(button);
        this.calculate();
    }
    isAllValuesNumber(): Boolean{
        const space : HTMLDivElement =this.getMainContainer();
        let result = true;
        for (let i = 0; i < space.children.length; i+=2) {
            if( Number.isNaN(parseInt((space.children[i] as HTMLInputElement).value)))
            {
                console.log(i);
                result = false;
            }
        }
        return result;
    }
    isAllInputFilled(): Boolean{
        const space : HTMLDivElement =this.getMainContainer();
        let result = true;
        for (let i = 0; i < space.children.length; i++) {
            if((space.children[i] as HTMLInputElement).value === (null || undefined || "")){
                result = false
            }
        }
        return result;
    }
    getAllValues(){
        let Arr : number[] = [];
        const space : HTMLDivElement =this.getMainContainer();
        for (let i = 0; i < space.children.length; i+=2) {
            Arr.push(parseInt((space.children[i] as HTMLInputElement).value));
        }
        return Arr;
    }
    clearResults(){
        document.querySelector("#min").innerHTML = "";
        document.querySelector("#max").innerHTML = "";
        document.querySelector("#sum").innerHTML = "";
        document.querySelector("#avg").innerHTML = "";
    }
    calculate(){
        this.clearResults();
        const boxes : HTMLDivElement = document.querySelector("#boxes");
        const numbers : HTMLDivElement = document.querySelector("#numbers");
        if (!this.isAllInputFilled()){
            boxes.innerHTML = "Not all input boxes are filled";
        }
        else{
            boxes.innerHTML = "";
            if (!this.isAllValuesNumber()){
                numbers.innerHTML = "Not all values are Numbers";
            }
            else
            {
                numbers.innerHTML = "";
                let mat = new Maths(this.getAllValues());
                mat.fill();
            }
        }

    }
}
class App{
    public constructor() {

        const quantity : HTMLInputElement = document.querySelector("#quantity");
        let blocks = new Blocks(+quantity.value);
        quantity.addEventListener("change", this.valueChanged);
    }
    valueChanged(this: HTMLElement, ev: Event){
        ev.preventDefault();
        const quantity = +(document.getElementById("quantity") as HTMLInputElement).value;
        console.log(quantity);
        let blocks = new Blocks(quantity);
    }
}

let start = new App();