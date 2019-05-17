
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 50.005930, lng: 36.272819,
            zoom: 11,
        }
    });

    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
    });

    directionsDisplay.addListener('directions_changed', function () {
        computeTotalDistance(directionsDisplay.getDirections());
    });

    let origin = new google.maps.LatLng(49.915410, 36.280274);
    let destination = new google.maps.LatLng(49.999486, 36.243151);

    displayRoute(
        origin,
        destination,
        directionsService,
        directionsDisplay
    );

    const bindInpToMap = (input, name) => {
        const searchBox = new google.maps.places.Autocomplete(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        searchBox.setFields(['place_id','geometry']);
        searchBox.addListener('place_changed', function () {
            let place = searchBox.getPlace();
            if (!place.place_id) {
                window.alert('Please select an option from the dropdown list.');
                return;
            }
            if (name === 'ORIG') {
                map.setCenter(place.geometry.location);
                origin = place.geometry.location;
            } else {
                map.setCenter(place.geometry.location);
                destination = place.geometry.location;
            }
            displayRoute(
                 origin,
                 destination,
                 directionsService,
                 directionsDisplay
             );
        });
    };
    const inputA = document.getElementById('inpA');
    const inputB = document.getElementById('inpB');
    bindInpToMap(inputA, 'ORIG');
    bindInpToMap(inputB, 'DEST');
}

function displayRoute(origin, destination, service, display) {
    service.route({
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING',
        avoidTolls: true
    }, function (response, status) {
        if (status === 'OK') {
            display.setDirections(response);
        } else {
            alert('Could not display directions due to: ' + status);
        }
    });
}


function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total;
  
}
    data = '[{"name":"Шара (30 - 40)","number":"30 - 40","type":[{"name":"Эконом","firstkmprice":"25","otherkm":"8"},{"name":"Стандарт","firstkmprice":"49","otherkm":"9"},{"name":"Комфорт","firstkmprice":"59","otherkm":"10"},{"name":"Бизнеc","firstkmprice":"69","otherkm":"10"}],"services":[{"name":"animal","cost":"50"},{"name":"delivery","cost":"10"}]},{"name":"Maxim","number":"75 - 55","type":[{"name":"Эконом","firstkmprice":"35","otherkm":"6"},{"name":"Стандарт","firstkmprice":"-","otherkm":"-"},{"name":"Комфорт","firstkmprice":"50","otherkm":"6.5"},{"name":"Бизнеc","firstkmprice":"50","otherkm":"7.5"}],"services":[{"name":"animal","cost":"10"},{"name":"delivery","cost":"10"}]},{"name":"OnTaxi","number":"2000","type":[{"name":"Эконом","firstkmprice":"29","otherkm":"6"},{"name":"Стандарт","firstkmprice":"45","otherkm":"7"},{"name":"Комфорт","firstkmprice":"55","otherkm":"8"},{"name":"Бизнеc","firstkmprice":"65","otherkm":"11"}],"services":[{"name":"animal","cost":"Infinity"},{"name":"delivery","cost":"Infinity"}]},{"name":"Shark","number":"3000","type":[{"name":"Эконом","firstkmprice":"38.25","otherkm":"5.95"},{"name":"Стандарт","firstkmprice":"45","otherkm":"7"},{"name":"Комфорт","firstkmprice":"58.5","otherkm":"9.1"},{"name":"-","firstkmprice":"-","otherkm":"-"}],"services":[{"name":"animal","cost":"10"},{"name":"delivery","cost":"20"}]},{"name":"Яндекс","number":"20-02","type":[{"name":"Эконом","firstkmprice":"29","otherkm":"5"},{"name":"-","firstkmprice":"-","otherkm":"-"},{"name":"Комфорт","firstkmprice":"35","otherkm":"5"},{"name":"-","firstkmprice":"-","otherkm":"-"}],"services":[{"name":"animal","cost":"-"},{"name":"delivery","cost":"-"}]}]';
