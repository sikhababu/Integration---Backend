
const authUser = (req, res, next) => {
    try {

        const token = req.cookies

        if (!token) {

            return res.status(401).json({ message: "user not authorized" })
        }

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRETE)
        next()
    } catch (error) {

        res.status(error.status || 500).json({ error: error.message || "internal server error" })
    }


}


module.exports = authUser