const labyrinthMove = ["up - góra", "down - dół", "right - prawo", "left - lewo"]

function displayMovements() {
    let text = '';

    for (let i = 0; i < labyrinthMove.length; i += 1) {
        if (text.length != 0) {
            text += String.fromCharCode(13, 10);//nowa linia
        }
        text += labyrinthMove[i];


    }
    area.value = text;
}

displayMovements();