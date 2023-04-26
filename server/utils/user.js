// user = {userId, username, list of rooms}
// room = {room, count total user in the room}
const users = [];
const rooms = [];

const addUser = (userId, username) => {
  // register user if not exist
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    const user = { id: userId, username: username, rooms: [] };
    users.push(user);
  }
  console.log(users);
};

const joinRoom = (userId, username, room) => {
  // if new room, then create room
  let roomIndex = rooms.findIndex((r) => r.room === room);
  if (roomIndex === -1) {
    rooms.push({ room: room, userCount: 0 });
  }
  roomIndex = rooms.findIndex((r) => r.room === room);

  // register user into the room and add room user count
  const index = users.findIndex((user) => user.id === userId);
  if (index !== -1) {
    const userRoomIndex = users[index].rooms.findIndex((r) => r === room);
    if (userRoomIndex === -1) {
      users[index].rooms.push(room);
      rooms[roomIndex].userCount += 1;
    }
  } else {
    const user = { id: userId, username: username, rooms: [room] };
    users.push(user);
    rooms[roomIndex].userCount += 1;
  }
  console.log(rooms);
  console.log(users);
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

const getCurrentUser = (userId) => {
  return users.find((user) => user.id === userId);
};

const getAllUsers = () => {
  return users;
};

module.exports = {
  addUser,
  joinRoom,
  leaveRoom,
  getCurrentUser,
  getAllUsers,
};
