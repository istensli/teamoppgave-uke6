

let itemIndex;
//let negativeItemIndex;

let requiredGreeting;

//------------------
/*
let carName = "";
let carItems = [];
let carFuel = 100;
let carDriveable = true;
*/

let car = {name: 'BMW', driveable: true, fuelLeft: 100, items: [], coolness: function(){
    let coolnessSum = 0;
    for(let item of this.items){ 
        coolnessSum += item.coolness;
        //console.log(item.name);
    }
    //console.log("Her kjører anonym funksjon, og returnerer sum: " + coolnessSum);
    return coolnessSum;

}};


//bare en tanke, slå sammen disse arrayene??
let items = [
    {name: 'Brukt Oljetank', coolness: -15, fuel: 50},
    {name: 'Brukt kebab', coolness: -20},
    {name: 'Bleier', coolness: -60},
    {name: 'Våte sokker', coolness: -25},
    {name: 'Grus', coolness: -15},
    {name: 'Bæsj', coolness: -99},
    {name: 'Coca cola flaske', coolness: 15},
    {name: 'Big mac meny', coolness: 35},
    {name: 'Gullkjede', coolness: 20},
    {name: 'Rolex', coolness: 70},
    {name: 'Gavekort til diesel', coolness: 15, fuel: 45}
    
    
];
/*
let positiveItems = [
    {name: 'Coca cola flaske', coolness: 15},
    {name: 'Big mac meny', coolness: 35},
    {name: 'Gullkjede', coolness: 20},
    {name: 'Rolex', coolness: 70},
    {name: 'Gavekort til diesel', coolness: 15, fuel: 45}
];*/

// Funksjoner for kompiser


let friends = ['Kompis1', 'Kompis2', 'Kompis3'];


/*
Noen ganger møter man også på en kompis langs veien - han må du hilse på før du kan kjøre vidre.

    Du har (minst) tre måter å hilse på - kompisen er bare fornøyd med én av måtene å bli hilst på.
 
    Dette er tilfeldig fra kompis til kompis og fra møte til møte hvilken hilsen som er riktig. 

    Du må hilse riktig før du kan kjøre videre.

    Har du høy kulhet på bilen får du en kul hilsen tilbake fra kompisen når du hilser riktig, 
    har du lav kulhet får du en lite kul hilsen tilbake.

*/


function getGreetingFromFriend(){
    if(car.coolness() < 30){
            document.getElementById('output').innerHTML = "Lite kul hilsen";
            car.driveable = true;
            return "Lite kul hilsen";
    }
    else if(car.coolness() < 60){
            document.getElementById('output').innerHTML = "Litt kul hilsen";
            car.driveable = true;
            return "Litt kul hilsen";
    }
    else{
            document.getElementById('output').innerHTML = "Skikkelig kul hilsen";
            car.driveable = true;
            return "Skikkelig kul hilsen";
            
    }
 }
 


//brukes ikke
function greetFriend(greetNumber){
    requiredGreeting = getRandomNumber(0, 2);
    if(greetNumber == requiredGreeting){
        return true;
    }
    else return false;

}







function getRandomNumber(min, max){
    return min + Math.floor(Math.random() * (max - min + 1));

}



function getCoolnessFromCar(){
    return car.coolness();
}


function stopOrStartCar(){
    if(car.driveable == true)
        car.driveable == false;
}





function meetItemOrFriend(){
    let randomNumber = getRandomNumber(0, 9);
    if(randomNumber < 3){
        meetFriend();

    }
    else {//rett og slett bare slå sammen arrayene for positive og negative items??
        //if(randomNumber < 5) meetNegativeItem();
        //else meetPositiveItem();
        meetItem();

    }

}



//-------------------------------------------------------

function setRequiredGreeting(){
    requiredGreeting = getRandomNumber(0, 2);
}    

function greet(greetNumber){
    if(greetNumber == requiredGreeting){
        document.getElementById('output').innerHTML = 'Your greeting was corrext!: ';
        setTimeout(getGreetingFromFriend, 2000);
        
    }
    else{
        document.getElementById('output').innerHTML = 'Your have to greet again!: ';
    }


}

function meetFriend(){
    let friendNr = getRandomNumber(0, 2);

    document.getElementById('output').innerHTML = 'You have encountered a friend: ' + friends[friendNr];
    setRequiredGreeting();
    car.driveable = false;
    

}



function meetItem(){
    itemIndex = getRandomNumber(0, (items.length-1));
    document.getElementById('output').innerHTML = 'You have encountered an item: ' +
                                                    items[itemIndex].name;



}
/*
function meetNegativeItem(){
    negativeItemIndex = getRandomNumber(0, (negativeItems.length-1));
    document.getElementById('output').innerHTML = 'You have encountered an item: ' +
                                                    negativeItems[negativeItemIndex].name;



}*/

function equip(){
    if(itemIndex == undefined)return;
    addItemToCar(itemIndex);

    itemIndex = undefined;


    updateFuelBar();
    updateCoolnessBar();
    updateCoolnessDiv();
    showCarList();
    car.driveable = true;
    checkIfHasWonOrNoFuelLeft();

}

function ignore(){

    car.driveable = true;
    itemIndex = undefined;

}



function drive(){
    if(car.driveable == false) return;
    meetItemOrFriend();
    //meetPositiveItem();
   
    console.log(car.items);

    car.fuelLeft -= 5;
    updateFuelBar();

    car.driveable = false;

    updateCoolnessDiv();
    showCarList();

}

function updateCoolnessDiv(){
    document.getElementById('coolness').innerHTML = `Coolness: ${getCoolnessFromCar()}`;
}

function showCarList(){
    html = '<ul>';
    for (item of car.items){
        html += '<li>' + item.name + '</li>';

    }
    html += '</ul>';
    document.getElementById('carList').innerHTML = html;

}

function addItemToCar(index){
    car.items.push(items[index]);
    if(items[index].fuel){
        car.fuelLeft += items[index].fuel;
        if(car.fuelLeft > 100) car.fuelLeft = 100;
    }


}

function checkIfHasWonOrNoFuelLeft(){
    if(getCoolnessFromCar() >= 100){
        car.driveable = false;
        document.getElementById('output').innerHTML = "You have reached a coolness of 100!";
        
    }
    if(car.fuelLeft <= 0){
        car.driveable = false;
        document.getElementById('output').innerHTML = "You have run out of fuel!";
    }

}


function updateCoolnessBar(){
    let innerBarDiv = document.getElementById("inner-coolness-bar");
    let width = getCoolnessFromCar();
    if(width > 100){
        width = 100;
    }
    if(width < 0){
        width = 0;

    }
    innerBarDiv.style.width = width + '%';//width * 0.5??
    innerBarDiv.innerHTML = width + '%';

}

function updateFuelBar(){
    let innerBarDiv = document.getElementById("inner-fuel-bar");
    let width = car.fuelLeft;
    if(width > 100){
        width = 100;
    }
    if(width < 0){
        width = 0;

    }
    innerBarDiv.style.width = width + '%';//width * 0.5??
    innerBarDiv.innerHTML = width + '%';

}




//mangler logikk for bensin/diesel
//bug: man kan equippe forrige element hvis man hilser på kompis - fikset!
//lage progress-bar
//bug: ting kan finnes på nytt!eller er det bug??