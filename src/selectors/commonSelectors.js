export const getGameResult = state => state.game.result;
export const getEnemyRate = state => state.game.enemyRate;
export const getPlayerRate = state => state.game.playerRate;
export const getGameMessage = state => state.game.message;

export const getGameHistory = state => state.game.history;
export const getGameFinish = state => state.game.finish;
export const getGameCanStart = state => state.game.canStart;

export const getRooms = state => state.session.rooms;
export const getSessionErrorStatus = state => state.session.errStatus;
export const getSessionErrorText = state => state.session.errText;
export const getCurrentRoom = state => state.session.currentRoom;
export const getUserName = state => state.session.userName;