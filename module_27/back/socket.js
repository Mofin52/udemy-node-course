let io;

module.exports = {
  init: (httpServer, params) => {
    io = require("socket.io")(httpServer, params);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
