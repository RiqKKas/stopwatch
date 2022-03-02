function resizeWindow() {
    const mainContainer = document.querySelector('.container');
    const body = document.querySelector('body');

    if (body.clientHeight < mainContainer.clientHeight) {
        body.style.display = 'block';
    } else if (body.clientHeight > mainContainer.clientHeight) {
        body.style.display = 'flex';
    }
}

window.addEventListener('resize', resizeWindow);

class Timer {
    constructor(clockSelector, resultSelector, startButtonSelector, pauseButtonSelector, resetButtonSelector) {
        this.clock = document.querySelector(clockSelector);
        this.result = document.querySelector(resultSelector);
        this.startButton = document.querySelector(startButtonSelector,);
        this.pauseButton = document.querySelector(pauseButtonSelector);
        this.resetButton = document.querySelector(resetButtonSelector);
        this.timerMotor = null;
        this.running = false;
    }

    startTimer() {
        this.result.innerHTML = '';

        if (!this.running) {
            this.timerMotor = setInterval(() => {
                const time = this.clock.innerHTML.split(':');
                for (let i in time) time[i] = parseInt(time[i]);

                if (time[2] < 60) {
                    time[2]++;
                } else if (time[1] < 60) {
                    time[1]++;
                    time[2] = 0;
                } else {
                    time[0]++;
                    time[1] = 0;
                }

                this.clock.innerHTML = this.formatTime(time);
            }, 1000);

            this.startButton.disabled = true;
            this.pauseButton.disabled = false;
            this.resetButton.disabled = false;
            this.running = true;
        }
    }

    pauseTimer() {
        clearInterval(this.timerMotor);
        this.startButton.disabled = false;
        this.pauseButton.disabled = true;
        this.running = false;
    }

    resetTimer() {
        this.pauseTimer();
        this.resetButton.disabled = true;
        this.result.innerHTML = `Tempo Gasto: ${this.clock.innerHTML}`;
        this.clock.innerHTML = this.formatTime([]);
    }

    formatTime([hours = 0, minutes = 0, seconds = 0]) {
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        hours = hours < 10 ? `0${hours}` : hours;

        return `${hours}:${minutes}:${seconds}`;
    }
}

const timer = new Timer('#clock','#time-spent', '#startButton', '#pauseButton', '#resetButton');

timer.startButton.addEventListener('click', timer.startTimer.bind(timer));
timer.pauseButton.addEventListener('click', timer.pauseTimer.bind(timer));
timer.resetButton.addEventListener('click', timer.resetTimer.bind(timer));