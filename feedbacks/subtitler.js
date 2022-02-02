class Subtitler {
    constructor(lines, audio) {
        this.lines = lines;
        this.audio = audio;
        this.cont = null;
        this.textCont = null;
        this.playPauseIcon = null;
        this.closeIcon = null;
        this.isPlaying = false;
        this.timeout = null;

        this.getCurrentElements = this.getCurrentElements.bind(this);
        this.getCurrentText = this.getCurrentText.bind(this);
        this.updateText = this.updateText.bind(this);
        this.pause = this.pause.bind(this);
        this.play = this.play.bind(this);
        this.close = this.close.bind(this);
        this.playPause = this.playPause.bind(this);

        this.findContainer.apply(this);
    }

    findContainer() {
        this.cont = document.querySelector('.subtitle');
        this.textCont = this.cont.querySelector('.subtitle__text');
        this.playPauseIcon = this.cont.querySelector('.subtitle__controls');
        this.closeIcon = this.cont.querySelector('.subtitle__close');

        if (!listenersAdded) {
            this.playPauseIcon.addEventListener('click', this.playPause);
            this.closeIcon.addEventListener('click', this.close);
            listenersAdded = true;
        }
    }

    play() {
        this.isPlaying = true;
        this.cont.classList.add('shown');
        this.updateText();
        this.playPauseIcon.classList.remove('play');
        this.playPauseIcon.classList.add('pause');
    }

    pause() {
        this.isPlaying = false;
        clearTimeout(this.timeout);
        this.playPauseIcon.classList.add('play');
        this.playPauseIcon.classList.remove('pause');
    }

    close() {
        if (this.isPlaying) {
            currentFeedback.pause();
            this.pause();
        }
        this.cont.classList.remove('shown');
    }

    playPause() {
        if (this.isPlaying) {
            currentFeedback.pause();
            this.pause();
        } else {
            currentFeedback.play();
            this.play();
        }
    }

    updateText() {
        const text = this.getCurrentText();
        if (this.textCont.textContent !== text) {
            this.textCont.textContent = text;
        }
        if (this.isPlaying) {
            this.timeout = setTimeout(this.updateText, 150);
        }
    }

    getCurrentText() {
        const elements = this.getCurrentElements();
        return elements.reduce((text, el) => text += el.text, '');
    }

    getCurrentElements() {
        const time = this.audio.currentTime;
        let appropriateElements = [];
        for (let i = 0; i < this.lines.length; i++) {
            const line = this.lines[i];

            if (line.time >= time) {
                return appropriateElements;
            }
            
            if (line.break) {
                appropriateElements = [];
            } else {
                appropriateElements.push(line);
            }
        }
        return appropriateElements;
    }
}