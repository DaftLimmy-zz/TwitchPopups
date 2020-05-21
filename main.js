const opts = {
    channels: [
        twitchChannel
    ]
};

let actionHandlers = {};
let allHandlers = [];

// Create a client with our options defined at the top of the file
let client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    // Remove whitespace from chat message
    const command = msg.trim();

    let handlerName;
    if(command.indexOf(" ") > -1) {
        handlerName = command.substring(0, command.indexOf(" "));
    } else {
        handlerName = command;
    }
    
    console.log(handlerName);
    
    // check all commands
    if (actionHandlers[handlerName] && actionHandlers[handlerName].security(context)) {
        actionHandlers[handlerName].handle(command);
    }

    for (const handler of allHandlers) {
        if (handler.security(context)) {
            handler.handle(command);
        }
    }
}

function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}