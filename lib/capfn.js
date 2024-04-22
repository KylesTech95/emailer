module.exports = function capFn(str){
    let first = str[0].toUpperCase()
    let rest = str.slice(1,str.length)
    let res = `${first}${rest}`
    return res
}