export const search_dishes = async (req, res) => {
    try {
        const { name, minPrice, maxPrice } = req.query;
        console.log({ name, minPrice, maxPrice })
        return res.status(200).send({
            status: true,
            message: "success get request"
        })
    } catch (error) {
        return res.status(400).send({
            status: false,
            message: error.message || "somthing went wrong while fetching dishes."
        })
    }
}