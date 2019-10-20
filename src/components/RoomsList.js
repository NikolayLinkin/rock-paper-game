import React, {Component} from "react";

class RoomsList extends Component {
    componentDidMount() {
        fetch('http://localhost:3005/api/rooms', {method: "GET"})
            .then(
                res => {console.log(res);  return  res}
            )
    }

    render() {
        return (
            <div>
                ROOMS
            </div>
        );
    }
}

// const RoomsList = ({rooms, currentRoom, joinToRoom}) => {
//
//
//     return (
//         <div>
//             <h2>Для игры по сети, нужно выбрать комноту или создать свою</h2>
//
//             <h3>Вы подключены к комнате {currentRoom}</h3>
//
//             {rooms.map(room =>
//                 <div key={room.id} onClick={() => {joinToRoom(room.name)}}>
//                     {room.name}
//                 </div>
//             )}
//
//             <button>Создать комнату</button>
//
//             <div>Тут будет списко комнат</div>
//         </div>
//     );
// };

export default RoomsList;