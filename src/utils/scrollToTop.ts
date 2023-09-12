import { animateScroll } from 'react-scroll'

export const scrollToTopAnimated = (containerId: string) => {
    setTimeout(() => {
        animateScroll.scrollToTop({
            containerId,
            duration: 500
        })
    }, 10);
}
