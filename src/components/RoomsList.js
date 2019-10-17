import React from "react";

const RoomsList = ({rooms, currentRoom, joinToRoom}) => {
    return (
        <div>
            <h2>Для игры по сети, нужно выбрать комноту или создать свою</h2>

            <h3>Вы подключены к комнате {currentRoom}</h3>

            {rooms.map(room =>
                <div key={room.id} onClick={() => {joinToRoom(room.name)}}>
                    {room.name}
                </div>
            )}

            <button>Создать комнату</button>

            <div>Тут будет списко комнат</div>
        </div>
    );
};

export default RoomsList;