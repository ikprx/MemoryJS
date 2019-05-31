
const IMG_WIDTH = 150;
const IMG_HEIGHT = 150;

var moveIndex = 0;
var move = new Array(2);
var lastObj = new Array();
var flagDurrAnim = false;

var eventFunc;

function select(element)
{

    if(flagDurrAnim == false)
    {
        element.getElementsByClassName("flip-card-inner")[0].style.transform = "rotateY(180deg)";

        move[moveIndex] = element;
        moveIndex++;
        lastObj.push(element);


        if(moveIndex == 2)
        {
            var src1 = move[0].querySelector('img').src;
            var src2 = move[1].querySelector('img').src;
            
            if(src1 != src2)
            {
                flagDurrAnim = true;
                setTimeout(function(){ 
                    var x = lastObj.pop();
                    var y = lastObj.pop();
                    x.getElementsByClassName("flip-card-inner")[0].style.transform = "rotateY(360deg)";
                    y.getElementsByClassName("flip-card-inner")[0].style.transform = "rotateY(360deg)";
                    flagDurrAnim = false;
                }, 1000);
            }
            else
            {
                flagDurrAnim = true;
                setTimeout(function(){ 
                    var x = lastObj.pop();
                    var y = lastObj.pop();
                    x.removeEventListener("click", eventFunc);
                    y.removeEventListener("click", eventFunc);
                    x.querySelector('img').style.filter = "grayscale(100%)";
                    y.querySelector('img').style.filter = "grayscale(100%)";
                    x.getElementsByClassName("flip-card-inner")[0].style.transform = "rotateY(180deg)";
                    y.getElementsByClassName("flip-card-inner")[0].style.transform = "rotateY(180deg)";
                    flagDurrAnim = false; 
                }, 1000);

            }
            move.length = 0;
            moveIndex = 0;
        }
    }
}

function createTile(src)
{
    var flipcard = document.createElement("div");
    flipcard.className = "flip-card";
    flipcard.id = src;
    flipcard.style.width = (IMG_WIDTH.toString() + "px");
    flipcard.style.height = (IMG_HEIGHT.toString() + "px");
    eventFunc = function(){
        select(flipcard);
    }
    flipcard.addEventListener("click", eventFunc);

    var flipcardinner = document.createElement("div");
    flipcardinner.className = "flip-card-inner";
    var flipcardfront = document.createElement("div");
    flipcardfront.className = "flip-card-front";
    var flipcardback = document.createElement("div");
    flipcardback.className = "flip-card-back";

    var avatar = document.createElement("img");
    avatar.src = src;
    avatar.style.width = (IMG_WIDTH.toString() + "px");
    avatar.style.height = (IMG_HEIGHT.toString() + "px");

    flipcardback.append(avatar);

    flipcard.append(flipcardinner);
    flipcardinner.append(flipcardfront);
    flipcardinner.append(flipcardback);
    return flipcard;
}

function createAvatarsTable()
{
    var avatars = ["avatars/1.jpg","avatars/2.jpg","avatars/3.jpg","avatars/4.jpg","avatars/5.jpg","avatars/6.jpg","avatars/7.jpg" ,"avatars/8.jpg"];
    var tmp = new Array();
    for(var ele of avatars)
    {
        tmp.push(ele);
        tmp.push(ele);
    }
    avatars = tmp;

    for(var i = 0; i<100;i++)
    {
        var indexRand1 = Math.floor(Math.random()*16);
        var indexRand2 = Math.floor(Math.random()*16);
        while(indexRand1 == indexRand2)
        {
            indexRand2 = Math.floor(Math.random()*16);
        }

        var tmp = avatars[indexRand1];
        avatars[indexRand1] = avatars[indexRand2];
        avatars[indexRand2] = tmp;
    }
    return avatars; 
}

function setup()
{
    var div = document.createElement("div");
    div.style.width = ((IMG_WIDTH*4+50).toString() + "px");

    var avatars = createAvatarsTable();
    for(var ele of avatars)
    {
        div.append(createTile(ele));
    }

    document.body.append(div);

}


window.onload = function()
{
    setup();
}