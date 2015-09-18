// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
	var charIndex =0;
	var string;
  //Call error when something is wrong
	var error = function (m) {
		throw {
                 name:    'SyntaxError',
                 message: m,
             };
	};

	var escapee = {
             '\'':  '\'',
             "\"": '\"',
             '\\': '\\',
             '/':  '/',
             b:    'b',
             f:    '\f',
             n:    '\n',
             r:    '\r',
             t:    '\t'
         };
    var beGoneWhiteSpaces = function(){
    	if(json.charAt(charIndex)===' '){
    		while(json.charAt(charIndex)===' '){
    			charIndex++;
    		}
    	}
    }

	var value = function() {

		//remove white space
		while(json.charAt(charIndex)===' '){
			charIndex++;
		}
  		//if it's a number
  		if(json.charAt(charIndex)==='-' || (json.charAt(charIndex)>='0' && json.charAt(charIndex)<='9')){
  			string = '';
  			var num;
  			//function to string together consecutive digits and add to string
  			var collectDigits = function(){
  				var digits ='';
  				while(json.charAt(charIndex)>='0' && json.charAt(charIndex)<='9'){
					digits+=json.charAt(charIndex);
					charIndex++;
				}
				string+=digits;
  			}
  			//if it's a negative number, at neg symbol to beginning of string 
  			if(json.charAt(charIndex)==='-'){
  				string+='-';
  				charIndex++;
  			}
  			collectDigits();
  			//if there's a decimal, add it to string and then add digits after decimal
  			if(json.charAt(charIndex)==='.'){
  				string+='.';
  				charIndex++;
  				collectDigits();
  			}
  			num = Number(string);
  			if(Number.isNaN(num)){
				error("Something wrong with this number");
			}else{
				return num;
			}
  		}

  		//if it's a boolean
  		if(json.charAt(charIndex) === 't'){
			string = json.slice(charIndex, charIndex+4);
			if(string !== 'true'){
				error("expected to be true, but something wrong with string");
			} else{
				charIndex+=4;
				return true;
			}
		}
		if(json.charAt(charIndex) === 'f'){
			string = json.slice(charIndex, charIndex+5);
			if(string !== 'false'){
				error("expected to be false, but something wrong with string");
			} else{
				charIndex+=5;
				return false;
			}
		}	

  //if it's null
	if(json.charAt(charIndex) === 'n'){
		string = json.slice(charIndex, charIndex+4);
		if(string !== 'null'){
			error("expected to be null, but something wrong with string");
		}
		else{
			charIndex+=4;
			return null;
		}
	}

  //if it's a string
 	if(json.charAt(charIndex)==='\"'){
  		string = '';
  		charIndex++;
  		//check for escapee chars
  		while(json.charAt(charIndex)){
  			if(json.charAt(charIndex)==='\"'){
  				charIndex++;
  				return string;
  			}
  			if(json.charAt(charIndex)==='\\'){
  				charIndex++;
  				if(escapee.hasOwnProperty(json.charAt(charIndex))){
  					string += escapee[json.charAt(charIndex)];	
  				} else{
  					error("something went wrong with escapee characters");
  				}
  			} else{
  				string+=json.charAt(charIndex);
  			} 
  			charIndex++
  		}
  	}
  
  	//if it's an array
  	if(json.charAt(charIndex)==='['){
  		var array = [];
  		charIndex++;
  		if(json.charAt(charIndex)===']'){
  			charIndex++;
  			return array;
  		}
  		/*if(json.charAt(json.length-1)!==']'){
  			error("this is not a real array");
  		}*/
  		do{
  			array.push(value());
  			beGoneWhiteSpaces;
  			if(json.charAt(charIndex)===']'){
  				charIndex++;
  				return array;
  			}
  		} while(json.charAt(charIndex) && charIndex<json.length && json.charAt(charIndex)===',' && charIndex++);

  		error('bad array');	
  	}

  	//if it's an object
  	if(json.charAt(charIndex) === '{'){
  		var key;
  		var obj = {};
  		charIndex++;
  		if(json.charAt(charIndex)==='}'){
  			charIndex++;
  			return obj;
  		} 
  		do{
  			key = value();
  			//beGoneWhiteSpaces;
  			if(json.charAt(charIndex)!==':'){
  				error("should be a colon after key value of object");
  			}
  			charIndex++;
  			obj[key]=value();
  			beGoneWhiteSpaces();
  			var currentChar = json.charAt(charIndex);
  			if(json.charAt(charIndex)==='}'){
  				charIndex++;
  				return obj;
  			}
  		} while(json.charAt(charIndex) && charIndex<json.length && json.charAt(charIndex)===',' && charIndex++);
  		error('bad object');	
  	}
  	error('bad JSON');
	};
  	return value();
};
