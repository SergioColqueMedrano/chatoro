import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      username: 'Ariel',
      email: 'ariel@example.com',
      password: 'password123', // Asegúrate de que esto está hasheado en una aplicación real
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'Juan',
      email: 'juan@example.com',
      password: 'password123',
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
