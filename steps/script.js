class Steps {
    constructor() {
        this.steps = document.querySelectorAll('.step');
        this.zone = document.querySelector('.dragzone');
        this.dragStart = this.dragStart.bind(this);
        this.dragOver = this.dragOver.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.current = null;
        this.layerX = null;
        this.layerY = null;

        this.steps.forEach((step, i) => {
            step.addEventListener('dragstart', this.dragStart);
        });

        this.zone.addEventListener('dragover', this.dragOver);
        this.zone.addEventListener('drop', this.dragEnd);
    }

    dragStart(e) {
        const { layerX, layerY } = e;
        if (this.current) {
            this.current.classList.remove('current');
            this.current.classList.remove('topped');
        }
        this.current = e.currentTarget;
        this.current.classList.add('current');
        this.current.classList.add('topped');
        this.layerX = layerX;
        this.layerY = layerY;
    }
    dragOver(e) {
        e.preventDefault();
        const { clientX, clientY } = e;
        this.current.style.top = `${clientY - this.layerY}px`;
        this.current.style.left = `${clientX - this.layerX}px`;
    }
    dragEnd(e) {
        e.preventDefault();
        this.current.classList.remove('current');
        this.current.classList.add('visited');
    }
}

const steps = new Steps();