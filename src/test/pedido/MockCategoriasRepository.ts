// import { OutputCategoriaDto } from "../../pedido/core/application/usecases/categoriaUseCases/categoria.dto";
// import { Categoria } from "../../pedido/core/domain/entity/categoria.entity";
// import { CategoriaException } from "../../pedido/core/application/exceptions/categoria.exception";

import { ICategoriasRepository } from "../../pedido/core/domain/repository/categorias.repository";

// class MockCategoriasRepository implements ICategoriasRepository {

//   private categorias: Categoria[] = [];

//   addCategorias(categorias: Categoria[]) {
//     this.categorias = categorias;
//   }

//   async findAll(): Promise<OutputCategoriaDto[]> {
//     if (this.categorias.length === 0) {
//       throw new CategoriaException('Não há nenhuma categoria cadastrada');
//     }
  
//     return this.categorias.map((categoria) => ({
//       id: categoria.id,
//       nome: categoria.nome,
//     }));
//   }
  
//   async existsByName(nome: string): Promise<boolean> {
//     return this.categorias.some(categoria => categoria.nome === nome);
//   }

//   async create(categoria: Categoria): Promise<Categoria> {
//     this.categorias.push(categoria);
//     return categoria;
//   }
// }

// export { MockCategoriasRepository };






export const MockCategoriasRepository: jest.Mocked<ICategoriasRepository> = {
    findAll: jest.fn(),
    existsByName: jest.fn(),
    create: jest.fn()
};

export default MockCategoriasRepository;