var taxi = JSON.parse(data);

	function calcSharaCost(){
		var sharaCost=[];
		var cost = [];
		var range = Number(total.innerHTML);
        var serv_inp = document.getElementsByClassName("services");
       //alert(Number(taxi[0].services[0].cost));
		for (var j = 0; j < taxi.length; j++) {
			 cost[j] = [];
             for(let i = 0; i < taxi[j].type.length; i++ ){
                switch (j){
                    case 0 : case 2 :  {
                    
                        if (range > 1){
                            range - 1;
                            cost[j][i] = Number(taxi[j].type[i].firstkmprice);
                            cost[j][i] += range*Number(taxi[j].type[i].otherkm);
                            //cost[j][i] -= cost[j][i]/100*5; 
                        }
                        else {cost[j][i] = taxi[j].type[i].firstkmprice};
                    }
                    break;
                    case 1 : {
                        if (range > 2){
                            //range - 2;
                            cost[j][i] = Number(taxi[j].type[i].firstkmprice);
                            cost[j][i] += (range-2)*Number(taxi[j].type[i].otherkm);
                            //cost[l][i] -= cost[i]/100*5;
                        }
                    }
                    break;
                    case 3: case 4:{
                        if (range > 1){
                            range - 1;
                            cost[j][i] = Number(taxi[j].type[i].firstkmprice);
                            cost[j][i] += range*Number(taxi[j].type[i].otherkm);
                            cost[j][i] -= cost[j][i]/100*5;
                        }
                        else {cost[j][i] = taxi[j].type[i].firstkmprice};
                    }  
                }
                for (var k = 0; k < serv_inp.length; k++) {
                    if (serv_inp[k].checked){
                    cost[j][i] += Number(taxi[j].services[k].cost);
                    }
                } 
            }	
		}
       /*for (var j = 0; j < taxi.length; j++) {
           for(let i = 0; i < taxi[j].type.length; i++ ){
            if (cost[j][i]==Infinity) {
                cost[j][i] = "No price";
            }
           }
       }*/
		return cost;
	}

function output(){
	var radio = document.getElementsByName('typecar');
	for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
           var radioOn = radio[i].value;
        }
    }
     var fillRow = 0;
for (var i = 0; i < taxi.length; i++) {
    if (taxi[i].type[radioOn].name == "-") continue;
    else fillRow+=1;
    }

    var table = document.getElementById('table');
    table.innerHTML = "";
    for (var i = 0; i < fillRow+1; i++) {
        table.innerHTML += "<div class="+"row"+">"+"</div>";
    }
    var rows = table.childNodes;
        rows[0].innerHTML = "<div class="+"cell "+ ">" +"Название такси"+ "</div>"+"<div class="+"cell "+">" +"Класс машины"+ "</div>"+"<div class="+"cell"+">" + "Стоимость" + ' (грн)' + "</div>"+"<div class="+"cell"+">" +"Номер"+ "</div>";
    for (var i = 0; i <taxi.length; i++) {
        if (calcSharaCost()[i][radioOn]==0){ 

           // continue;
            rows[i+1].innerHTML = "<div class="+"cell "+ ">" + taxi[i+1].name+ "</div>"+"<div class="+"cell "+">" + taxi[i+1].type[radioOn].name+ "</div>"+"<div class="+"cell"+">" + Math.round(calcSharaCost()[i+1][radioOn]) + 'грн' + "</div>"+"<div class="+"cell"+">" + taxi[i+1].number+ "</div>";
            i+=1;
        }
        else {
            rows[i+1].innerHTML = "<div class="+"cell "+ ">" + taxi[i].name+ "</div>"+"<div class="+"cell "+">" + taxi[i].type[radioOn].name+ "</div>"+"<div class="+"cell"+">" + Math.round(calcSharaCost()[i][radioOn]) + 'грн' + "</div>"+"<div class="+"cell"+">" + taxi[i].number+ "</div>";
        }
    }
}
