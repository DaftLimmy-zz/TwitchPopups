// Pixels per second
const scrollSpeed = 300;
// Delay in seconds before scrolling starts
const scrollStartDelay = 2;
// Delay in seconds after scrolling ends
const scrollEndDelay = 3;
// Time taken in seconds for text to fade in and out
// Must be less than scrollStartDelay and scrollEndDelay
const scrollTextFadeTime = 0.5;

const roundTenth = (num) => Math.round(num * 10) / 10;

const popupScrollStyle = document.createElement('style');
document.head.appendChild(popupScrollStyle);

const popup = {
    /**
     * Displays popup on screen with the given text and colour.
     *
     * If the text causes the popup to overflow, it will be scrolled.
     */
    showText: (text, bgColour) => {
        const popupBox = document.getElementById('popupbox');
        const popupText = document.getElementById('popuptext');
        popupText.innerHTML = text;

        // Set the background colour on the text if it's not overflowing
        if (popupText.offsetWidth <= popupBox.offsetWidth) {
            popupBox.style.backgroundColor = 'transparent';
            popupText.style.backgroundColor = bgColour;
            popupText.style.animation = 'none';
            popup._show();
            return;
        }

        const overflow = popupText.offsetWidth - popupBox.offsetWidth;
        const animationTime = roundTenth(scrollStartDelay + (overflow / scrollSpeed) + scrollEndDelay);
        const textFadeInPercent = roundTenth(scrollTextFadeTime / animationTime * 100);
        const startScrollingPercent = roundTenth(scrollStartDelay / animationTime * 100);
        const stopScrollingPercent = 100 - roundTenth(scrollEndDelay / animationTime * 100);
        const animationName = `scroller-${Date.now()}`;

        if (popupScrollStyle.sheet.cssRules.length > 0) {
            popupScrollStyle.sheet.deleteRule(0);
        }
        popupScrollStyle.sheet.insertRule(`@keyframes ${animationName} {
            0% {
                transform: translate3d(0, 0, 0);
                opacity: 0;
            }
            ${textFadeInPercent}% {
                opacity: 1;
            }
            ${startScrollingPercent}% {
                transform: translate3d(0, 0, 0);
            }
            ${stopScrollingPercent}% {
                transform: translate3d(-${overflow}px, 0, 0);
            }
            ${100 - textFadeInPercent}% {
                opacity: 1;
            }
            100% {
                transform: translate3d(-${overflow}px, 0, 0);
                opacity: 0;
            }
        }`, 0);

        popupBox.style.backgroundColor = bgColour;
        popupText.style.backgroundColor = 'transparent';
        popupText.style.animation = `${animationName} ${animationTime}s linear infinite`;
        popup._show();
    },
    /**
     * Animates display of the popup.
     */
    _show: () => {
        const popupBox = document.getElementById('popupbox');
        if (popupBox.classList.contains('show')) {
            // Hide without transitioning so the show animation can be replayed
            popupBox.style.transition = 'none';
            popupBox.classList.remove('show');
            // Trigger reflow to apply the style changes above
            void popupBox.offsetWidth;
            popupBox.style.transition = '';
        }
        popupBox.classList.add('show');
    },
    /**
     * Removes popup from screen and resets state of all commands
     */
    delete: () => {
        spotlightUser = ""; // TODO: Remove this
        document.getElementById('popupbox').classList.remove('show');
    },
    /**
     * Formats text with emotes, This must be past only and all message un-formatted or emotes wont be replaced properly
     */
    formatEmotes: (message, emotes, makeUpperCase) => {
        //parse the message for html and remove any tags
        if (makeUpperCase) {
            message = message.toUpperCase();
        }

        let newMessage = $($.parseHTML(message)).text().split("");

        //replace any twitch emotes in the message with img tags for those emotes
        if (twitchEmotes) {
            for (let emoteIndex in emotes) {
                const emote = emotes[emoteIndex];
                for (let charIndexes in emote) {
                    let emoteIndexes = emote[charIndexes];
                    if (typeof emoteIndexes == "string") {
                        emoteIndexes = emoteIndexes.split("-");
                        emoteIndexes = [parseInt(emoteIndexes[0]), parseInt(emoteIndexes[1])];
                        for (let i = emoteIndexes[0]; i <= emoteIndexes[1]; ++i) {
                            newMessage[i] = "";
                        }
                        newMessage[emoteIndexes[0]] = `<img class="emoticon" src="https://static-cdn.jtvnw.net/emoticons/v2/${emoteIndex}/default/dark/3.0"/>`;
                    }
                }
            }
        }

        return newMessage.join("");
    }
}
