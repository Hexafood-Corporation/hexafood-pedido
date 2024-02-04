<h1 align="center">
    Hexafood Pedidos
</h1>


## Índice

- <a href="#boat-sobre-o-projeto">Sobre o projeto</a>
- <a href="#hammer-tecnologias">Tecnologias</a>
- <a href="#rocket-como-rodar-esse-projeto">Como rodar esse projeto</a>
- <a href="#open_file_folder-sobre-o-microsserviço-pedido">Sobre o Microsserviço Pedido</a>
- <a href="#electric_plug-cobertura-de-testes-com-sonarcloud">Cobertura de testes com SonarCloud</a>
- <a href="#bookmark_tabs-licença">Licença</a>
- <a href="#wink-autores">Autores</a>
## :boat: Sobre o projeto

Esse projeto faz parte do trabalho "Tech Challenge - Fase 04", ministrado no quarto módulo do curso de Pós Graduação Software Architecture da FIAP em parceria com a Alura.

Para exercitar os conceitos apresentados nas matérias do curso, sendo elas Estrutura de Microsserviços e Qualidade de Software, esse projeto foi atualizado a fim de abarcar os novos conteúdos. Dessa forma. o projeto foi dividido em 03 (três) microsserviços, sendo cada um deles com seus próprios testes unitários e aferição de cobertura de testes. Nesse repositório, está o microsserviço de Pedidos. 

Toda infraestrutura e microsserviços estão distribuídos pelos seguintes repositórios:

- [Hexaform (Infraestrutura)](https://github.com/lucassouzati/hexaform)
- [Microsserviço Pedido](https://github.com/lucassouzati/hexafood-pedido) (Este)
- [Microsserviço Produção](https://github.com/brpadilha/hexafood-producao)
- [Microsserviço Pagamento](https://github.com/stesuzart/hexafood-payments)


## :hammer: Tecnologias:

- **[Typescript](https://www.typescriptlang.org)**
- **[NestJS](https://nestjs.com/)**
- **[PostgreSQL](https://www.postgresql.org/)**
- **[JestJS](https://jestjs.io/pt-BR/)**

## :rocket: Como rodar esse projeto

Se você estiver usando Windows, vai precisar do WSL para rodar esse projeto de forma prática. Para isso, você pode instalá-lo seguindo o seguinte [tutorial](https://learn.microsoft.com/pt-br/windows/wsl/install). Também será necessário uma distribuição linux para utilizar o WSL. Recomendo o Ubuntu que pode ser baixando na própria Microsoft Store no [link](https://apps.microsoft.com/store/detail/ubuntu/9PDXGNCFSCZV).
Depois, vai precisar do Docker, o qual a versão de Windows pode ser encontrada [aqui](https://docs.docker.com/desktop/install/windows-install/).
Então, clone o projeto dentro do WSL, vá para pasta dele e execute o comando:

```
docker compose build --no-cache
```

Após a construção da imagem, basta executar o comando:

```
docker compose up
```

O projeto estará executando no endereço http://localhost:3000/.

Para limpar o volume db do docker, execute o comando:
docker-compose down -v

## :open_file_folder: Sobre o Microsserviço Pedido

Após quebrar a arquitetura monolítica anterior, o fluxo da criação de pedidos foi mantido nesse microsserviço. Isso indica que ele é o principal responsável por todo fluxo, tendo o papel de criar o pedido e comunicar ao cliente que o mesmo está pronto. Ao removermos as responsabilidade de pagamento e gestão de produção para outros microsserviços, isolamos o fluxo de ponta a ponta. O pedido começa nesse microsserviço, é atualizado durante as fases e depois concluído também.  

A comunicação com os outros microsserviços, se dá através de uma fila SQS da AWS. Quando o pedido é criado, este microsserviço deve disparar uma mensagem na fila informando que existe um novo pedido. Ao mesmo tempo, este microsserviço fica escutando a fila de pagamentos processados, que é o resultado do procesamento de novos pedidos pelo microsserviço pagamento. 

Este microsserviço então atualiza o status do pedido com base nas informações obtidas na fila de pagamentos processados, e dispara uma outra mensagme para fila de pedidos recebidos. Esssa por sua vez é monitorada pelo microsserviço de produção, a qual é responsável por disparar outra mensagem informando que o pedido está pronto.

Por fim, o microsserviço de pedido ecuta a fila de pedidos prontos e atualiza o status para que o cliente retire o mesmo. Esse fluxo, pode ser visto na imagem a seguir:

<br>
<h4 align="center">
    <img alt="Representação visual comunicação entre os microsserviços" title="sqs" src=".github/readme/assincrono.drawio.png" width="1864px" />
</h4>
<br>


## :electric_plug: Cobertura de testes com SonarCloud

A fim de atender aos critérios de Qualidade de Software do desafio, foi implementaod testes unitários neste microsserviço, e configurado a pipeline para executar uma verificação a cada push na branch main. Dessa forma, caso o código está com menos de 80% de cobertura de testes, ele é rejeitado. Na imagem seguir, temos um exemplo de report anexado a PR informando a análise do SonarCloud:

<br>
<h4 align="center">
    <img alt="Análise do sonarcloud" title="sqs" src=".github/readme/sonarcloudpr.png" width="1864px" />
</h4>
<br>

E na imagem a seguir segue um relatório detalhado do código deste microsserviço, que fica disponível no próprio portal do SonarCloud:

<br>
<h4 align="center">
    <img alt="Análise do sonarcloud" title="sqs" src=".github/readme/sonarcloudanalise.png" width="1864px" />
</h4>
<br>


## :bookmark_tabs: Licença

Este projeto esta sobe a licença MIT. Veja a [LICENÇA](https://opensource.org/licenses/MIT) para saber mais.

## :wink: Autores

Feito com ❤️ por:

- [Bruno Padilha](https://www.linkedin.com/in/brpadilha/)
- [Lucas Siqueira](https://www.linkedin.com/in/lucassouzatidev/)
- [Marayza](https://www.linkedin.com/in/marayza-gonzaga-7766251b1/)

[Voltar ao topo](#índice)