import prisma from "../config/db.js";

export const search_dishes = async (req, res) => {
    try {
        const { name, minPrice, maxPrice } = req.query;

        const whereCondition = {};

        // dish name filter (only if provided)
        if (name) {
            whereCondition.dishName = {
                contains: name,
            };
        }

        // price filter (only if both provided)
        if (minPrice && maxPrice) {
            whereCondition.price = {
                gte: Number(minPrice),
                lte: Number(maxPrice),
            };
        }

        const items = await prisma.menuItem.findMany({
            where: whereCondition,
            include: {
                restaurant: true,
                orders: {
                    select: { id: true },
                },
            },
        });

        const results = items
            .map((item) => ({
                restaurantId: item.restaurant.id,
                restaurantName: item.restaurant.name,
                city: item.restaurant.city,
                dishName: item.dishName,
                dishPrice: item.price,
                orderCount: item.orders.length,
            }))
            .sort((a, b) => b.orderCount - a.orderCount)
            .slice(0, 10);

        return res.status(200).json({
            status: true,
            restaurants: results,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error.message || "Something went wrong while fetching dishes",
        });
    }
};
