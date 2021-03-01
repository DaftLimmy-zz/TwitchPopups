// =======================================
// Command: !alert <text>
// Description: will display whatever text comes after the !alert command
// =======================================
actionHandlers['!alert'] = {
    security: (context, textContent) => {
        return context.mod || (context['badges-raw'] != null && context['badges-raw'].startsWith('broadcaster'));
    },
    handle: (context, textContent) => {
        const formattedText = popup.formatEmotes(textContent, context.emotes, true).substr(7);
        popup.showText(formattedText, alertBg);
        if (playAlertSound) {
            new Audio(alertSoundFile).play();
        }
    }
};

// =======================================
// Command: !delete
// Description: This delete command resets the whole pop up system
// =======================================
actionHandlers['!delete'] = {
    security: (context, textContent) => {
        return context.mod || (context['badges-raw'] != null && context['badges-raw'].startsWith('broadcaster'));
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
let spotlightUser = '';

actionHandlers['!spotlight'] = {
    security: (context, textContent) => {
        return context.mod || (context['badges-raw'] != null && context['badges-raw'].startsWith('broadcaster'));
    },
    handle: (context, textContent) => {
        spotlightUser = textContent.substr(12).toLowerCase();
        popup.showText(`${spotlightEmoji} Welcome ${spotlightUser} to the stage!`, spotlightBg);
    }
};

// =======================================
// Command: !gif
// Description: gif [term]: will display a random gif for the search term.
// =======================================
let gifOnScreen = false;
const gifAPIKey = ''; /* Sign up for a free key here https://tenor.com/developer/keyregistration */
const gifDefaultSearch = 'limmy'; /* Defaults to 'limmy' if no search term given */
const gifWidth = 700; /* Width of the GIF on screen */
const gifAllowUser = true; /* set to true to allow users to run this */
const gifOnScreenTime = 8; /* How long to keep this on screen in seconds */
const gifContentFilter = 'high'; /* (values: off | low | medium | high) specify the content safety filter level */
const gifMediaFilter = 'minimal'; /* minimal - tinygif, gif, and mp4. basic - nanomp4, tinygif, tinymp4, gif, mp4, and nanogif */

actionHandlers['!gif'] = {
    security: context => {
        if (!gifAllowUser) {
            return context.mod || (context['badges-raw'] != null && context['badges-raw'].startsWith('broadcaster'));
        }
        return true;
    },
    handle: (context, command) => {
        if (gifOnScreen === true) {
            return;
        }
        const search = command.substr(5);

        gifOnScreen = true;

        $.ajax({
            url: `https://g.tenor.com/v1/random?q=${search ? search : gifDefaultSearch}&key=${gifAPIKey}&limit=20&media_filter=${gifMediaFilter}&contentfilter=${gifContentFilter}`
        }).done(data => {
            if (data.results.length === 0) {
                gifOnScreen = false;
                return;
            }

            $('#gif-container').css({ 'margin-left': '5px' });

            let image = new Image();
            image.id = 'gif';
            image.width = gifWidth;
            image.src = data.results[Math.floor(Math.random() * data.results.length) + 0].media[0].tinygif.url;
            $('#gif-container').append(image);
            setTimeout(function () {
                $('#gif').remove();
                gifOnScreen = false;
            }, gifOnScreenTime * 1000);
        });
    }
};

// This handler is fired when the spotlighted user types something in chat
allHandlers.push({
    security: (context, textContent) => {
        return context.username === spotlightUser && (!textContent.startsWith('@') || textContent.startsWith('@' + twitchChannel));
    },
    handle: (context, textContent) => {
        const formattedText = popup.formatEmotes(textContent, context.emotes, false);
        popup.showText(`${spotlightEmoji} ${context['display-name']}: ${formattedText}`, spotlightBg);
    }
});
