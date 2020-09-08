const formatAMPM = (date) => {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes
    return hours + ':' + minutes + ' ' + ampm
}

const formatDate = (date) => {
    let day = date.getDate()
    let month = date.getMonth() + 1
    const year = date.getFullYear()

    day = day < 10 ? '0' + day : day
    month = month < 10 ? '0' + month : month

    return day + "/" + month + "/" + year
}

export const dateFormat = (timestamp, longDate = false) => {
    const date = new Date(timestamp)
    const today = new Date()

    if (formatDate(date) === formatDate(today)) {
        return formatAMPM(date)
    } else if (!longDate) {
        return formatDate(date)
    } else {
        return formatDate(date) + " " + formatAMPM(date)
    }
}
