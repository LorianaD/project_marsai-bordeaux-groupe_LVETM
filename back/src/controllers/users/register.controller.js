import { register } from "../../services/users/register.service.js";

//registration user avec role fixed directement dans les routes
function createRegisterController(config) {
  return async function (req, res, next) {
    try {
      const data = req.body;
      const role = config.fixedRole;

      const createUser = await register(data, role);
      res.status(201).json({
        success: true,
        message: "Utilisateur Crée",
        data: createUser,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default createRegisterController;
