import prisma from "../config/db.js";

export const search_dishes = async (req, res) => {
    try {
        const { name, minPrice, maxPrice } = req.query;
        // console.log({name,minPrice,maxPrice})
        const items = await prisma.menuItem.findMany({
            where: {
                dishName: {
                    contains: name,
                },
                price: {
                    gte: Number(minPrice),
                    lte: Number(maxPrice),
                },
            },
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


        return res.status(200).send({
            status: true,
            data: results
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            status: false,
            message: error.message || "somthing went wrong while fetching dishes."
        })
    }
}
