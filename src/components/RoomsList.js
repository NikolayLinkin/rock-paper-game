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

export default RoomsList;