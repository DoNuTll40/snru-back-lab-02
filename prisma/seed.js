
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const password = bcrypt.hashSync("123456");
const userData = [
  { user_username: "Andrew", user_password: password, user_email: "Andrew@spiderman.com" },
  { user_username: "Tom", user_password: password, user_email: "Tom@spiderman.com" },
  { user_username: "Toby", user_password: password, user_email: "Toby@spiderman.com" },
];

const todoData = [
  { todo_title: "HTML", todo_duedate: new Date(), user_id: 1 },
  { todo_title: "CSS", todo_duedate: new Date(), user_id: 1 },
  { todo_title: "JS", todo_duedate: new Date(), user_id: 2 },
  { todo_title: "React", todo_duedate: new Date(), user_id: 3 },
];

const run = async () => {

  await prisma.users.createMany({
    data: userData,
  });

  await prisma.todo.createMany({
    data: todoData,
  });
};

run();
