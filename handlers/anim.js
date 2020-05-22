// !anim: Will display the animation following the anim command
actionHandlers['!anim'] = {
    security: (context) => {
        return context.mod || (context["badges-raw"] != null && context["badges-raw"].startsWith("broadcaster"))
    },
    handle: (commandName) => {
        let htmlPage = commandName.substr(6);
        console.log(htmlPage);
        document.getElementById("animation-frame").contentWindow.location.href = `animations/${htmlPage}.htm`;
    }
};

window.addEventListener("message", function(message) {
    console.log("fin");
    if (message.data === "animation-end") {
        document.getElementById("animation-frame").contentWindow.location.href = ``;
    }
}, false);