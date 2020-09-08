import format from 'date-format'

export const formatDate = (timestamp, longDate = false) => {
    const date = new Date(timestamp)
    const today = new Date()

    if (format('dd/MM/yyyy', date) === format('dd/MM/yyyy', today)) {
        return format('hh:mm', date)
    } else if (!longDate) {
        return format('dd/MM/yyyy', date)
    } else {
        return format('hh:mm dd/MM/yyyy', date)
    }
}