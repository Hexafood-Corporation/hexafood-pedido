import { InputCategoriaDto, OutputCategoriaDto } from '../categoria.dto';

describe('InputCategoriaDto', () => {
  it('should create an instance', () => {
    const inputCategoriaDto = new InputCategoriaDto();
    expect(inputCategoriaDto).toBeDefined();
  });

  it('should have a nome property', () => {
    const inputCategoriaDto = new InputCategoriaDto();
    expect(inputCategoriaDto.nome).toBeUndefined();
  });
});

describe('OutputCategoriaDto', () => {
  it('should create an instance', () => {
    const outputCategoriaDto = new OutputCategoriaDto();
    expect(outputCategoriaDto).toBeDefined();
  });

  it('should have an id property', () => {
    const outputCategoriaDto = new OutputCategoriaDto();
    expect(outputCategoriaDto.id).toBeUndefined();
  });

  it('should have a nome property', () => {
    const outputCategoriaDto = new OutputCategoriaDto();
    expect(outputCategoriaDto.nome).toBeUndefined();
  });
});
