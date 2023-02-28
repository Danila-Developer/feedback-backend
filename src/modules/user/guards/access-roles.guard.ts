import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../decorators/access-role.decorator";

@Injectable()
export class AccessRolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        try {
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token) throw new UnauthorizedException({message: 'Пользователь не авторизован'})

            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if (!requiredRoles) return true

            const user = this.jwtService.verify(token)
            request.user = user

            const isAccess = requiredRoles.includes(user.role.value)
            if (!isAccess) throw new HttpException('Доступ запрещен', HttpStatus.FORBIDDEN)

            return true
        } catch (err) {
            throw new UnauthorizedException({message: err.message})
        }
    }

}