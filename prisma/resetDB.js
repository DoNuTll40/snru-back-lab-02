
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
    await prisma.$executeRawUnsafe('DROP Database lab_todolist')
    await prisma.$executeRawUnsafe('CREATE Database lab_todolist')
}

console.log("Reset DB")
run();
