let setProgress = () => {};
function usePreloader() {
    document.body.style.overflow = 'hidden';
    const preloader = document.querySelector('.preloader');
    const bgParams = { shrink: false, left: 20, top: 20, };
    const progress = preloader.querySelector('.filler');
    let targetBg;

    document.addEventListener('DOMContentLoaded', () => {
        targetBg = document.querySelector('.main-bg');
        waitForAutoscale();
    });
    preloader.addEventListener('touchmove', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    function shrinkPreloader() {
        preloader.style = `--left: ${bgParams.left}px; --top: ${bgParams.top}px;`
        preloader.classList.add('shrinking');
    }
    function fadePreloader() {
        preloader.classList.add('fading');
    }
    function removePreloader() {
        preloader.remove();
        document.body.style.overflow = 'auto';
    }
    function chainAnimations() {
        let shrinkTime = 0;
        setProgress(100);
        preloader.classList.add('transition');
        if (bgParams.shrink) {
            shrinkPreloader();
            shrinkTime = 1000;
        }
        setTimeout(fadePreloader, shrinkTime + 300);
        setTimeout(removePreloader, shrinkTime + 700);
    }
    function setProgress(percentage) {
        progress.style.width = `${percentage}%`;
    }
    function waitForAutoscale() {
        const zoomWrapper = targetBg.querySelector('.tn-atom__scale-wrapper');
        if (zoomWrapper || targetBg.style.zoom) {
            const bg = targetBg.querySelector('.tn-atom');
            if ($(window).scrollTop() < 40) {
                const { top, left } = bg.getBoundingClientRect();
                bgParams.top = top;
                bgParams.left = left;
                bgParams.shrink = true;
            }
            return chainAnimations();
        }
        setTimeout(waitForAutoscale, 100);
    }

    return setProgress;
}

setProgress = usePreloader();