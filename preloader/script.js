function usePreloader() {
    document.body.classList.add('burger-opened');
    const preloader = document.querySelector('.preloader');
    const images = preloader.querySelector('.images');
    const imageParams = {
        left: null,
        top: null,
        width: null,
    };
    const bgParams = {
        left: 20,
        top: 20,
    };
    const progress = preloader.querySelector('.filler');
    setTimeout(() => preloader.classList.add('transition'));
    let targetImage;
    let targetBg;

    document.addEventListener('DOMContentLoaded', () => {
        targetImage = document.querySelector('.main-gif');
        targetBg = document.querySelector('.main-bg');
        waitForAutoscale();
    });
    preloader.addEventListener('touchmove', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    function shrinkPreloader() {
        preloader.classList.add('shrinking');
    }
    function moveImages() {
        images.style.top = `${imageParams.top}px`;
        images.style.left = `${imageParams.left}px`;
        images.style.width = `${imageParams.width}px`;
        images.style.height = `${imageParams.width}px`;
        images.classList.add('unshifted');
        preloader.style = `--top: ${bgParams.top}px; --left: ${bgParams.left}px;`
    }
    function fadePreloader() {
        preloader.classList.add('fading');
    }
    function removePreloader() {
        preloader.remove();
        document.body.classList.remove('burger-opened');
    }
    function chainAnimations() {
        let shrinkTime = 0;
        setProgress(100);
        if (imageParams.top) {
            shrinkPreloader();
            moveImages();
            shrinkTime = 1000;
        }
        setTimeout(fadePreloader, shrinkTime + 300);
        setTimeout(removePreloader, shrinkTime + 700);
    }
    function setProgress(percentage) {
        progress.style.width = `${percentage}%`;
    }
    function waitForAutoscale() {
        const zoomWrapper = targetImage.querySelector('.tn-atom__scale-wrapper');
        if (zoomWrapper || targetImage.style.zoom) {
            const img = targetImage.querySelector('img');
            const bg = targetBg.querySelector('.tn-atom');
            const { top, left, width } = img.getBoundingClientRect();
            if (top > 0) {
                bgCoords = bg.getBoundingClientRect();
                bgParams.top = bgCoords.top;
                bgParams.left = bgCoords.left;
                imageParams.top = top - bgParams.top;
                imageParams.left = left - bgParams.left;
                imageParams.width = width;
            }
            return chainAnimations();
        }
        setTimeout(waitForAutoscale, 100);
    }

    return setProgress;
}

const setProgress = usePreloader();