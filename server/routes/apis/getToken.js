module.exports = (req, res) => {
    const uuid = uuidv5(req.body.email, ['1', 'q', '2', 'w', '3', 'e', '4', 'r', '5', 't', '6', 'y', '7', 'u', '8', 'i']);

    res.status(200)
        .json({
            id_token : uuid
        })
        .end();
};