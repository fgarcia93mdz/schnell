const ROLES = require("../config/roles");
const SUBROLES = require("../config/subroles");

const verifyRoles = (allowedRoles = "*", allowedSubRoles = "*") => {
    return (req, res, next) => {
        if (!req?.usuario?.rol || !req?.usuario?.sub_rol) {
            return res.status(401).json({ mensaje: "Sin autorización generada" });
        }

        const rolesArray = allowedRoles === "*" ? Object.values(ROLES) : allowedRoles.map(role => ROLES[role]);
        const subRolesArray = allowedSubRoles === "*" ? Object.values(SUBROLES) : allowedSubRoles.map(subRole => SUBROLES[subRole]);

        const roleMatch = rolesArray.includes(req.usuario.rol);
        const subRoleMatch = subRolesArray.includes(req.usuario.sub_rol);

        if (!roleMatch || !subRoleMatch) {
            return res.status(401).json({ mensaje: "No autorizado" });
        }

        next();
    };
};

module.exports = verifyRoles;
