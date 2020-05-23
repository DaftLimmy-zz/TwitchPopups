// !anim: Will display the animation following the anim command
actionHandlers['!anim'] = {
    security: (context, textContent) => {
        return context.mod || (context["badges-raw"] != null && context["badges-raw"].startsWith("broadcaster"))
    },
    handle: (context, textContent) => {
        let htmlPage = textContent.substr(6);
        document.getElementById("animation-frame").contentWindow.location.href = `animations/${htmlPage}.htm`;
    }
};

// Listen for when the animation window says its finished... then kills it.
window.addEventListener("message", function(message) {
    if (message.data === "animation-end") {
        document.getElementById("animation-frame").contentWindow.location.href = ``;
    }
}, false);