import React from "react";

const RoomsList = ({rooms, joinInRoom}) => {
    return (
        <div className="rooms">
            <h3 className="rooms__title">Свободные комнаты:</h3>
            {rooms.map(room =>
                <div key={room.id}
                     className="room-preview"
                     onClick={() => {joinInRoom(room.name)}}>
                    {room.name}
                </div>
            )}
        </div>
    );
};


export default RoomsList;