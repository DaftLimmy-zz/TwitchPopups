# TwitchPopups
Allows Twitch mods to display popup text on the stream via chat commands

COMMAND LIST:
- !alert: will display whatever text comes after the !alert command
- !hotseat [@username]: will display the chat of the specified user from that point on
- !delete: will delete the popup

INSTRUCTIONS
1. Download the [latest TwitchPopups archive](https://github.com/DaftLimmy/TwitchPopups/archive/master.zip) and extract to your PC
2. Edit twitchpopups.htm and change "Limmy" to your Twitch channel name
3. Use OBS/Streamlabs OBS to add twitchpopups.htm as a browser source (Fit to Screen, 1920x1080)
4. Tick "Shutdown source when not visible" in browser source properties. That way, any tweaks you make are reloaded when you toggle the visibility button
