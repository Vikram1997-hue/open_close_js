function openOrClosed(inputDate, timings) {
    
    //edge case: weekends
    if(inputDate.getDay() == 6 || inputDate.getDay() == 0) {
        console.log("CLOSED!")
        let displayMsg = getClosestOpening(inputDate, timings)
        console.log(displayMsg)
    }

    //weekdays
    if((inputDate.getDay() >= 1 && inputDate.getDay() <=5)) {  

        if(inputDate.getHours() >= Math.floor(timings.opens/100) && inputDate.getHours() < Math.floor(timings.closes/100)) {
            console.log("OPEN!")
            process.exit(0) //go to closes soon subroutine
        }

        if(inputDate.getHours() == Math.floor(timings.closes/100) && inputDate.getMinutes() <= timings.closes%100) {
            console.log("OPEN!")
            process.exit(0)
        }

        console.log("CLOSED!")
        let displayMsg = getClosestOpening(inputDate, timings)
        console.log(displayMsg)
    }
}





function getClosestOpening(inputDate, timings) {

    let closestOpeningTime = timings.opens; //fixed line
    let currentDOW = inputDate.getDay();
    // console.log("Currently it is =", daysOfWeek[currentDOW])
    
    let closestOpeningDay;
    if(currentDOW >= 5) {//deal better with sundays - before 10:00 am and after
        if(currentDOW == 6) {
            closestOpeningDay = 8;
            // console.log("case 1")
        }
        else if(currentDOW == 5 && inputDate.getHours()>=Math.floor(timings.closes/100)) {
            closestOpeningDay = 8;
            // console.log("case 2")
        }
        
        else {
            closestOpeningDay = 5
            // console.log("case 3")
        }
    }
    else if(currentDOW == 0) { //sunday case
        if(inputDate.getHours()<Math.floor(timings.opens/100)) {
            let msg = "Opens in 1 day";
            return msg
        }

        closestOpeningDay = 1 //monday
    }
    else { //monday to thursday case
        if(inputDate.getHours() < Math.floor(timings.opens/100)) {
            closestOpeningDay = currentDOW;
        }
        else
            closestOpeningDay = currentDOW + 1;
    }

    // console.log("Closest opening day = " + closestOpeningDay)
        




    if(closestOpeningDay == 8 || closestOpeningDay == 1) {
    
        let closestOpening = new Date(inputDate.getTime())
        closestOpening.setHours(Math.floor(closestOpeningTime/100))
        closestOpening.setMinutes(closestOpeningTime%100)
        let distance = closestOpeningDay - inputDate.getDay();
        closestOpening.setDate(closestOpening.getDate() + distance)
        // console.log(closestOpening)
    
        // console.log("rock")
        let opensIn = closestOpening - inputDate
        let opensInMsg = (opensIn / (24 * 3600 * 1000)) > 1 ? Math.floor(opensIn / (24 * 3600 * 1000)) + " days" : (opensIn / (3600 * 1000)).toFixed(2) + " hours" //FIX
        let msg = "Opens in " + opensInMsg
        return msg
    }

    else if(currentDOW>=1 && currentDOW<=5) { //should include sunday?
        let closestOpening = new Date(inputDate.getTime())
        closestOpening.setHours(Math.floor(closestOpeningTime/100))
        closestOpening.setMinutes(closestOpeningTime%100)
        if(currentDOW != closestOpeningDay)
            closestOpening.setDate(closestOpening.getDate() + 1)
        

            // console.log("stone")
        let opensIn = closestOpening - inputDate
        let opensInMsg = (opensIn / (3600 * 1000));

        let msg = "Opens in " + opensInMsg.toFixed(2) + " hours"
        return msg
    }
}

module.exports.openOrClosed = openOrClosed;
module.exports.getClosestOpening = getClosestOpening;
