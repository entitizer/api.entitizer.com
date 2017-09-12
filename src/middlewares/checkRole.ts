
import { Response, NextFunction } from 'express';

function error(res: Response) {
    return res.status(401).send('Insufficient role');
}

export function checkRole(req: any, res: Response, next: NextFunction) {
    if (!req.user || !req.user.app_metadata || !Array.isArray(req.user.app_metadata.roles)) { return error(res); }
    const roles: string[] = req.user.app_metadata.roles;

    const allowed = roles.some(function (role) {
        return ['admin'].indexOf(role) !== -1;
    });

    return allowed ?
        next() :
        error(res);
}
