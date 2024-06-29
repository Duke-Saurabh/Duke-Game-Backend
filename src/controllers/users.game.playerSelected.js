

const playerSelected=(socket,io)=>{
    socket.on('/playerSelected',({playerIndex,team,score,suffle})=>{
        io.emit(`/${team}/playerSelected`,({playerIndex,team,score,suffle}));
    })
}

export {playerSelected};