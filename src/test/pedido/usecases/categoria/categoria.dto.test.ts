import {
  InputCategoriaDto,
  OutputCategoriaDto,
} from 'src/pedido/core/application/usecases/categoriaUseCases/categoria.dto';

describe('InputCategoriaDto', () => {
  it('should create an instance of InputCategoriaDto', () => {
    const nome = 'Test Nome';
    const inputCategoriaDto = new InputCategoriaDto();
    inputCategoriaDto.nome = nome;
    expect(inputCategoriaDto).toBeInstanceOf(InputCategoriaDto);
    expect(inputCategoriaDto.nome).toBe(nome);
  });
});

describe('OutputCategoriaDto', () => {
  it('should create an instance of OutputCategoriaDto', () => {
    const id = 1;
    const nome = 'Test Nome';
    const outputCategoriaDto = new OutputCategoriaDto();
    outputCategoriaDto.id = id;
    outputCategoriaDto.nome = nome;
    expect(outputCategoriaDto).toBeInstanceOf(OutputCategoriaDto);
    expect(outputCategoriaDto.id).toBe(id);
    expect(outputCategoriaDto.nome).toBe(nome);
  });
});
