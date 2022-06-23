
let ml = [$('#m1'), $('#m2'), $('#m3')];
let cl = [$('#c1'), $('#c2'), $('#c3')];
mr=[]
cr=[]
let left = true;


let RiverBank = {
    humans: 3,
    ghosts: 3,
    boat: true
}

let Destination = {
    humans: 0,
    ghosts: 0,
    boat: false
}

function check(val) {
    let b1 = document.getElementsByClassName('btn');
    for (x of b1) {
        if (['h', 'hg'].includes(x.classList[4])) {
            if (val.humans == 0) {
                x.disabled = true
            }
            else if (!(parseInt(x.classList[3]) <= val.humans)) {
                x.disabled = true
            }
            else {
                x.disabled = false
            }

        }
        else {
            x.disabled = false
        }
    }
    for (x of b1) {
        if (['g', 'hg'].includes(x.classList[4])) {
            if (val.ghosts == 0) {
                x.disabled = true
            }
            else if (!(parseInt(x.classList[3]) <= val.ghosts)) {
                x.disabled = true
            }
        }
    }

}

function minimax() {
    if ((RiverBank.humans < RiverBank.ghosts && RiverBank.humans > 0)|| (Destination.humans < Destination.ghosts && Destination.humans > 0)) {
        return 'GameOver'
    }
    else if (RiverBank.humans == 0 && RiverBank.ghosts == 0) {
        return 'Game Win'
    }
    else {
        return 'Play'
    }
}

function itration(val){
    if(val){
        check(Destination)
    }
    else{
        check(RiverBank)
    }

}

function move(val,h,g) {
    let boat = $('#boat');
    if (val) {
        Destination.humans=Destination.humans+h
        Destination.ghosts=Destination.ghosts+g
        
        RiverBank.humans=RiverBank.humans-h
        RiverBank.ghosts=RiverBank.ghosts-g

        for(let i=0;i<h;i++){
            temp=ml.pop();
            mr.push(temp)
            boat.animate({ left: '900px' }, 'slow');
            temp.animate({ left: '1000px' }, 'slow');            
            console.log("D: Salam Ghost")
        }
        for(let i=0;i<g;i++){
            temp=cl.pop();
            cr.push(temp)
            boat.animate({ left: '900px' }, 'slow');
            temp.animate({ left: '1000px' }, 'slow');
            console.log("D: Salam Ghost")
        }
        
    }
    else {
        Destination.humans=Destination.humans-h
        Destination.ghosts=Destination.ghosts-g
        
        RiverBank.humans=RiverBank.humans+h
        RiverBank.ghosts=RiverBank.ghosts+g
        
        for(let i=0;i<h;i++){
            temp=mr.pop();
            ml.push(temp)
            boat.animate({ left: '0px' }, 'slow');
            temp.animate({ left: '0px' }, 'slow');            
            console.log("R: Salam Ghost")
        }
        for(let i=0;i<g;i++){
            temp=cr.pop();
            cl.push(temp)
            boat.animate({ left: '0px' }, 'slow');
            temp.animate({ left: '0px' }, 'slow');
            console.log("R: Salam Ghost")
        }
     }
}

function game(v1,v2){
    move(left,v1,v2);
    itration(left);
    left = !left;
    setInterval(()=>{
        let status=minimax();
        if(status=='GameOver'){
            alert("Game Over");
        }
        else if(status=='Game Win'){
            alert("You Won");
    }
    },1000)

}
document.getElementById('1h').onclick = function () {
    game(1,0);
};
document.getElementById('1g').onclick = function () {
    game(0,1);
};
document.getElementById('2h').onclick = function () {
    game(2,0);
};
document.getElementById('2g').onclick = function () {
    game(0,2);
};
document.getElementById('1h1g').onclick = function () {
    game(1,1);
};




