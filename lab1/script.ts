class idk{

    constructor(){
        const button = document.getElementById("generate");
        button.addEventListener("click", ()=> this.generate());
    }
    generate(){

        const quantity = +(document.getElementById("quantity") as HTMLInputElement).value;
        console.log(quantity);
        const cont = document.getElementById("container");
        for(let i = 1; i<=quantity; i++){
            let newInp = document.createElement("input");
            newInp.id="inputValue"+i;
            cont.appendChild(newInp);
        }
        let buttonEl = document.createElement("button");
        buttonEl.innerHTML = "Calculate";
        buttonEl.addEventListener("click", ()=> this.calculateAndShow(quantity));
        cont.appendChild(buttonEl);
    }
    sum( arr: Array<number>): number{
        let sum = 0;
        arr.forEach(element => {
            sum+=element;
        });
        return sum;
    }
    avg( arr: Array<number>): number{
        let sum = 0;
        arr.forEach(element => {
            sum+=element;
        });
        return sum/arr.length;
    }
    min( arr: Array<number>): number{
        let _min =arr[0];
        arr.forEach(element => {
            if(element<_min){
                _min = element;
            }
        });
        return _min;
    }
    max( arr: Array<number>): number{
        let _min =arr[0];
        arr.forEach(element => {
            if(element>_min){
                _min = element;
            }
        });
        return _min;
    }

    calculateAndShow(quantity: number){
        let varr = new Array();
        console.log(quantity);
        for(let i = 1; i<=quantity; i++){
            let valData = (document.getElementById("inputValue"+i) as HTMLInputElement).value;
            //console.log(valData);
            varr.push(+valData)
        }
        const _sum = this.sum(varr);
        let sumBox = (document.getElementById("sum") as HTMLInputElement);
        sumBox.value = _sum.toString();

        const _min = this.min(varr);
        let minBox = (document.getElementById("min") as HTMLInputElement);
        minBox.value = _min.toString();

        const _max = this.max(varr);
        let maxBox = (document.getElementById("max") as HTMLInputElement);
        maxBox.value = _max.toString();

        const _avg = this.avg(varr);
        let avgBox = (document.getElementById("avg") as HTMLInputElement);
        avgBox.value = _avg.toString();
    }

}
let obj = new idk();
