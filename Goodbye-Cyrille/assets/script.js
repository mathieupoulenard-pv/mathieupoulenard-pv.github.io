function makeTimer() {

    // Set the date we're counting down to
	var endTime = new Date("07/02/2021 12:00:00");
	endTime = (Date.parse(endTime) / 1000);

    // Get today's date and time
    var now = new Date();
    now = (Date.parse(now) / 1000);

    // Get time between now and count down date
    var timeLeft = endTime - now;

    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (hours < "10") { hours = "0" + hours; }
    if (minutes < "10") { minutes = "0" + minutes; }
    if (seconds < "10") { seconds = "0" + seconds; }

    // Manage plural
    var daysText = 'Jours';
    var hoursText = 'Heures';
    var minutesText = 'Minutes';
    var secondsText = 'Secondes';
    if(days < "2") { daysText = 'Jour'; }
    if(hours < "02") { hoursText = 'Heure'; }
    if(minutes < "02") { minutesText = 'Minute'; }
    if(seconds < "02") { secondsText = 'Seconde'; }

    // Display result in html
    $("#days").children().html('<div class="number">' + days + '</div>' + '<div class="text">' + daysText + '</div>');
    $("#hours").children().html('<div class="number">' + hours + '</div>' + '<div class="text">' + hoursText + '</div>');
    $("#minutes").children().html('<div class="number">' + minutes + '</div>' + '<div class="text">' + minutesText + '</div>');
    $("#seconds").children().html('<div class="number">' + seconds + '</div>' + '<div class="text">' + secondsText + '</div>');

    // Manage end og count down
    if(timeLeft < 0) {
        clearInterval(interval);
        $("#countdown-wrap").remove();
        $("#access").show();
    }

}

var interval = setInterval(function() { makeTimer(); }, 1000);