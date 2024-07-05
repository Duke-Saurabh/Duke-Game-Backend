import dotenv from 'dotenv'
dotenv.config({path:'./.env'});

import { connectdb } from './src/dbs/dbs.connection.js';
import './socket.js';
import { app,server } from './src/app.js';

const port=process.env.PORT || 3000;
connectdb()
  .then(() => {
    // Handle errors if Express cannot talk to the database
    app.on('error', (error) => {
      console.error('Express is not able to talk to the database. Error:', error);
    });

    // Start listening on the specified port
    server.listen(port, () => {
      console.log(`Server is listening at PORT ${port}`);
    });

    // Log when a client connects to the server
    server.on('connection', (client) => {
      console.log(`${client} is connected`);
    });

    // Handle server close event
    server.on('close', () => {
      console.log('Server closed');
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });

  // import './socket.js';

