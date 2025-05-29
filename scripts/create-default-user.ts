import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient();

  const username = "Admin01";
  const password = "Jenepontobahagia2030";

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: "admin",
      },
    });
    console.log("Default admin user created.");
  } else {
    console.log("Default admin user already exists.");
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
