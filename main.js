const timings = {
    opens: 1000,
    closes: 1900
}
const helper = require('./resources/helpers')
// console.log(helper)

//because people Google in strings. And with weird formats.

let queryDay = process.argv[2] //ACCEPTABLE FORMATS: SAT, sat, SaTUrDAY, saturday
let queryTime = process.argv[3] /*ACCEPTABLE FORMATS(ignore case): 
1300, 1300 hrs, 1300hrs, 13.00hrs, 100PM, 100 pm, 1.00 pm, 1:00pm, 13.00, 0100 am, 0200am
*/



let correctTime = queryTime => {
    let addTwelve = false
    if(isNaN(+queryTime) || queryTime.includes('.')) {

        if(queryTime.slice(-2,).toLowerCase() == 'am') {
            queryTime = queryTime.substring(0, queryTime.length-2)
            queryTime = queryTime.trim()
        }
        if(queryTime.slice(-2,).toLowerCase() == 'pm') {
            queryTime = queryTime.substring(0, queryTime.length-2)
            addTwelve = true
        }
        if(queryTime.slice(-3,).toLowerCase() == 'hrs') {
            // console.log("in")
            queryTime = queryTime.substring(0, queryTime.length-3)
        }
        if(queryTime.includes('.')) {
            let splitArr = queryTime.split('.')
            // console.log(splitArr)
            queryTime = splitArr[0] + splitArr[1]
        }
        else if(queryTime.includes(':')) {
            let splitArr = queryTime.split(':')
            queryTime = splitArr[0] + splitArr[1]
        }
        }
        queryTime = +queryTime
        if(addTwelve == true)
            queryTime += 1200

        return queryTime
}

//converting to suitable format
queryDay = queryDay.substring(0,3).toLowerCase()
console.log("YOU HAVE REQUESTED STORE STATUS FOR ---->\nDay: " + queryDay)
queryTime = correctTime(queryTime)
if(queryTime < 1000)
    console.log("Time: 0" + queryTime + "\n")
else
    console.log("Time: " + queryTime + "\n")
console.log("\nDISPLAYING RESULTS --->")


//computation
const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
let targetDay = daysOfWeek.indexOf(queryDay)
let inputDate = new Date(7 * 24 * 3600 * 1000)
// console.log(inputDate, "which is a " + inputDate.getDay())
let distance = targetDay - inputDate.getDay();
inputDate.setDate(inputDate.getDate() + distance);
// conso98333333333le.log(inputDate, "which is a " + inputDate.getDay())

inputDate.setMinutes(queryTime%100)
inputDate.setHours(Math.floor(queryTime / 100))
// console.log(inputDate)
// console.log(inputDate.getHours())

helper.openOrClosed(inputDate, timings)