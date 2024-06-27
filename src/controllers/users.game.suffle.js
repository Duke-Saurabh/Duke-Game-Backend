const suffle=(socket,io)=>{
    socket.on('/suffle',({team,card,suffle})=>{
        console.log('suffle card')
        io.emit(`/${team}/suffle`, {card,suffle});
    })
}

export {suffle};