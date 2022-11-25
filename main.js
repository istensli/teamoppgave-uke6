

let itemIndex;


let requiredGreeting;

//------------------


let car = {name: 'BMW', driveable: true, fuelLeft: 100, items: [], coolness: function(){
    let coolnessSum = 0;
    for(let item of this.items){ 
        coolnessSum += item.coolness;
        
    }
    
    return coolnessSum;

}};



let items = [
    {name: 'Delvis brukt dieseltank', coolness: -15, fuel: 30},
    {name: 'Brukt kebab', coolness: -20},
    {name: 'Bulk i panser', coolness: -40},
    {name: 'Våte sokker', coolness: -25},
    {name: 'Grus', coolness: -15},
    {name: 'Ripe i lakken', coolness: -25},
    {name: 'Coca cola flaske', coolness: -5},
    {name: 'Big mac meny', coolness: -10},
    {name: 'Gullkjede', coolness: 15},
    {name: 'Rolex', coolness: 30},
    {name: 'Gavekort til diesel 500kr', coolness: -5, fuel: 50},
    {name: 'Gavekort til diesel 1000kr', coolness: -5, fuel: 100},
    {name: 'Fartsstriper', coolness: 15},
    {name: 'Wunderbaum', coolness: 20},
    {name: 'Fete felger', coolness: 30}
    
    
];



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
            document.getElementById('output').innerHTML = "Lite kul hilsen tilbake. Du kan nå kjøre";
            car.driveable = true;
            return "Lite kul hilsen";
    }
    else if(car.coolness() < 60){
            document.getElementById('output').innerHTML = "Litt kul hilsen tilbake. Du kan nå kjøre";
            car.driveable = true;
            return "Litt kul hilsen";
    }
    else{
            document.getElementById('output').innerHTML = "Skikkelig kul hilsen tilbake. Du kan nå kjøre";
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
    else {
        meetItem();

    }

}





function setRequiredGreeting(){
    requiredGreeting = getRandomNumber(0, 2);
}    

function greet(greetNumber){
    if(greetNumber == requiredGreeting){
        document.getElementById('output').innerHTML = 'Din hilsen var riktig!';
        setTimeout(getGreetingFromFriend, 2000);
        
    }
    else{
        document.getElementById('output').innerHTML = 'Du må hilse på nytt! <br />';
        document.getElementById('output').innerHTML += 'Du mister bensin mens bilen går på tomgang';
        car.fuelLeft -= 5;
        updateFuelBar();
        checkIfHasWonOrNoFuelLeft();

    }


}

function meetFriend(){
    let friendNr = getRandomNumber(0, 2);

    document.getElementById('output').innerHTML = 'Du har møtt på en kompis; ' + friends[friendNr];
    setRequiredGreeting();
    car.driveable = false;
    

}



function meetItem(){
    itemIndex = getRandomNumber(0, (items.length-1));
    document.getElementById('output').innerHTML = 'Du har møtt på en ting; ' +
                                                    items[itemIndex].name;



}


function equip(){
    if(itemIndex == undefined)return;
    addItemToCar(itemIndex);

    itemIndex = undefined;


    updateFuelBar();
    updateCoolnessBar();
    
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
    
   
    console.log(car.items);

    car.fuelLeft -= 5;
    updateFuelBar();
    checkIfHasWonOrNoFuelLeft();

    car.driveable = false;

    updateCoolnessDiv();
    showCarList();

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
        document.getElementById('output').innerHTML = "Du har nådd 100 i kulhet!";
        //win screen
        document.getElementById('app').innerHTML = "Du har nådd 100 i kulhet!";
        
    }
    if(car.fuelLeft <= 0){
        car.driveable = false;
        document.getElementById('output').innerHTML = "Du har gått tom for drivstoff!";
        //lose screen
        document.getElementById('app').innerHTML = "Du har gått tom for drivstoff!";
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
    innerBarDiv.style.width = width + '%';
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







//bug: man kan ignorere kompiser