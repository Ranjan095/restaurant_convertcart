import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const restaurants = [];

  for (let i = 1; i <= 15; i++) {
    const price = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    const orderCount = Math.floor(Math.random() * (120 - 10 + 1)) + 10;

    restaurants.push({
      name: `Biryani House ${i}`,
      city: "Hyderabad",
      menuItems: {
        create: [
          {
            dishName: "Chicken Biryani",
            price,
            orders: {
              createMany: {
                data: Array(orderCount).fill({}),
              },
            },
          },
        ],
      },
    });
  }

  await prisma.restaurant.createMany({
    data: restaurants.map(({ menuItems, ...rest }) => rest),
  });

  // 👆 createMany relations support nahi karta

  for (const data of restaurants) {
    await prisma.restaurant.create({ data });
  }

  console.log("✅ Seeded 15 restaurants with realistic prices & orders");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
