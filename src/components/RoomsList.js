import React from "react";

const RoomsList = ({rooms, joinInRoom}) => {
    return (
        <div className="rooms">
            {rooms.map(room =>
                <div key={room.id} onClick={() => {joinInRoom(room.name)}}>
                    {room.name}
                </div>
            )}
        </div>
    );
};


export default RoomsList;