const popup = {
    /**
     * Displays popup on screen with the given text and colour.
     */
    showText: (text, bgColour) => {
        $("#popupbox").show();
        $("#popuptext").html(text);
        $("#popupbox").css({ "background": bgColour });
        $("#popuptext").css({ "opacity": 0, "margin-left": "50px" });

        const textWidth = $("#popuptext").width();
        $("#popupbox").width(1);
        $("#popupbox").animate({ width: textWidth + 30 }, 500);
        $("#popuptext").animate({ "opacity": 1, "margin-left": "15px" }, 700);
    },
    /**
     * Removes popup from screen and resets state of all commands
     */
    delete: () => {
        spotlightUser = ""; // TODO: Remove this
        $("#popupbox").animate({ width: 0 }, 500);
        $("#popuptext").animate({ "opacity": 0, "margin-left": "50px" }, 700);
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
                        newMessage[emoteIndexes[0]] = `<img class="emoticon" src="https://static-cdn.jtvnw.net/emoticons/v1/${emoteIndex}/3.0"/>`;
                    }
                }
            }
        }

        return newMessage.join("");
    }
}
