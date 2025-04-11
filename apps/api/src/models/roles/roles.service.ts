import { Injectable } from '@nestjs/common';
import { UID } from 'src/common/entities/uid/uid';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Role } from 'src/common/roles/roles.utils';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserRoles(uid: UID): Promise<Role[]> {
    let roles: Role[] = [];

    const [admin, user] = await Promise.all([this._getAdminByUid(uid), this._getUserByUid(uid)]);

    if (admin) {
      roles.push(Role.Admin);
    }
    if (user) {
      roles.push(Role.User);
    }

    return roles;
  }

  private async _getAdminByUid(uid: UID) {
    return this.prisma.admin.findUnique({
      where: { uid: uid.value },
    });
  }

  private async _getUserByUid(uid: UID) {
    return this.prisma.user.findUnique({
      where: { uid: uid.value },
    });
  }
}
