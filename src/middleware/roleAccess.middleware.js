export const roleAccess = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role; // Assuming req.user is populated by previous authentication middleware

      if (!allowedRoles.includes(userRole)) {
        return res
          .status(403)
          .json({ message: "Access denied: insufficient permissions" });
      } else {
        next();
      }
    } catch (error) {
      console.error("Role access middleware error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};
