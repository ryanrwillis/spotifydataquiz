exports.generate = (n, min, max) =>{
    let nums = [];
    for(let i = min; i < max; i++){
        nums.push(i)
    }
    nums = shuffle(nums);
    let results = [];
    for(let i = 0; i < n; i++){
        results[i] = nums.pop()
    }
    return results
}

exports.generatePairs = (n, min, max) =>{
    if(2 * n > max - min) throw new Error('Not possible to generate unique pairs, max - min < 2n')
    let nums = exports.generate(2 * n, min, max)
    let pairs = [];
    for(let i = 0; i < n; i++){
        pairs[i] = [nums.pop(), nums.pop()]
    }
    return pairs
}

// Credit to https://stackoverflow.com/a/2450976/1293256 for this shuffle algorithm
var shuffle = function (array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};