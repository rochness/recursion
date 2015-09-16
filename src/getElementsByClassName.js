// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:


var getElementsByClassName = function(className
){
  // your code here
  //create array to return with all elements with className
  var elementsToReturn = [];
  //set parent element
  var parentElem;
  if(arguments.length==1){
  	parentElem = document.body;
  	if(parentElem.classList.contains(className)){
  		elementsToReturn.push(parentElem);
  	}
  }
  else{
  	parentElem = arguments[1];
  }
  
  //create array of children elements
  var children = Array.prototype.slice.apply(parentElem.childNodes);

  //termination case: no more child elements to search
  if(children.length == 0){
  	return [];
  }
  //search through child nodes and use element.classList.contains(className) to see if element is of className
  for(var i =0; i<children.length; i++){
  	if(children[i].classList && children[i].classList.contains(className)){
  		elementsToReturn.push(children[i]);
  	}
  	else{
  	//make recursive call on children of children
  		elementsToReturn = elementsToReturn.concat(getElementsByClassName(className, children[i]));
  	}
  }
  return elementsToReturn;
};
