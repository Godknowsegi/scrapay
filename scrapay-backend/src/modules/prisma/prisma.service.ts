import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
      .then(() => {
        console.log('Database Connected==========🔗🔗🔗🔗🔗🔗🔗🔗=======>');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // async enableShutdownHooks(app: INestApplication) {
  //     this.$on('beforeExit', async () => {
  //         await app.close();
  //     });
  // }
}
