import { animateScroll } from 'react-scroll'

export const scrollToBottom = (containerId: string) => {
    setTimeout(() => {
        animateScroll.scrollToBottom({
            containerId,
            duration: 0
        })
    }, 10);
}

export const scrollToBottomAnimated = (containerId: string) => {
    setTimeout(() => {
        animateScroll.scrollToBottom({
            containerId,
            duration: 250
        })
    }, 10);
}
