## Dicas para revisão de código

### Commits
- Título (1a linha do commit): apresentar resumo do que foi alterado/adicionado/removido.
  ex: adiciona action que salva parametros no backend; exibe rótulo no componente de selecao de dataset;
- Descrição (outras linhas): dar mais detalhes de cada alteração:
  - motivos das alterações
    ex: havia um bug que causava...; nova funcionalidade que faz isso...; código foi movido para...;
  - bibliotecas adicionadas e versões (package.json)
    ex: atualiza para antd v4.6;
  - testes unitários criados/alterados
    ex: adiciona testes para a action fetchProjectSuccess;
- Mensagens auto-explicativas! Quem revisa o código deve entender o que foi feito (e porque foi feito) **sem perguntar para quem fez o commit**.
- Não devem ter conflitos. Solicitar que sejam resolvidas as ocorrências de "This branch has conflicts that must be resolved".

### SonarCloud Quality Gate
- Coverage > 80.0%, e sempre que possível = 100%
- 0 Bugs, 0 Code Smells, 0 Vulnerabilities

### Build Github actions COM SUCESSO

### ReactJS
- Usar Node 12 ou 14.
- Remover `console.log`.
- Não deixar código-fonte comentado.
- Pasta de módulos devem ser escritas em lower case
- Pasta de componentes devem ser escritas em camel case
- Nunca utilizar spread em retorno de reducer sem alteração
- Sempre utilizar hooks ao invés de HOCs
- Itens em uma lista devem ser renderizados com uma chave única (preferir uuid)
- Comentar apenas códigos que não estão muito claros
- Não utilizar comentários para blocos
- Action types devem conter @

### Redux
As instruções a seguir foram retiradas do [Redux Style Guide](https://redux.js.org/style-guide/style-guide).
- [Sempre retorne o `newState` no reducer. Outros valores irão causar problemas inesperados.](https://redux.js.org/basics/reducers)
  ex: `return message.error(error);` **(ERRADO)**
- [**NÃO faça atribuições de valores no `state`.** Crie e retorne um `newState`.](https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#updating-nested-objects)
  ex: `state.data = action.data; return state;` **(ERRADO)**
- [No reducer use apenas o state e o action. Não dispare ações ou funções assíncronas.](https://redux.js.org/style-guide/style-guide#reducers-must-not-have-side-effects)
- [No `state`, armazene tipos simples (`int`, `String`, ...), `Array` e plain `Object`. **NÃO armazene `function`, `Promise`, `class instances`.**](https://redux.js.org/style-guide/style-guide#do-not-put-non-serializable-values-in-state-or-actions)
- [Evite `arrays` aninhados no estado. Prefira armazená-los numa "forma normalizada".](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)
- [Nomeie as `actions` como "eventos", não como "setters".](https://redux.js.org/style-guide/style-guide#model-actions-as-events-not-setters)
  ex: `SET_TASK_NAME` `SET_TASK_DESCRIPTION` **(ERRADO)**. `TASK_DETAILS_EDITED` **(CORRETO)**.
- [Utilize nomes auto-explicativos para as actions. Evite nomes como `SET_DATA` e `UPDATE_DATA`.](https://redux.js.org/style-guide/style-guide#write-meaningful-action-names)
