import { useState, useEffect } from 'react';
import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es');

export const useTimeAgo = (date: dayjs.Dayjs) => {
    const [timeAgo, setTimeAgo] = useState<string>();

    const secondsAgo = dayjs().diff(date, 'seconds');
    const minutesAgo = dayjs().diff(date, 'minutes');
    const hoursAgo = dayjs().diff(date, 'hours');
    const daysAgo = dayjs().diff(date, 'days');
    const weeksAgo = dayjs().diff(date, 'weeks');
    const monthsAgo = dayjs().diff(date, 'months');
    const yearsAgo = dayjs().diff(date, 'years');

    useEffect(() => {
        if (!timeAgo){
            if (secondsAgo < 60){
                setTimeAgo(`Hace ${ secondsAgo } segundos.`);
            }
            else if (minutesAgo < 60){
                setTimeAgo(`Hace ${ minutesAgo } minutos.`);
            }
            else if (hoursAgo < 24){
                setTimeAgo(`Hace ${ hoursAgo } horas.`);
            }
            else if (daysAgo < 7){
                setTimeAgo(`Hace ${ daysAgo } días.`);
            }
            else if (weeksAgo < 4){
                setTimeAgo(`Hace ${ weeksAgo } semanas.`);
            }
            else if (monthsAgo < 12){
                setTimeAgo(`Hace ${ monthsAgo } meses.`);
            }
            else {
                setTimeAgo(`Hace ${ yearsAgo } años.`);
            }
        }

    }, [date]);

    return {
        timeAgo
    }
}
