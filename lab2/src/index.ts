import "./style.scss";
const channel1: any[] =[];
const channel2: any[] = [];
let channelStates: boolean[]=[false, false];
let dateThen:any;


function makeNoise(key:string){
    let sound: HTMLAudioElement  = document.querySelector('[data-sound="'+key+'"]');

    sound.currentTime = 0;
    sound.play();
}

class CliksHandler{
    
    appStart() {
        dateThen = Date.now();
        document.addEventListener('keypress', this.onKeyPress);  
        for(let letter of ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']){
            let letterButton = document.querySelector('[data-button='+letter+']');
            letterButton.addEventListener('click', ()=>this.onClickButton(letter));
        }
            let recordButton = document.querySelector('[data-rec=a'+1+']');
            recordButton.addEventListener('click', ()=>this.onClickRec(1));
            recordButton = document.querySelector('[data-rec=a'+0+']');
            recordButton.addEventListener('click', ()=>this.onClickRec(0));


            let playChannel = document.querySelector('[data-channelplay=a'+0+']');
            playChannel.addEventListener('click',  ()=>this.onPlayChannel(0));     
            playChannel = document.querySelector('[data-channelplay=a'+1+']');
            playChannel.addEventListener('click',  ()=>this.onPlayChannel(1));

    }
     onPlayChannel(i:any): void {
         if(i==0){
            channel1.forEach(sound => {
                setTimeout(() => makeNoise(sound.key), sound.time)
            })
         }
         else{
            channel2.forEach(sound => {
                setTimeout(() => makeNoise(sound.key), sound.time)
            })
         }
 
    }
    onClickRec(i:any): void{
        if(channelStates[i]==false){
            channelStates[i]=true;
            let recordButton : HTMLButtonElement = document.querySelector('[data-rec=a'+i+']');
            recordButton.innerHTML = "stop";
        }
        else{
            channelStates[i]=false;
            let recordButton : HTMLButtonElement = document.querySelector('[data-rec=a'+i+']');
            recordButton.innerHTML = "Record on channel"+(i+1);
        }
    }

     onClickButton(key: any): void{
        let time =  Date.now() - dateThen ;
        if(channelStates[0]==true) channel1.push( { key, time });
        if(channelStates[1]==true) channel2.push({key, time});
        makeNoise(key);
    }
    
     onKeyPress(ev: KeyboardEvent): void {
        const key = ev.key;
        const time = ev.timeStamp;
        if(channelStates[0]==true)
        {
            channel1.push( { key, time });
            console.log(channel1);
        }
        if(channelStates[1]==true) {
            channel2.push({key, time});
            console.log(channel2);
        }
        makeNoise(key);
    }
}


let app = new CliksHandler();
app.appStart();