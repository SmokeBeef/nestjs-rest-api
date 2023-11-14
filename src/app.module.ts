import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProductsModule } from './products/products.module';

const staticModul = ServeStaticModule.forRoot({
  rootPath: 'public',
});

@Module({
  imports: [staticModul, UserModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
