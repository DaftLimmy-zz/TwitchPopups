# TwitchPopups

Allows Twitch mods to display popup text on the stream via chat commands

## COMMAND LIST

- !alert: will display whatever text comes after the !alert command
- !spotlight [@username]: will display the chat of the specified user from that point on
- !delete: will delete the popup
- !fuck - will play the 'what the fuck is this' audio clip

## DOWNLOAD

The latest version of TwitchPopups can be found [as a zip archive here](https://github.com/DaftLimmy/TwitchPopups/archive/master.zip)

## INSTRUCTIONS

1. Extract the zip archive
2. Edit settings.js and change "Limmy" to your Twitch channel name
3. Use OBS/Streamlabs OBS to add twitchpopups.htm as a browser source (Fit to Screen, 1920x1080)
4. Tick "Shutdown source when not visible" in browser source properties. That way, any tweaks you make are reloaded when you toggle the visibility button

## UPGRADE
1. Open your existing twitchpopups.htm and copy your configuration settings
2. Download the latest version
3. Open the zip archive and open the TwitchPopups-master directory
4. Select all of the files and drag them into your existing TwitchPopups directory. Say yes to any prompts to overwrite files but be careful not to overwrite your custom animations!
5. Edit the configuration section at the top of twitchpopups.htm, pasting in your settings from step 1.
6. If OBS hasn't recognized the update press the "refresh cache of current page" button in browser source properties.


## ADVANCED: ADD CUSTOM HANDLERS
If you want to add your own handlers, you will need to understand JavaScript and the tmi.js library.
There are a few extra things to consider.
1. Do you want it to fire based on a !command?
2. Do you want it to fire on every chat?
3. What security should prevent the handler being fired? e.g mod only, spotlight only etc.
4. What should the handler do?

Once you have answered those questions you are ready to add the handler.

1. Navigate to the handlers.js
2. If you want a command copy the following code into the file:
``` javascript
actionHandlers['!command'] = {
    security: (context, textContent) => {
        return true; // This should return a boolean, true will fire the handler
    },
    handle: (context, textContent) => {
        // Place handle script here
    }
};
```
3. If you want a general command copy the following code into the file:
``` javascript
allHandlers.push({
    security: (context, textContent) => {
        return true; // This should return a boolean, true will fire the handler
    },
    handle: (context, textContent) => {
        // Place handle script here
    }
});
```
4. Complete your handler and don't forget to add a description to the readme.md

## ADVANCED: POPUP HELPER
The popup helper contains a few functions so you don't need to worry about the animations for the popup box! it can be accessed anywhere by typing `popup` followed by a function.

Methods:

`popup.showText(text, bgColour)`: Displays popup on screen with the given text and colour.

`popup.delete()`: Removes popup from screen and resets state of all commands. 

`popup.formatEmotes(message, emotes, upperCase)`: Formats text with emotes, This must be past only and all message un-formatted or emotes wont be replaced properly. e.g `popup.formatEmotes('Hello Twitch', context.emotes, true).substr(7)` The substr function removes the !command, just change the number to the length of the command.
