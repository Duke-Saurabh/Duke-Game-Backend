

const sendUsersGameMess=(socket,io)=>{
    socket.on('/message',(mess)=>{
        console.log(mess);
        const teamSelected=mess.teamSelected;
        const messToSend=mess.messToSend;
        io.emit(`/${teamSelected}/message`,messToSend);
    })
}

export {sendUsersGameMess};