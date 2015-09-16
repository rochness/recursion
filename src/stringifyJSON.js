// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

/*var each = function(collection, iterator) {
    if(Array.isArray(collection)){
      for(var i = 0; i<collection.length; i++){
        iterator(collection[i], i, collection);
      }
    }
    else{
      for (var key in collection){
        iterator(collection[key], key, collection);
      } 
    }
  };
*/
var stringifyJSON = function(obj) {
  // your code goes here
  var string = '';
  
  //if obj is null
  if(obj == null){
  	string += "null";
  }
  //if obj is a string
  else if(typeof obj == "string"){
  	string = '\"' + obj + '\"';
  }
  //if obj is a number or boolean
  else if(typeof obj == "number" || typeof obj == "boolean"){
  	string += obj.toString();
  }
  //if obj is a date
  else if(obj instanceof Date ){
  	string += obj.toString();
  }
  //if obj is an array
  else if(Array.isArray(obj)){
  	string += "[";
  	_.each(obj, function(element){
  		if(element == undefined || _.isFunction(element)){
  			string += "null" + ",";
  		}
  		else{
  			string += stringifyJSON(element) + ",";
  		}
  	});
  	if(obj.length>0){
  		string = string.slice(0,string.length-1) + "]";
  	}
  	else{
  		string += "]";
  	}
  }
  	
  //if undefined or a function
  else if(obj == undefined || typeof obj == "function"){
  	string = undefined;
  }
  //if obj is an object
  else {
  	string += "{";
  	if(_.isEmpty(obj)){
  		string +="}";
  	}
  	else{
  		_.each(obj, function(value, key){
  			if(!_.isUndefined(value) && !_.isUndefined(key) && !_.isFunction(value)){
  				string += '\"'+ key.toString() + '\"' + ":";
  				string += stringifyJSON(value) + ",";
  			}
  		});
  		if(string.length > 1){
  			string = string.slice(0,string.length-1) + "}";	
  		}
  		else{
  			string += "}";
  		}
  	}
  }

  return string;
};


