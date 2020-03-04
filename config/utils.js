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
			var carnumber = input.split(" ")[1];
			var time = input.split(" ")[2];	
			if(time==undefined){	
				return null;
			}
			else{
				let carfound = search(parkingArr,carnumber);
				if(carfound['match']==1){
					let charge = charges(time);
					carfound['charge']=charge;
				}
				return carfound;
			}
		    
		}else{
			return null;
		}
    },
    status: function(totalParkings, parkingArr){
		var arr = new Array();
    	if(totalParkings > 0){
        	arr.push("Slot No. Registration No.");
        	for(var i=0; i<parkingArr.length;i++){
        		if(parkingArr[i][i] != null){
        			var e = i + 1;
        			arr.push(e + ".  " + parkingArr[i][i].split(":")[0]);
				}
				else{
					console.log('slot '+i+' is empty');
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
	let matched = [];
	matched["car"] = carnumber;
	for(var i=0;i<parkingArr.length;i++){
		parkedCarNumber = Object.values(parkingArr[i]);
		if(parkedCarNumber==carnumber){
			matched["match"] = 1;
			matched["slot"] = i+1;
			parkingArr[i][i] = null;
			break;
		}else{
			matched["match"] = 0;
			continue;
		}
	}
	return matched;
}

function charges(time){
	let firstHoursCharges = 10;
	let total;
	if(time>2){
		timeAftTwoHours = parseInt(time-2);
		total = firstHoursCharges+timeAftTwoHours*10;	
	}
	else{
		total = firstHoursCharges;
	}
	return total;
}