class Steps {
    constructor(blockId) {
        this.block = document.querySelector(blockId);
        this.triggers = document.querySelectorAll('.steps-trigger, .steps-closer');
        this.closer = this.block.querySelector('.t396__filter');
        this.steps = document.querySelectorAll('.step');
        this.zone = document.querySelector('.dragzone');
        this.dragStart = this.dragStart.bind(this);
        this.dragOver = this.dragOver.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.toggleBlock = this.toggleBlock.bind(this);
        this.checkScaleAndRescale = this.checkScaleAndRescale.bind(this);
        this.removeJumper = this.removeJumper.bind(this);
        this.reverseScale = 1;
        this.current = null;
        this.layerX = null;
        this.layerY = null;
        this.dragged = false;

        this.block.classList.add('steps-block');
        this.block.querySelector('div').style.height = '100% !important';
        this.block.querySelector('div').firstElementChild.style.height = '100% !important';
        setTimeout(() => this.block.classList.add('transition'));
        this.closer.style.cursor = 'pointer';
        this.closer.addEventListener('click', this.toggleBlock);
        this.triggers.forEach(trigger => {
            trigger.style.cursor = 'pointer';
            trigger.addEventListener('click', this.toggleBlock);
        });

        this.steps.forEach((step, i) => {
            step.addEventListener('dragstart', this.dragStart);
            step.addEventListener('touchstart', this.dragStart);
            step.addEventListener('touchend', this.dragEnd);
        });

        this.zone.addEventListener('touchmove', this.dragOver);
        this.zone.addEventListener('dragover', this.dragOver);
        this.zone.addEventListener('drop', this.dragEnd);
        setTimeout(this.checkScaleAndRescale, 2000);
    }

    removeJumper() {
        if (!this.dragged) {
            const jumper = this.block.querySelector('.jumping');
            if (jumper) {
                jumper.classList.remove('jumping');
            }
            this.dragged = true;
        }
    }

    dragStart(e) {
        this.removeJumper();
        if (this.current) {
            this.current.classList.remove('current');
            this.current.classList.remove('topped');
        }
        this.current = e.currentTarget;
        this.current.classList.add('current');
        this.current.classList.add('topped');
        if (e.touches) {
            const { top, left } = this.current.getBoundingClientRect();
            const [touch] = e.touches;
            this.layerX = touch.clientX - left;
            this.layerY = touch.clientY - top;
        } else {
            this.layerX = e.layerX;
            this.layerY = e.layerY;
        }
    }
    dragOver(e) {
        e.preventDefault();
        const clientCoordSource = e.touches ? e.touches[0] : e;
        const { clientX, clientY } = clientCoordSource;
        const { top, left } = this.zone.getBoundingClientRect();
        this.current.style.top = `${(clientY - top - this.layerY)}px`;
        this.current.style.left = `${(clientX - left - this.layerX)}px`;
    }
    dragEnd(e) {
        e.preventDefault();
        this.current.classList.remove('current');
        this.current.classList.add('visited');
    }
    checkScaleAndRescale() {
        const scaleCont = this.zone.closest('.tn-atom__scale-wrapper');
        let scale = 1, type = 'scale';
        if (scaleCont) {
            scale = parseFloat(scaleCont.style.transform.split('(')[1])
        } else {
            const zoomCont = this.zone.closest('.t396__elem');
            scale = parseFloat(zoomCont.style.zoom);
            type = 'zoom';
        }
        if (1 / scale !== this.reverseScale) {
            this.reverseScale = 1 / scale;
            if (type === 'scale') {
                this.zone.style.transform = `scale(${this.reverseScale})`;
            } else {
                this.zone.style.zoom = this.reverseScale;
            }
        }
        setTimeout(this.checkScaleAndRescale, 1000);
    }
    toggleBlock() {
        if (this.block.classList.contains('shown')) {
            this.block.classList.remove('shown');
            document.body.classList.remove('steps-opened');
        } else {
            this.block.classList.add('shown');
            document.body.classList.add('steps-opened');
        }
    }
}