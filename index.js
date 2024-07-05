import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { connectdb } from './src/dbs/dbs.connection.js';
import './socket.js';
import { app, server } from './src/app.js';  // Ensure './src/app.js' exports both 'app' and 'server'
 // Import socket setup

const port = process.env.PORT || 3000;
const host = '0.0.0.0';  // Ensure it binds to all network interfaces

connectdb()
  .then(() => {
    app.on('error', (error) => {
      console.error('Express is not able to talk to the database. Error:', error);
    });

    server.listen(port, host, () => {
      console.log(`Server is listening at http://${host}:${port}`);
    });

    server.on('connection', (client) => {
      console.log('A client is connected:', client.remoteAddress);
    });

    server.on('close', () => {
      console.log('Server closed');
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
