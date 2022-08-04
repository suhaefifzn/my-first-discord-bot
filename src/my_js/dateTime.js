const dayNames = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
const monthNames = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

function displayDayName(date) {
    return dayNames[date.getDay()];
}

function numOfDay(date) {
    let dayNum = date.getDate();
    if (dayNum < 10) {
        dayNum = '0' + dayNum;
        return dayNum;
    }
    return dayNum;
}

function displayMonthName(date) {
    return monthNames[date.getMonth()];
}

function fullYear(date) {
    return date.getFullYear();
}

function setHour(date) {
    let hour = date.getHours();
    if (hour < 10) {
        hour = '0' + hour;
        return hour;
    }
    return hour;
}

function setMinute(date) {
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = '0' + minute;
        return minute;
    }
    return minute;
}

function setTimeZone(date) {
    const timeZone = date.toLocaleDateString(undefined, { day: '2-digit', timeZoneName: 'short' }).substring(4);
    return timeZone;
}

function cleanDateTime(dateRaw) {
    const dayName = displayDayName(dateRaw);
    const dayNum = numOfDay(dateRaw);
    const monthName = displayMonthName(dateRaw);
    const year = fullYear(dateRaw);
    const hour = setHour(dateRaw);
    const minute = setMinute(dateRaw);
    const timeZone = setTimeZone(dateRaw);

    const getFullDateTime = dayName + ', ' + dayNum + ' ' + monthName + ' '
        + year + ' ' + hour + ':' + minute + ' ' + timeZone;

    return getFullDateTime;
}

module.exports = { cleanDateTime };