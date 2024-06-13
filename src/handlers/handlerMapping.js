import { gameEnd, gameStart } from "./game.handler.js";
import { eatItemHandler } from "./item.handler.js";
import { moveStageHandler } from "./stage.handler.js";


const handlerMappings ={
    2:gameStart,
    3:gameEnd,
    7: eatItemHandler,
    11: moveStageHandler,
};

export default handlerMappings