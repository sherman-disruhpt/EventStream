/**
 * Convert an ArrayBuffer of UTF-8-encoding into an object
 */
ArrayBuffer.prototype.toJSON = function () {
  return JSON.parse(new TextDecoder('utf-8').decode(new Uint8Array(this)));
}

/**
 * Checks if the Array is empty
 */
Array.prototype.isEmpty = function () {
  return this.length === 0;
}

/**
 * Returns an empty array
 */
 Array.empty = () => [];


 /**
 * Checks if the Array has only one element
 */
Array.prototype.hasOnlyOne = function(){
  return this.length === 1;
}

/**
 * Checks if the Array is not empty and has more than one element
 */
Array.prototype.hasMultiple = function(){
  return this.length > 1;
}

/**
 * Gets the first element in the array
 */
Array.prototype.first = function() {
  return this[0];
}

/**
 * Gets the last element in the array
 */
 Array.prototype.last = function() {
  return this[this.length -1];
}

/**
 * Gets the second to last item in the array
 */
 Array.prototype.penultimate = function() {
  return this[this.length -2];
}

/**
 * Adds or appends an array [value] element with a specified key and a value to a Map object. 
 */
Map.prototype.append = function (key, value) {
  if (this.has(key)) {
    const currentValue = this.get(key);
    if (Array.isArray(currentValue)) {
      currentValue.push(value);
    } else {
      throw Error(`The value for key:${key} must be an array`);
    }
    this.set(key, currentValue);
  } else {
    this.set(key, [value]);
  }
};

/**
 * Sorts the array [value] of a specified key in a Map object 
 */
 Map.prototype.sort = function (key, predicate) {
  if (this.has(key)) {
    const currentValue = this.get(key);
    if (Array.isArray(currentValue)) {
      currentValue.sort(predicate);
    } else {
      throw Error(`The value for key:${key} must be an array`);
    }
    this.set(key, currentValue);
  }
 }

/**
 * Returns a specified number of contiguous characters from the start of a string
*/
String.prototype.take = function (count) {
  return this.substring(0, count);
}
