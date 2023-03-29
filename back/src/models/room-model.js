const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongodb");

const RoomSchema = new Schema({
  name: { type: String, unique: false, required: true },
  messages: [
    {
      text: { type: String, required: true },
      date: { type: Date, required: false },
      userId: { type: ObjectId, required: false },
    },
  ],
});

module.exports = model("Room", RoomSchema);
