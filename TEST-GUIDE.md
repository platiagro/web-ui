# Guia para criação de testes automatizados

Veja como criar testes para este projeto.

## Estrutura do teste

- Sempre crie o describe para descrever o que se está testando e já deixar preparado para criar mais testes. Mesmo que tenha apenas um teste dentro do describe ele já deixa preparado para criarmos mais.
- Use `it('should ...')` no começo de um teste, esse padrão ajuda a escrevermos e ajuda a pessoa ler.
- Prefira testes com nome curto, no máximo duas linhas. Se precisar explicar mais coisas use comentários. Testes são como a documentação do nosso código.
- Na maioria das vezes mais de um describe no teste só deixa ele mais aninhado e complexo, pense em separar em mais de um arquivo de teste se precisar.

```js
// Imports

describe('O que estou testando', () => {
  // Criação de variáveis compartilhadas entre testes
  const text = 'text';

  it('should ....', () => {
    expect(text).toBe('text');
  });
});
```

## Componentes e UiComponents

- Procurar testar o comportamento do componente e se ele renderiza corretamente de acordo com as props passadas:
  - Ele renderizou?
  - As props passadas renderizaram os elementos que eu queria no componente?
  - De acordo com as props passadas ele desabilitou ou escondeu os elementos certos?
  - A função de click ou as funções passadas foram executadas no click, focus ou blur?
  - Alguma propriedade de style importante para o componente está presente?

## Hooks

- Testar o comportamento e o que ele retorna de acordo com os parâmetros passados:
  - O retorno do hook é o esperado?
  - As funções que ele retorna usam useCallback e não mudam em toda renderização?
  - O estado interno do hook é alterado quando chamada alguma função que ele retorna?

## Action Types

- Testar se ele tem o prefixo correto. Isso garante que apenas um reducer execute a action, evitando efeitos inesperados.

## Reducer

Reducers não tem muito segredo para testar porque são funções puras, ou seja, o retorno dela é sempre produto dos parâmetros recebidos e ele não tem side effects (efeitos colaterais), como chamadas API, por exemplo.

- Testar se a action passada modifica o estado atual, retornando outro estado. É necessário testar cada um dos cases do reducer. Mesmo que dois cases executem o mesmo bloco de código você deve testar os dois.

## Action Creators (Apenas Retorna um Objeto de Action)

- Testar se o objeto de action criado pelo action creator é o esperado, verificando o type, payload e outros atributos da action.

## Action Creators Assíncronos (Redux Thunk)

É preciso mockar as chamadas do Axios, porque não queremos fazer requisições reais para a API e é preciso mockar a store, porque não queremos recriar a store com todos os reducers para cada teste que vamos fazer.

- Testar se o action creator assíncrono despacha todas as actions esperadas para store, isso também inclui as actions de erros. Então basicamente serão 2 testes separados, um para o sucesso, simulando que deu tudo certo e outro simulando um erro de uma chamada da API (por exemplo), em que o código irá para o bloco catch e despachará uma action de erro.

Se seu action creator assíncrono tem muitos IFs e condições seria interessante quebrar em mais funções separando responsabilidades, mas se não der pra fazer isso ache um jeito de testar cada um desses IFs ou cases de um switch.

## Containers

Complicados de testar porque são componentes que possuem muitas regras de interface e renderizam componentes menores.

- No geral temos que testar o comportamento assim como um componente, e mockar a store e chamadas para a API, se for preciso.

## Pages e Routes

- Nelas podemos testar se renderizou, mas este teste não tem tanto impacto no projeto.

## Utils

- Testar comportamento das funções. Quanto mais puras forem mais fácil é de testar.

## Configs

- Testar se as configs sao strings ou números, dependendo da necessidade e evitar testar o valor das configs.
