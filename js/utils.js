// Function that converts time to hour in am or pm
export function getTimeByHour(hour){
    if (hour === 0) {
        return `12am`
    } else if (hour > 0 && hour < 12) {
        return `${hour}am`;
    } else if (hour === 12) {
        return `${hour}pm`
    }
    else {
        return `${hour % 12}pm`;
    }
}

// Function that converts time to minute in am or pm
export function getTimeByMinute(hour, minute){
    // Adding leading 0 if minute is less than
    if (minute < 10) {
        minute = `0${minute}`;
    }

    // Converting time to hour
    if (hour === 0) {
        return `12:${minute}am`
    } else if (hour > 0 && hour < 12) {
        return `${hour}:${minute}am`;
    } else if (hour === 12) {
        return `${hour}:${minute}pm`
    }
    else {
        return `${hour % 12}:${minute}pm`;
    }
}

// Function that converts to the correct day of the week
export function getDayOfWeek(val){
    const daysOfWeek = [{
        abbr: "Sun",
        full: "Sunday"
    }, {
        abbr: "Mon",
        full: "Monday"
    }, {
        abbr: "Tue",
        full: "Tuesday"
    }, {
        abbr: "Wed",
        full: "Wednesday"
    }, {
        abbr: "Thu",
        full: "Thursday"
    }, {
        abbr: "Fri",
        full: "Friday"
    }, {
        abbr: "Sat",
        full: "Saturday"
    }]
    return daysOfWeek[val];
}

// Function that converts to the wind speed degrees to the wind speed direction shown on compas
export function getWindSpeedDirection(val) {
    const windSpeedDirection = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
    const index = Math.round(val / 22.5);
    return windSpeedDirection[index];
}
