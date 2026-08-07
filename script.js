// ================================
// PIN SETTINGS
// ================================

const PIN = '2001';
let pin = '';

function dots() {
    document.querySelectorAll('#dots i').forEach((x, i) => {
        x.classList.toggle('on', i < pin.length);
    });
}


// ================================
// MUSIC
// ================================

let playing = false;

function playMusic() {

    const audio = document.getElementById('music');

    if (!audio) {
        console.log("Audio element not found");
        return;
    }

    // Already playing
    if (!audio.paused) {
        playing = true;
        document.getElementById('musicBtn').textContent = '❚❚';
        return;
    }

    audio.play()
        .then(() => {

            playing = true;

            document.getElementById('musicBtn').textContent = '❚❚';

        })
        .catch((error) => {

            // Chrome/mobile may block autoplay
            console.log("Autoplay blocked. Music will start after user interaction.");

        });
}


// Try music automatically when website loads
window.addEventListener('load', function () {

    playMusic();

});


// Music Play / Pause Button
function toggleMusic() {

    const audio = document.getElementById('music');

    if (!audio) {
        return;
    }

    if (audio.paused) {

        audio.play()
            .then(() => {

                playing = true;

                document.getElementById('musicBtn').textContent = '❚❚';

            })
            .catch(error => {

                console.log("Music play error:", error);

            });

    } else {

        audio.pause();

        playing = false;

        document.getElementById('musicBtn').textContent = '♫';
    }
}


// ================================
// PIN BUTTON
// ================================

function press(n) {

    // Important:
    // If browser blocked autoplay,
    // first PIN click will start the music.
    playMusic();

    if (pin.length < 4) {

        pin += n;

        dots();

        document.getElementById('error').textContent = '';

        if (pin.length === 4) {

            setTimeout(check, 160);

        }
    }
}


// ================================
// CHECK PIN
// ================================

function check() {

    if (pin === PIN) {

        afterLogin();

    } else {

        document.getElementById('error').textContent =
            'Wrong PIN 💗 Try again';

        pin = '';

        dots();
    }
}


// Clear PIN
function clearPin() {

    pin = '';

    dots();

    document.getElementById('error').textContent = '';
}


// Backspace
function back() {

    pin = pin.slice(0, -1);

    dots();
}


// ================================
// PAGE NAVIGATION
// ================================

function go(id) {

    document.querySelectorAll('.page').forEach(x => {
        x.classList.remove('active');
    });

    document.getElementById(id).classList.add('active');
}


// ================================
// CAKE CANDLE
// ================================

function blow() {

    document.getElementById('flame').style.display = 'none';

    document.getElementById('hint').textContent =
        'Wish made! ✨';

    document.getElementById('finalBtn')
        .classList.remove('hidden');

    burst();
}


// ================================
// CONFETTI
// ================================

const c = document.getElementById('confetti');

const x = c.getContext('2d');

let ps = [];


function rs() {

    c.width = innerWidth;

    c.height = innerHeight;
}


rs();

addEventListener('resize', rs);


function burst() {

    for (let i = 0; i < 130; i++) {

        ps.push({

            x: innerWidth / 2,

            y: innerHeight * .35,

            vx: (Math.random() - .5) * 11,

            vy: -Math.random() * 9 - 2,

            g: .17,

            s: Math.random() * 7 + 3,

            r: Math.random() * 6.2
        });
    }
}


(function anim() {

    x.clearRect(
        0,
        0,
        c.width,
        c.height
    );


    ps.forEach(p => {

        p.x += p.vx;

        p.y += p.vy;

        p.vy += p.g;

        p.r += .08;


        x.save();

        x.translate(
            p.x,
            p.y
        );

        x.rotate(p.r);


        x.fillStyle =
            `hsl(${(p.x + p.y) % 360},85%,70%)`;


        x.fillRect(
            -p.s / 2,
            -p.s / 2,
            p.s,
            p.s
        );


        x.restore();

    });


    ps = ps.filter(
        p => p.y < innerHeight + 30
    );


    requestAnimationFrame(anim);

})();


// ================================
// BIRTHDAY COUNTDOWN
// ================================

// IMPORTANT:
//
// JavaScript months start from 0:
//
// January   = 0
// February  = 1
// March     = 2
// April     = 3
// May       = 4
// June      = 5
// July      = 6
// August    = 7
// September = 8
// October   = 9
//
// Below date =
// 8 September 2026, 12:00 AM

const BIRTHDAY = new Date(
    2026,
    8,
    8,
    0,
    0,
    0
);


let countdownTimer = null;


// ================================
// AFTER LOGIN
// ================================

function afterLogin() {

    // Keep music running
    playMusic();


    if (new Date() >= BIRTHDAY) {

        go('intro');

        burst();

    } else {

        go('countdown');

        updateCountdown();


        if (countdownTimer) {

            clearInterval(countdownTimer);

        }


        countdownTimer =
            setInterval(
                updateCountdown,
                1000
            );
    }
}


// ================================
// UPDATE COUNTDOWN
// ================================

function updateCountdown() {

    let diff =
        BIRTHDAY - new Date();


    // Birthday has arrived
    if (diff <= 0) {

        if (countdownTimer) {

            clearInterval(
                countdownTimer
            );
        }


        go('intro');

        burst();

        return;
    }


    // DAYS
    const d =
        Math.floor(
            diff / 86400000
        );


    diff %= 86400000;


    // HOURS
    const h =
        Math.floor(
            diff / 3600000
        );


    diff %= 3600000;


    // MINUTES
    const m =
        Math.floor(
            diff / 60000
        );


    diff %= 60000;


    // SECONDS
    const s =
        Math.floor(
            diff / 1000
        );


    document.getElementById('days')
        .textContent =
        String(d).padStart(2, '0');


    document.getElementById('hours')
        .textContent =
        String(h).padStart(2, '0');


    document.getElementById('minutes')
        .textContent =
        String(m).padStart(2, '0');


    document.getElementById('seconds')
        .textContent =
        String(s).padStart(2, '0');
}