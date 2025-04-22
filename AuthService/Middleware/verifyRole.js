
const authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (roles.includes(req.user.role) || req.user.id === req.params.id) {
            console.log("User role verified");
            return next();
        }
        return res.status(403).json({ message: "Access denied" });
    };
};


module.exports = authorizeRoles;