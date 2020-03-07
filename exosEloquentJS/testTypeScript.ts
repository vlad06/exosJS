interface Person {
    name: String;
    age: Number;
 }
 
 function sortByName(a: Person[]) {
    var result = a.slice(0);
    result.sort(function (x, y) {
       return x.name.localeCompare(y.name);
    });
    return result;
 }
 
 sortByName([]);