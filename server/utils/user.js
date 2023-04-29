// user = {id, username, rooms}
// room = {room, userCount, latestMessage, private}
// message = {author, message, time, room}
const users = [];
const rooms = [];
const messages = [];

const addUser = (userId, username) => {
  // register user if not exist
  const index = users.findIndex((user) => user.username === username);
  if (index === -1) {
    const user = { id: userId, username: username, rooms: [] };
    users.push(user);
  } else {
    users[index].id = userId;
  }
  console.log(users);
};

const joinRoom = (userId, username, room) => {
  // if new room, then create room
  let roomIndex = rooms.findIndex((r) => r.room === room);
  let newRoom = roomIndex === -1;
  if (newRoom) {
    rooms.push({ room: room, userCount: 0, latestMessage: "" });
  }
  roomIndex = rooms.findIndex((r) => r.room === room);

  // register user into the room and add room user count
  const index = users.findIndex((user) => user.username === username);
  if (index !== -1) {
    const userRoomIndex = users[index].rooms.findIndex((r) => r === room);
    if (userRoomIndex === -1) {
      users[index].rooms.push(room);
      rooms[roomIndex].userCount += 1;
      newRoom = true;
    }
  } else {
    const user = { id: userId, username: username, rooms: [room] };
    users.push(user);
    rooms[roomIndex].userCount += 1;
  }
  console.log(rooms);
  console.log(users);
  return newRoom;
};

const leaveRoom = (username, room) => {
  // remove specific room from user room list
  const user = users.find((user) => user.username === username);
  if (user.rooms.length === 0) {
    return;
  }
  const specificRoom = user.rooms.findIndex((r) => r === room);
  if (specificRoom !== -1) {
    user.rooms.splice(specificRoom, 1);
  }
  // decrease user count
  const roomIndex = rooms.findIndex((r) => r.room === room);
  rooms[roomIndex].userCount -= 1;
  // if no user in the room, then remove room
  if (rooms[roomIndex].userCount === 0) {
    rooms.splice(roomIndex, 1);
  }
};

const getCurrentUser = (username) => {
  return users.find((user) => user.username === username);
};

const getAllUsers = () => {
  return users;
};

const getAllRooms = () => {
  return rooms;
};

const updateLatestMessage = (message) => {
  const index = rooms.findIndex((r) => r.room === message.room);
  if (index != -1) {
    rooms[index].latestMessage = message;
    return true;
  } else {
    return false;
  }
};

const sendMessage = (message) => {
  let done = false;
  if (message) {
    messages.push(message);
    done = updateLatestMessage(message);
  }
  console.log(messages);
  console.log(rooms);
  return done;
};

const getMessageInRoom = (room) => {
  const msg = messages.filter((m) => m.room === room);
  console.log(msg);
  return msg;
};

module.exports = {
  addUser,
  joinRoom,
  leaveRoom,
  getCurrentUser,
  getAllUsers,
  getAllRooms,
  sendMessage,
  getMessageInRoom,
};
