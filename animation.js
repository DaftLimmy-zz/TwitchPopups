const doAnimation = () => {
    const textWidth = $("#popuptext").width();
    $("#popuptext").css({ "opacity": 0, "margin-left": "50px" });
    $("#popupbox").width(1);
    $("#popupbox").animate({ width: textWidth + 30 }, 500);
    $("#popuptext").animate({ "opacity": 1, "margin-left": "15px" }, 700);
}

const doHotseatAnimation = () => {
    const textWidth = $("#popuptext").width();
    $("#popuptext").css({ "opacity": 0, "margin-left": "50px" });
    $("#popupbox").css({ "background-color": hotseatBg });
    $("#popupbox").width(1);
    $("#popupbox").animate({ width: textWidth + 30 }, 500);
    $("#popuptext").animate({ "opacity": 1, "margin-left": "15px" }, 700);
}

// Animate off
const deleteAnimation = () => {
    hotSeatUser = "";
    clog
    $("#popupbox").animate({ width: 0 }, 500);
    $("#popuptext").animate({ "opacity": 0, "margin-left": "50px" }, 700);
}


const formatEmotes = (message, emotes, upperCase) => {
    //parse the message for html and remove any tags
    if (upperCase) {
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