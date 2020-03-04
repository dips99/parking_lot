module.exports = {
    create_parking_lot : function(input) {
        totalParkings = parseInt(input.split(" ")[1]);
        return totalParkings;
    },
    park : function(totalParkings, parkingArr, len, input){
    	if(totalParkings > 0){
	    	if(findParking(parkingArr) == true){
		  		for(var i=0;i<len;i++){
		  			if(parkingArr[i][i] == null){
		  				var inp = input.split(" ")[1];
						parkingArr[i][i] = inp;
						i = i + 1;
						return i;
		  			}
		  		}
		  	}else{
		  		return null;
		  	}
	  	}else{
	  		return null;
	  	}
    },
    leave : function(totalParkings, parkingArr, input){
		if(totalParkings > 0){
			var index = input.split(" ")[1] - 1;
			var carnumber = input.split(" ")[1];
			var time = input.split(" ")[2]
			
			
			
			// console.log('totalparking index '+index+' parkar length '+parkingArr.length);
			let carfound = search(parkingArr,carnumber);
			console.log("carfound "+carfound);
			console.log("time "+time);

			if(time==undefined){
				console.log('Please enter total hours car was parked');
				return 0;
			}
			else{
				if(carfound==1){
					let charge = charges(time);
					return [carfound,charge];
				}else{
					console.log("Registration number "+carnumber+" not found");
					return 0;
				}
			}

		}else{
			return null;
		}
    },
    status: function(totalParkings, parkingArr){
		console.log('totpark in status'+totalParkings);
		console.log(parkingArr);
    	var arr = new Array();
    	if(totalParkings > 0){
        	arr.push("Slot No. Registration No.");
        	for(var i=0; i<parkingArr.length;i++){
        		if(parkingArr[i][i] != null){
        			var e = i + 1;
        			arr.push(e + ".  " + parkingArr[i][i].split(":")[0]);
				}
				else{
					console.log(i+' slot is empty');
				}
        	}
        	return arr;
		}else{
			return [];
		}
    }
};

function findParking(parkingArr){
	var ele = false;
	for(var i=0; i<parkingArr.length; i++){
		if(parkingArr[i][i] == null){
			ele = true;
		}
	}
	return ele;
}
function search(parkingArr,carnumber){
	let i=0;
	let matched = 0;
	parkingArr.forEach(el => {
		if(el[i]==carnumber){
			matched = 1;
			break;
		}
		// if(el[i]==carnumber){
		// 	matched = 1;	
		// }
		
		i++;
	});
	return matched;
}

function charges(time){
	let firstHoursCharges = 10;
	let total;
	if(0<time<=2){
		total = firstHoursCharges;
	}
	else if(time>2){
		timeAftTwoHours = time-2;
		total = firstHoursCharges+timeAftTwoHours*10;
	}
	return total;
}