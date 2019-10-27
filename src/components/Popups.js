// import React, {Component} from "react";
// import PopupCreateRoom from "./popups/PopupCreateRoom";
// import PopupLogin from "./popups/PopupLogin";
//
// class Popups extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             openPopup: "",
//         };
//     }
//
//
//     togglePopup = (popupName) => {
//         this.setState(state => ({openPopupName: popupName}));
//     };
//
//     closePopup = () => {
//         this.togglePopup("none");
//     };
//
//     render() {
//         const {openPopup} = this.state;
//         return (
//             <>
//                 {openPopup === "create-room" ?
//                     <PopupCreateRoom joinInRoom={joinInRoom}
//                                      closePopup={this.closePopup}
//                     /> : ''}
//
//                 {openPopup === "login" ?
//                     <PopupLogin joinInRoom={joinInRoom}
//                                 login={login}
//                                 errorText={sessionErrText}
//                                 closePopup={this.closePopup}
//                     /> : ''}
//             </>
//         )
//     }
// }