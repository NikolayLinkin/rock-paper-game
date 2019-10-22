import React from "react";
import RoomPreview from "./RoomPreview";

const RoomsList = ({rooms}) => {
    return (
        <div className="rooms">
            {rooms.map(room =>
                <RoomPreview key={room.id}

                />
            )}
        </div>
    );
};


export default RoomsList;