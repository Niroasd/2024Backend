const nameArray = ['Antarctica', 'Star shopping', 'Skyfall', '5 in the morning', 'CLYDE']


const randomInt = (max) => {
    return Math.floor(Math.random() * (max))
}
console.log(nameArray[randomInt(nameArray.length)]);