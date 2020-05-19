# TwitchPopups

Allows Twitch mods to display popup text on the stream via chat commands

## COMMAND LIST

- !alert: will display whatever text comes after the !alert command
- !hotseat [@username]: will display the chat of the specified user from that point on
- !delete: will delete the popup and reset voting
- !vote topic [topic]: start of the vote process, will display the topic
- !vote option [option]: will add an option that users can vote on
- !vote clear: clears all options
- !vote start: allows the users to start voting
- !vote results: stops users from voting and shows winner

## DOWNLOAD

The latest version of TwitchPopups can be found [as a zip archive here](https://github.com/DaftLimmy/TwitchPopups/archive/master.zip)

## INSTRUCTIONS

1. Extract the zip archive
2. Edit twitchpopups.htm and change "Limmy" to your Twitch channel name
3. Use OBS/Streamlabs OBS to add twitchpopups.htm as a browser source (Fit to Screen, 1920x1080)
4. Tick "Shutdown source when not visible" in browser source properties. That way, any tweaks you make are reloaded when you toggle the visibility button

## UPGRADE

1. Open your existing twitchpopups.htm and copy your configuration settings
2. Download the latest version
3. Open the zip archive and open the TwitchPopups-master directory
4. Select all of the files and drag them into your existing TwitchPopups directory. Say yes to any prompts to overwrite files.
5. Edit the configuration section at the top of twitchpopups.htm, pasting in your settings from step 1.
6. If OBS hasn't recognised the update press the "refresh cache of current page" button in browser source properties.