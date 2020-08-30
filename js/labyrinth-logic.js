const stepSize = 3;
const rectangleWidth = 9;
const rectangleHeight = 9;
let positionX = 21;
let positionY = 0;

const colorExitArrow = "#8B0000"; //rgb (139, 0, 0)
const colorOfMove = "#0000FF";
const colorOfClear = "#FFFFFF";

const labyrinth = document.getElementById("labyrinth");
const area = document.getElementById("area");
const context = labyrinth.getContext("2d");

const xPositionMovementsList = labyrinth.width - 110;
const yPositionMovementsList = labyrinth.height - 30;
const fontListOfMovements = "10px sans-serif";

function drawMakeStep(tmpPositionX, tmpPositionY) {
    context.beginPath();
    context.rect(tmpPositionX, tmpPositionY, rectangleWidth, rectangleHeight);
    context.fillStyle = colorOfMove;
    context.fill();
}

function createStep(canMove, tmpPositionX, tmpPositionY, move) {
    clearPreviousStep();

    drawMakeStep(tmpPositionX, tmpPositionY);

    positionX = tmpPositionX;
    positionY = tmpPositionY;
}

function takeStep() {
    let move = document.getElementById("step").value;

    let tmpPositionX = positionX;
    let tmpPositionY = positionY;

    move = move.toLowerCase()
    if (move === "down") {
        tmpPositionY += stepSize;
    } else if (move === "up") {
        tmpPositionY -= stepSize;
    } else if (move === "right") {
        tmpPositionX += stepSize;
    } else if (move === "left") {
        tmpPositionX -= stepSize;
    }

    const canMove = canMoveTo(tmpPositionX, tmpPositionY);
    if (canMove === true) {
        createStep(canMove, tmpPositionX, tmpPositionY, move);
    }

}

function clearPreviousStep() {
    context.beginPath();
    context.rect(positionX, positionY, rectangleWidth, rectangleHeight);
    context.fillStyle = colorOfClear;
    context.fill();
}

function canMoveTo(destX, destY) {
    let imgData = context.getImageData(destX, destY, rectangleWidth, rectangleHeight);
    let data = imgData.data;
    context.putImageData(imgData, destX, destY);
    let pointInCanvas = destX >= 0 && destY >= 0 && destX <= labyrinth.width - rectangleWidth && destY <= labyrinth.height - rectangleHeight;
    let canMove = true;

    if (pointInCanvas) {
        for (let i = 0; i < data.length; i += 4) {
            if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
                canMove = false;
                alert("Ściana");
                break;
            } else if (data[i] === 139 && data[i + 1] === 0 && data[i + 2] === 0) {
                canMove = false;
                alert("Gratulacje. Znalazłeś wyjście!");
                break;
            }
        }
    }

    return pointInCanvas && canMove
}

function drawExit() {

    context.beginPath();
    context.fillStyle = colorExitArrow;
    context.moveTo(25, 55);
    context.lineTo(10, 40);
    context.lineTo(45, 40);
    context.fill();
}

function fillCanvas() {
    let img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0);
        drawMakeStep(positionX, positionY);
    }
    img.src = "images/labyrinth.png";
}

drawExit();
fillCanvas();
