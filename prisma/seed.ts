import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();


async function seed() {
  await prisma.user.create({
    data: {
      email: "admin@admin.com",
      name: "admin123",
      password_hash: await hash("123456", 6),
      role:'ADMIN',
      is_active:true
    },
  });

}

seed()
  .then(() => {
    console.log("Database seeded!");
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });