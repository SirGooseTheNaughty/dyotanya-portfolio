class Subtitler {
    constructor(lines, feedback) {
        this.lines = lines;
        this.feedback = feedback;
        this.audio = feedback.audio;
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
        if (!this.cont) {
            $('body').append(`
                <div class="subtitle">
                    <div class="subtitle__text"></div>
                    <div class="subtitle__controls pause"><div class="icon"></div></div>
                    <div class="subtitle__close">
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.10355 0.396447C0.908291 0.201184 0.591709 0.201184 0.396447 0.396447C0.201184 0.591709 0.201184 0.908291 
                            0.396447 1.10355L1.10355 0.396447ZM7.70895 8.41605C7.90421 8.61132 8.22079 8.61132 8.41605 8.41605C8.61132 8.22079 
                            8.61132 7.90421 8.41605 7.70895L7.70895 8.41605ZM8.41605 1.10355C8.61132 0.908291 8.61132 0.591709 8.41605 
                            0.396447C8.22079 0.201184 7.90421 0.201184 7.70895 0.396447L8.41605 1.10355ZM0.396447 7.70895C0.201184 7.90421 
                            0.201184 8.22079 0.396447 8.41605C0.591709 8.61132 0.908291 8.61132 1.10355 8.41605L0.396447 7.70895ZM0.396447 
                            1.10355L4.0527 4.7598L4.7598 4.0527L1.10355 0.396447L0.396447 1.10355ZM4.0527 4.7598L7.70895 8.41605L8.41605 
                            7.70895L4.7598 4.0527L4.0527 4.7598ZM4.7598 4.7598L8.41605 1.10355L7.70895 0.396447L4.0527 4.0527L4.7598 
                            4.7598ZM7.70895 0.396447L0.396447 7.70895L1.10355 8.41605L8.41605 1.10355L7.70895 0.396447Z" fill="#81AED9"/>
                        </svg>
                    </div>
                </div>
            `);
            this.cont = document.querySelector('.subtitle');
            this.textCont = this.cont.querySelector('.subtitle__text');
            this.playPauseIcon = this.cont.querySelector('.subtitle__controls');
            this.closeIcon = this.cont.querySelector('.subtitle__close');

            this.playPauseIcon.addEventListener('click', this.playPause);
            this.closeIcon.addEventListener('click', this.close);
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
            this.feedback.pause();
            this.pause();
        }
        this.cont.classList.remove('shown');
    }

    playPause() {
        if (this.isPlaying) {
            this.feedback.pause();
            this.pause();
        } else {
            this.feedback.play();
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