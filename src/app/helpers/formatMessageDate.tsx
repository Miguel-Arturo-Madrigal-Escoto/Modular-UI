

export const formatMessageDate = (timestamp: Date) => {
    const messageDate = new Date(timestamp);
        const formattedDate = messageDate.toLocaleString('es-MX', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    const dateParts = formattedDate.split(',');
    return `${dateParts[1]}, ${dateParts[0]}`;
}
