let buttonColours = ['red', 'green', 'blue', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

if(!started) {
    $(document).keypress(function () {
        nextSequence();
    });
    started = true;
}

$('.btn').on('click', function () {
       let userChosenColour = this.id;
       userClickedPattern.push(userChosenColour);
       playSound(userChosenColour);
       animatePress(userChosenColour);

       let currentLevel = userClickedPattern.length - 1;
       checkAnswer(currentLevel);
    });

function nextSequence() {
    userClickedPattern = [];
    level += 1;
    $('#level-title').html(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed');
    setTimeout(function() {
        $(`#${currentColour}`).removeClass('pressed');
    }, 100)
}

function playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        $('#level-title').html('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
