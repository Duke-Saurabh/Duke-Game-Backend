const cardSelect = (socket, io) => {
    socket.on('/cardSelect', ({ index,playerIndex, team, score }) => {
      io.emit(`/${team}/cardSelect`, {index,playerIndex,score});
    });
  };
  
  export { cardSelect };
  