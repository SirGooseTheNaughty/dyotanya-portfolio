let currentFeedback = null;
let listenersAdded = false;

class Feedback {
    constructor(id, link, subs, pinWidth = 3) {
        this.id = id;
        this.block = document.querySelector('#' + id);
        this.icon = this.block.querySelector('.icon');
        this.track = this.block.querySelector('.tracks');
        this.trackDefault = this.block.querySelector('.track.default');
        this.trackColor = this.block.querySelector('.track.colored');
        this.link = this.getAudioLink(link);
        this.pinWidth = pinWidth;
        this.audio = null;
        this.subtitler = null;

        this.event = new CustomEvent('playFeedback', { which: this.id });

        this.embedAudio.apply(this);
        this.addPins.apply(this);
        if (subs) {
            this.subtitler = new Subtitler(subs, this.audio);
        }

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.showProgress = this.showProgress.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.stopByAnotherFeedback = this.stopByAnotherFeedback.bind(this);
        this.icon.addEventListener('click', this.togglePlay.bind(this));
        this.track.addEventListener('click', this.changeTime);
        this.track.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.track.addEventListener('mousemove', this.changeTime);
        });
        this.track.addEventListener('mouseup', () => {
            this.track.removeEventListener('mousemove', this.changeTime);
        });
        window.addEventListener('playFeedback', this.stopByAnotherFeedback);
    }

    stopByAnotherFeedback(e) {
        if (!this.audio.paused && e.which !== this.id) {
            this.pause();
        }
    }

    getAudioLink(link) {
        let playLink = 'https://docs.google.com/uc?export=download&id=';
    
        try {
            const audioId = link.split('d/')[1].split('/')[0];
            playLink += audioId;
            return playLink;
        } catch(e) {
            this.icon.classList.add('error');
            console.error('Не получилось выделить ссылку на файл');
            return null;
        }
    }

    embedAudio() {
        const audioTag = `<audio id="${this.id}-audio" class="feedback-audio"><source src="${this.link}" type="audio/mpeg"></audio>`;
        $('body').append(audioTag);
        this.audio = document.querySelector(`#${this.id}-audio`);
    }

    addPins() {
        const width = this.track.offsetWidth;
        const pinNumber = Math.floor((width + this.pinWidth) / (2 * this.pinWidth));
        this.trackDefault.innerHTML = '';
        this.trackColor.innerHTML = '';
        for (let i = 0; i < pinNumber; i++) {
            const pin1 = document.createElement('span');
            const pin2 = document.createElement('span');
            let pinHeight = Math.floor(Math.random() * 100);
            if (pinHeight < 30) {
                pinHeight += 30;
            }
            if (this.pinWidth !== 3) {
                pin1.style.width = this.pinWidth + 'px';
                pin2.style.width = this.pinWidth + 'px';
                pin1.style.marginRight = this.pinWidth + 'px';
                pin2.style.marginRight = this.pinWidth + 'px';
            }
            pin1.style.height = pinHeight + '%';
            pin2.style.height = pinHeight + '%';
            this.trackDefault.appendChild(pin1);
            this.trackColor.appendChild(pin2);
        }
    }

    play() {
        currentFeedback = this;
        window.dispatchEvent(this.event);
        this.audio.play();
        this.block.classList.remove('paused');
        this.block.classList.add('playing');
        this.icon.classList.remove('play');
        this.icon.classList.add('pause');
        this.showProgress();
        this.subtitler.play();
    }

    pause() {
        this.audio.pause();
        this.subtitler.pause();
        this.block.classList.remove('playing');
        this.block.classList.add('paused');
        this.icon.classList.remove('pause');
        this.icon.classList.add('play');
    }

    togglePlay() {
        if (this.audio.paused) {
            this.play()
        } else {
            this.pause();
        }
    }

    showProgress() {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.trackColor.style.clipPath = `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`;
        !this.audio.paused && requestAnimationFrame(this.showProgress);
    }

    changeTime(e) {
        e.preventDefault();
        const progress = e.layerX / this.track.offsetWidth;
        this.audio.currentTime = this.audio.duration * progress;
        this.showProgress();
    }
}