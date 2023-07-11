let time = 0;
let Title = 'oulsie';
let direction = true;
aniTitle = setInterval(function() {
    if (time == Title.length) direction = false;
    if (time == false) direction = true;
    time = (direction == true) ? ++time : --time;
    updateTitle = (time == 0) ? "" : Title.slice(0, time);
    document.title = 's' + updateTitle;
}, 400)
