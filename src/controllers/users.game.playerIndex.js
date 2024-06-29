const cardSelect = (socket, io) => {
    socket.on('/cardSelect', ({ index,playerIndex, team, score, chorSipahi}) => {
      console.log(chorSipahi); 
      io.emit(`/${team}/cardSelect`, {index,playerIndex,score, chorSipahi});
    });
  };
  
  export { cardSelect };
  