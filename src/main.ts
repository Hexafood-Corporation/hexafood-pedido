import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HeaderMiddleware } from './middleware/headers.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Hexafood 🍔')
    .setDescription(
      'Esta é uma amostra da API do Hexafood. Nela você poderá fazer requisições para criar, atualizar, deletar e listar os produtos, itens, pedidos e clientes.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

    // Apply the HeaderMiddleware globally
    app.use(new HeaderMiddleware().use);
  await app.listen(3000);
}
bootstrap();
