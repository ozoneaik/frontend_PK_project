export const FormatDateToTH = (date) => {
    let date_format

    try {
        if (date === null || date === undefined)  throw "Invalid date format";
        date_format = date;
        date_format = new Date(date_format).toLocaleString('th-Th');
    } catch (e) {
        date_format = '-';
    }
    return date_format;
}