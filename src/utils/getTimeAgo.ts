import dayjs from 'dayjs';
import 'dayjs/locale/es'

dayjs.locale('es');

export const getTimeAgo = (date: dayjs.Dayjs) => {

    const secondsAgo = dayjs().diff(date, 'second');
    const minutesAgo = dayjs().diff(date, 'minutes');
    const hoursAgo = dayjs().diff(date, 'hours');
    const daysAgo = dayjs().diff(date, 'days');
    const weeksAgo = dayjs().diff(date, 'weeks');
    const monthsAgo = dayjs().diff(date, 'months');
    const yearsAgo = dayjs().diff(date, 'years');

    if (secondsAgo < 60){
        return `Hace ${ secondsAgo } segundos.`;
    }
    else if (minutesAgo < 60){
        return `Hace ${ minutesAgo } minutos.`;
    }
    else if (hoursAgo < 24){
        return `Hace ${ hoursAgo } horas.`;
    }
    else if (daysAgo < 7){
        return `Hace ${ daysAgo } días.`;
    }
    else if (weeksAgo < 4){
        return `Hace ${ weeksAgo } semanas.`;
    }
    else if (monthsAgo < 12){
        return `Hace ${ monthsAgo } meses.`;
    }
    else {
        return `Hace ${ yearsAgo } años.`;
    }
}
