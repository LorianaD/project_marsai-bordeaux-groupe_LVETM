import { register } from "../../services/users/register.service.js";

//registration user avec role fixed directement dans les routes
function createRegisterController(config) {
  return async function (req, res, next) {
    try {
      const data = req.body;
      let role;
      if (config.fixedRole) {
        role = config.fixedRole;
      } else if (config.allowedRoles) {
        if (!data || config.allowedRoles.includes(data.role)) {
          return res.status(400).json({ error: "Invalid role" });
        }
        role = data.role;
      }

      const createUser = await register(data, role);
      res.status(201).json({
        success: true,
        message: "User created",
        data: createUser,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default createRegisterController;
