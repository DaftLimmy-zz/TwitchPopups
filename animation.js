const doAnimation = () => {
    const textWidth = $("#popuptext").width();
    $("#popuptext").css({"opacity":0, "margin-left":"50px"}); 
    $("#popupbox").width(1);
    $("#popupbox").animate({width:textWidth+30}, 500);
    $("#popuptext").animate({"opacity":1, "margin-left":"15px"}, 700);
}

const doHotseatAnimation = () => {
    const textWidth = $("#popuptext").width();
    $("#popuptext").css({"opacity":0, "margin-left":"50px"}); 
    $("#popupbox").css({"background-color":hotseatBg}); 
    $("#popupbox").width(1);
    $("#popupbox").animate({width:textWidth+30}, 500);
    $("#popuptext").animate({"opacity":1, "margin-left":"15px"}, 700);
}


// Animate off
const deleteAnimation = () => {
    hotSeatIsOn = false;
    $("#popupbox").animate({width:0}, 500);
    $("#popuptext").animate({"opacity":0, "margin-left":"50px"}, 700);
}