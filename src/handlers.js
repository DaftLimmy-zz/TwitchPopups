// =======================================
// Command: !alert <text>
// Description: will display whatever text comes after the !alert command
// =======================================
actionHandlers['!alert'] = {
    security: (context, textContent) => {
        return context.mod || (context["badges-raw"] != null && context["badges-raw"].startsWith("broadcaster"))
    },
    handle: (context, textContent) => {
        const formattedText = popup.formatEmotes(textContent, context.emotes, true).substr(7);
        popup.showText(formattedText, alertBg);
    }
};


// =======================================
// Command: !delete
// Description: This delete command resets the whole pop up system
// =======================================
actionHandlers['!delete'] = {
    security: (context, textContent) => {
        return context.mod || (context["badges-raw"] != null && context["badges-raw"].startsWith("broadcaster"))
    },
    handle: (context, textContent) => {
        popup.delete();
        // TODO : loop through objects calling its own state reset function
    }
};


// =======================================
// Command: !spotlight
// Description: spotlight [@username]: will display the chat of the specified user from that point on
// =======================================
var spotlightUser = "";

actionHandlers['!spotlight'] = {
    security: (context, textContent) => {
        return context.mod || (context["badges-raw"] != null && context["badges-raw"].startsWith("broadcaster"))
    },
    handle: (context, textContent) => {
        spotlightUser = textContent.substr(12).toLowerCase();
        popup.showText(`${spotlightEmoji} Welcome ${spotlightUser} to the stage!`, spotlightBg);
    }
};

// This handler is fired when the spotlighted user types something in chat
allHandlers.push({
    security: (context, textContent) => {
        return context.username === spotlightUser && (!textContent.startsWith('@') || textContent.startsWith('@' + twitchChannel))
    },
    handle: (context, textContent) => {
        const formattedText = popup.formatEmotes(textContent, context.emotes, false);
        console.log(formattedText);
        popup.showText(`${spotlightEmoji} ${context['display-name']}: ${formattedText}`, spotlightBg);
    }
});

// =======================================
// Command: !countdown <interval> <message>
// Description: Will display a countdown on the screen with a given message
// =======================================
var countdown = 0;
var countdownIntervalId = null;

actionHandlers['!countdown'] = {
    security: (context, textContent) => {
        return context.mod || (context["badges-raw"] != null && context["badges-raw"].startsWith("broadcaster"))
    },
    handle: (context, textContent) => {
        var hours, minutes, seconds, first = true;

        // Pull from message
        const input = popup.formatEmotes(textContent, context.emotes, false).split(" ");
        const interval = input[1] || "2m";
        var message = input.length >= 2 ? input.slice(2, input.length).join(" ") : "";

        if (message.length > 0) {
            message = message + ': ';
        }

        // Work out interval
        switch (interval.slice(-1).toLowerCase()) {
            case 's':
                countdown = parseFloat(interval.substr(0, interval.length - 1), 10);
                break;
            case 'm':
                countdown = parseFloat(interval.substr(0, interval.length - 1), 10) * 60;
                break;
            case 'h':
                countdown = parseFloat(interval.substr(0, interval.length - 1), 10) * 60 * 60;
                break;
        }

        // Remove the previous countdown incase there is a parallel runner
        if (countdownIntervalId != null) {
            clearInterval(countdownIntervalId);
            countdownIntervalId = null;
        }

        // Every second work out the countdown
        countdownIntervalId = setInterval(() => {
            hours = parseInt(countdown / 60 / 60, 10);
            minutes = parseInt((countdown / 60) % 60, 10);
            seconds = parseInt(countdown % 60, 10);
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            if (--countdown < 0) {
                clearInterval(countdownIntervalId);
                popup.showText(message + countdownCompleteMessage, alertBg, first);
            } else {
                if (hours > 0) {
                    popup.showText(message + hours + ":" + minutes + ":" + seconds, alertBg, first);
                } else if (minutes > 0) {
                    popup.showText(message + minutes + ":" + seconds, alertBg, first);
                } else {
                    popup.showText(message + seconds, alertBg, first);
                }

                first = false;
            }
        }, 1000);
    }
};