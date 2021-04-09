import './extend.js';

describe('extend', () => {
  it('Converts an ArrayBuffer of UTF-8-encoding into an object', function () {
    const obj = {foo: 'bar'};

    const buf = Buffer.from(JSON.stringify(obj));
    const ab = new ArrayBuffer(buf.length);

    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
    }

    const json = ab.toJSON();
    expect(json.id).toEqual(obj.id);
  });

  it('Checks if the Array is empty', function () {
    const arr = [];
    const arr2 = [1];
    expect(arr.isEmpty()).toBeTruthy();
    expect(arr2.isEmpty()).toBeFalsy();
  });

  it('Returns an empty array', function () {
    const arr = [];
    expect(Array.empty()).toEqual([]);
  });

  it('Checks if the Array has only one element', function () {
    const arr = [1];
    const arr2 = [1, 1];
    expect(arr.hasOnlyOne()).toBeTruthy();
    expect(arr2.hasOnlyOne()).toBeFalsy();
  });

  it('Checks if the Array is not empty and has more than one element', function () {
    const arr = [1];
    const arr2 = [1, 1];
    expect(arr.hasMultiple()).toBeFalsy();
    expect(arr2.hasMultiple()).toBeTruthy();
  });

  it('Gets the first element in the array', function () {
    const arr = [1, 2];
    expect(arr.first()).toEqual(1);
    expect(arr.first()).not.toEqual(2);
  });

  it('Gets the last element in the array', function () {
    const arr = [1, 2];
    expect(arr.last()).toEqual(2);
    expect(arr.last()).not.toEqual(1);
  });

  it('Gets the second to last item in the array', function () {
    const arr = [1, 2, 3];
    expect(arr.penultimate()).toEqual(2);
    expect(arr.penultimate()).not.toEqual(3);
    expect(arr.penultimate()).not.toEqual(1);
  });

  describe('append', () => {
    it('Appends an array [value] element with a specified key and a value to a Map object', function () {
      const hashMap = new Map();
      const arr = [1, 2, 3];
      hashMap.set(1, arr);
      hashMap.append(1, 4);

      expect(hashMap.get(1)).toEqual([1, 2, 3, 4]);
    });

    it('Adds an array [value] element with a specified key and a value to a Map object', function () {
      const hashMap = new Map();
      hashMap.set(1, []);
      hashMap.append(1, 4);

      expect(hashMap.get(1)).toEqual([4]);
    });

    it('throws an exception if value is not an array', function () {
      const hashMap = new Map();
      hashMap.set(1, {});

      expect(() => hashMap.append(1, 4)).toThrow();
    });
  });

  describe('sort', () => {
    it('Appends an array [value] element with a specified key and a value to a Map object', function () {
      const hashMap = new Map();
      const arr = [1, 3, 2];
      hashMap.set(1, arr);
      const predicate = (a ,b) => a - b;
      hashMap.sort(1, predicate);

      expect(hashMap.get(1)).toEqual([1,2,3]);
    });

    it('throws an exception if value is not an array', function () {
      const hashMap = new Map();
      hashMap.set(1, {});
      const predicate = (a ,b) => a > b;

      expect(() => hashMap.sort(1, predicate).toThrow());
    });
  });

  it('Returns a specified number of contiguous characters from the start of a string', function () {
    const str = 'hello world';
    expect(str.take(5)).toEqual("hello");
  });
});
