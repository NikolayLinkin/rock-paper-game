export const getGameResult = state => state.game.result;
export const getGameHistory = state => state.game.history;
export const getAiRate = state => state.game.aiRate;
export const getGameFinish = state => state.game.finish;

export const getRoomsList = state => state.session.rooms;
export const getCurrentRoom = state => state.session.currentRoom;