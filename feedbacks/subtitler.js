class Subtitler {
    constructor(lines, audio) {
        this.lines = lines;
        this.audio = audio;
        this.cont = null;
        this.isPlaying = false;
        this.timeout = null;

        this.getCurrentElements = this.getCurrentElements.bind(this);
        this.getCurrentText = this.getCurrentText.bind(this);
        this.updateText = this.updateText.bind(this);
        this.pause = this.pause.bind(this);
        this.play = this.play.bind(this);

        this.findContainer.apply(this);
    }

    findContainer() {
        this.cont = document.querySelector('.subtitle');
        if (!this.cont) {
            const el = document.createElement('div');
            el.classList.add('subtitle');
            document.body.appendChild(el);
            this.cont = document.querySelector('.subtitle');
        }
    }

    play() {
        this.isPlaying = true;
        this.cont.classList.add('shown');
        this.updateText();
    }

    pause() {
        this.isPlaying = false;
        this.cont.classList.remove('shown');
        clearTimeout(this.timeout);
    }

    updateText() {
        const text = this.getCurrentText();
        if (this.cont.textContent !== text) {
            this.cont.textContent = text;
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