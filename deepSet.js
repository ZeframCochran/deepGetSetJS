/*
Using code from stackOverflow user Dieter Gribnitz
todo:
Add unit tests, more verbose variable names.
*/
function s(){
  var testStructure = {
    "firstName": "John",
    "lastName" : "doe",
    "age"      : 26,
    "address"  : {
      "streetAddress": "naist street",
      "city"         : "Nara",
      "postalCode"   : "630-0192"
    },
    "phoneNumbers": [
      {
        "type"  : "iPhone",
        "number": "0123-4567-8888"
      },
      {
        "type"  : "home",
        "number": "0123-4567-8910"
      }
    ]
  };

  function setValue(object, path, value) {
    var pathList = path.split('.');

    for (var index = 0; index < pathList.length - 1; index++) {
        var name = pathList[index];
        if (name in object) {
            object = object[name];
            //console.log('Found ' + name);
        } else {
            //console.log('  Creating: ' + name);
            object[name] = {};
            object = object[name];
        }
    }
    var finalElement = pathList[pathList.length - 1];
//    console.log('  Saving: ' + finalElement + ' with value: ' + value);
    object[finalElement] = value;

  };

  function getValue(object, path){
    var pathList = path.split('.');
    for (var index = 0; index < pathList.length - 1; index++) {
        var name = pathList[index];
        if (name in object) {
            object = object[name];
        } else {
          return "";
        }
    }
    var finalElement = pathList[pathList.length - 1];
    return object[finalElement];
  };

  function testSetValue(path, object, value){
    setValue(object, path, value)

    if(getValue(object, path) === value){
      result = 'SetValue success: ' + path + ' was set to ' + value;
    }
    else{
      result = 'SetValue Failed ' + path + ' was not set to ' + value;
      console.log('    Got: ' + object);
    }
    console.log(result);
  };  

  function testGetValue(object, path, expectedValue){
    var result = getValue(object, path);
    if(result === expectedValue){
      console.log('GetValue success: ' + path + ' contained expected value: ' + expectedValue);
      return true;
    }
    console.log('GetValue fail: ' + path);
    return false;
  };  
  testGetValue(testStructure, 'address.city', 'Nara');
  testSetValue('address.addOne',testStructure,{});
  testSetValue('address.addOne.addTwo',testStructure,{});
  testSetValue('address.addOne.addTwo.addThree',testStructure,'String value');

  function testObjectMethod(method, object, path, expectedValue){
    var result = method(object, path);
    if(result === expectedValue){
      console.log(method.name + ' success: ' + path + ' contained expected value: ' + expectedValue);
      return true;
    }
    console.log('Method fail: ' + path);
    return false;
  }
  testObjectMethod(getValue, testStructure, 'address.city', 'Nara');
  testObjectMethod(getValue, testStructure, 'address.negativeScenario', undefined);
  testSetValue.call( this, 'address.negativeScenario.banana.deeper',testStructure , 'banana');
  testSetValue.call( this, 'address.negativeScenario.banana.secondValue',testStructure , 'banana');
  //setValue.call(this, testStructure, 'address.negativeScenario', 'banana');
};
s();
