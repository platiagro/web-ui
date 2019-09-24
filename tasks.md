# Tarefas para finalizar MVP (ForAgri) <!-- omit in toc -->

## Índice <!-- omit in toc -->

- [Progresso](#progresso)
- [Componentes Sem Estado](#componentes-sem-estado)
  - [App](#app)
  - [Cabeçalho Principal (MainHeader)](#cabe%c3%a7alho-principal-mainheader)
  - [Rodapé Principal (MainFooter)](#rodap%c3%a9-principal-mainfooter)
  - [Cabeçalho do Conteúdo (ContentHeader)](#cabe%c3%a7alho-do-conte%c3%bado-contentheader)
  - [Modal Novo Projeto (NewProjectModal)](#modal-novo-projeto-newprojectmodal)
  - [Menu Lateral Esquerdo (LeftSideMenu)](#menu-lateral-esquerdo-leftsidemenu)
  - [Conteúdo do Experimento (ExperimentContent)](#conte%c3%bado-do-experimento-experimentcontent)
  - [Drawer Lateral Direito (RightSideDrawer)](#drawer-lateral-direito-rightsidedrawer)
  - [Alerta (Alert)](#alerta-alert)
- [Componentes Com Estado](#componentes-com-estado)
  - [Tabela de Projetos (ProjectsTable)](#tabela-de-projetos-projectstable)
  - [Abas de Experimento (ExperimentsTabs)](#abas-de-experimento-experimentstabs)
  - [Fluxo do Experimento (ExperimentFlow)](#fluxo-do-experimento-experimentflow)
  - [Conteúdo Drawer Conjunto de Dados (DataSetDrawerContent)](#conte%c3%bado-drawer-conjunto-de-dados-datasetdrawercontent)
  - [Tabela de Conjunto de Dados (DataSetTable)](#tabela-de-conjunto-de-dados-datasettable)
  - [Conteúdo Drawer Criação de Atributos Por Tempo](#conte%c3%bado-drawer-cria%c3%a7%c3%a3o-de-atributos-por-tempo)
  - [Conteúdo Drawer Pré-Seleção de Atributos (AttributePreSelectionDrawerContent)](#conte%c3%bado-drawer-pr%c3%a9-sele%c3%a7%c3%a3o-de-atributos-attributepreselectiondrawercontent)
  - [Conteúdo Drawer Criação de Atributos Genéricos (GenericAttributeCreationDrawerContent)](#conte%c3%bado-drawer-cria%c3%a7%c3%a3o-de-atributos-gen%c3%a9ricos-genericattributecreationdrawercontent)
  - [Conteúdo Drawer Filtro de Atributos (AttributeFilterDrawerContent)](#conte%c3%bado-drawer-filtro-de-atributos-attributefilterdrawercontent)
  - [Conteúdo Drawer AutoML (AutoMLDrawerContent)](#conte%c3%bado-drawer-automl-automldrawercontent)
- [Páginas](#p%c3%a1ginas)
  - [Ínicio (raiz /)](#%c3%8dnicio-raiz)
  - [Projetos (/projects)](#projetos-projects)
  - [Projeto ID (/projects/{p_id})](#projeto-id-projectspid)
  - [Experimento ID (/projects/{p_id}/experiments/{e_id})](#experimento-id-projectspidexperimentseid)
- [Rotas](#rotas)
  - [Ínicio (raiz /)](#%c3%8dnicio-raiz--1)
  - [Projetos (/projects)](#projetos-projects-1)
  - [Projeto ID (/projects/{p_id})](#projeto-id-projectspid-1)
  - [Experimento ID (/projects/{p_id}/experiments/{e_id})](#experimento-id-projectspidexperimentseid-1)

---

## Progresso

Acompanhe o progresso do projeto.

- [ ] Projeto Finalizado (MVP - ForAgri)
  - [ ] Componentes Sem Estado
    - [x] App
    - [ ] Cabeçalho Principal (MainHeader)
    - [ ] Rodapé Principal (MainFooter)
    - [ ] Cabeçalho do Conteúdo (ContentHeader)
    - [ ] Modal Novo Projeto (NewProjectModal)
    - [ ] Menu Lateral Esquerdo (LeftSideMenu)
    - [ ] Conteúdo do Experimento (ExperimentContent)
    - [ ] Drawer Lateral Direito (RightSideDrawer)
    - [ ] Alerta (Alert)
  - [ ] Componentes Com Estado
    - [ ] Tabela de Projetos (ProjectsTable)
    - [ ] Abas de Experimento (ExperimentsTabs)
    - [ ] Fluxo do Experimento (ExperimentFlow)
    - [ ] Conteúdo Drawer Conjunto de Dados (DataSetDrawerContent)
    - [ ] Tabela de Conjunto de Dados (DataSetTable)
    - [ ] Conteúdo Drawer Criação de Atributos Por Tempo (TimeAttributeCreationDrawerContent)
    - [ ] Conteúdo Drawer Pré-Seleção de Atributos (AttributePreSelectionDrawerContent)
    - [ ] Conteúdo Drawer Criação de Atributos Genéricos (GenericAttributeCreationDrawerContent)
    - [ ] Conteúdo Drawer Filtro de Atributos (AttributeFilterDrawerContent)
    - [ ] Conteúdo Drawer AutoML (AutoMLDrawerContent)
  - [ ] Páginas
    - [ ] Ínicio (raiz /)
    - [ ] Projetos (/projects)
    - [ ] Projeto ID (/projects/{p_id})
    - [ ] Experimento ID (/projects/{p_id}/experiments/{e_id})
  - [ ] Rotas
    - [ ] Ínicio (raiz /)
    - [ ] Projetos (/projects)
    - [ ] Projeto ID (/projects/{p_id})
    - [ ] Experimento ID (/projects/{p_id}/experiments/{e_id})

<a href="#progresso">Voltar ao topo ^</a>

---

## Componentes Sem Estado

Abaixo estão listados e descritos os componentes sem estado.

<a href="#progresso">Voltar ao topo ^</a>

### App

Componente principal da aplicação.  
Esse componente é responsável por estruturar o layout principal da aplicação.  
Esse componente também é responsável por rotear o conteúdo principal da aplicação.

- [x] Espera-se que o componente seja do tipo Layout;
- [x] Espera-se que possua um filho MainDrawer;
- [x] Espera-se que possua um filho Layout;
- [x] Espera-se que o filho Layout possua um filho Header;
- [x] Espera-se que o filho Layout possua um filho Content;
- [x] Espera-se que o filho Layout possua um filho Footer;
- [x] Espera-se que o filho Header, do filho Layout, possua um filho Route;
- [x] Espera-se que o filho Route, do filho Header, do filho Layout, possua uma propriedade component igual a MainHeader;
- [x] Espera-se que o filho Content, do filho Layout, possua um filho Switch;
- [x] Espera-se que as rotas principais (mainRoutes) sejam mapeadas dentro do componente Switch;
- [x] Espera-se que o filho Footer, do filho Layout, possua um filho MainFooter;

<a href="#progresso">Voltar ao topo ^</a>

### Cabeçalho Principal (MainHeader)

Cabeçalho principal da aplicação.  
Esse componente é responsável por exibir o logotipo e o menu principal
da aplicação.

- [ ] Espera-se que o componente contenha um logotipo;
- [ ] Espera-se que o componente receba uma propriedade rotas principais (mainRoutes);
- [ ] Espera-se que a propriedade rotas principais (mainRoutes) seja um vetor (array);
- [ ] Espera-se que qualquer elemento da propriedade rotas principais (mainRoutes) seja um objeto;
- [ ] Espera-se que qualquer objeto filho da propriedade rotas principais (mainRoutes) contenha a chave (key) caminho (path);
- [ ] Espera-se que qualquer objeto filho da propriedade rotas principais (mainRoutes) contenha a chave (key) título (title);
- [ ] Espera-se que a propriedade rotas principais (mainRoutes) seja mapeada em um menu utilizando o framework Ant Design;
- [ ] Espera-se que a key de cada elemento do menu seja o atributo path do objeto filho das rotas principais (mainRoutes);
- [ ] Espera-se que esse componente receba uma propriedade location (para receber essa propriedade o componente precisa estar roteado `<Route component={MainHeader} />`);
- [ ] Espera-se que a propriedade location possua a chave (key) pathname;
- [ ] Espera-se que a propriedade selectedKeys do menu Ant Design seja preenchida com o resultado da chamada de função getCurrentRoute(location.pathname, mainRoutes) do arquivo utils.js;

<a href="#progresso">Voltar ao topo ^</a>

### Rodapé Principal (MainFooter)

Rodapé principal da aplicação.  
Esse componente é responsável por exibir o rodapé principal da aplicação.

- [ ] Espera-se que o componente seja uma função;
- [ ] Espera-se que esse componente renderize uma mensagem de copyright com o ano atual;

<a href="#progresso">Voltar ao topo ^</a>

### Cabeçalho do Conteúdo (ContentHeader)

Cabeçalho do conteúdo principal.  
Esse componente é responsável por exibir um título.  
Esse componente pode exibir um subtítulo.  
Esse componente pode exibir uma seta para voltar a tela anterior.  
Esse componente pode exibir um breadcrumbs.
Esse componente pode receber um evento de duplo clique no título, para permitir a edição do mesmo.

- [ ] Espera-se que o componente receba uma propriedade título (title);
- [ ] Espera-se que o componente renderize o título;
- [ ] Espera-se que o componente seja capaz de receber uma propriedade subtítulo (subtitle);
- [ ] Espera-se que o componente renderize o subtítulo, quando houver um;
- [ ] Espera-se que o componente seja capaz de receber uma propriedade backPath;
- [ ] Espera-se que o componente renderize a seta "voltar" com o caminho contído na propriedade backPath, quando houver um caminho na mesma;
- [ ] Espera-se que o componente seja capaz de receber uma propriedade breadcrumbs;
- [ ] Espera-se que o componente renderize o breadcrumbs contído na propriedade breadcrumbs, quando houver um;
- [ ] Espera-se que o componente seja capaz de receber uma propriedade onTitleDoubleClick;
- [ ] Espera-se que o componente chame a função onTitleDoubleClick, caso exista uma, e ocorra um evento de doubleClick no título;

<a href="#progresso">Voltar ao topo ^</a>

### Modal Novo Projeto (NewProjectModal)

Componente para criação de um novo projeto.  
Esse componente é responsável por exibir um modal com formulário para adicionar um novo projeto.  
Esse formulário possui apenas um campo, que é o nome do projeto.  
O campo nome do projeto já deve vir preenchido com uma sugestão.  
Nome de projeto em branco é considerado inválido.  
O botão criar só é habilitado caso o nome do projeto seja válido.  
Se o botão cancelar ou fechar for clicado, ou ocorrer um clique fora da área do modal, o modal deve fechar e resetar o formulário.  
Se o botão criar for clicado, um novo projeto deve ser criado.

<a href="#progresso">Voltar ao topo ^</a>

### Menu Lateral Esquerdo (LeftSideMenu)

Componente menu para exibir "ferramentas" do fluxograma.  
Esse menu deve ser "dobrável".  
Esse menu deve conter as "abas" templates, dados de entrada, engenharia de atributos e treinamento.  
Todas as abas devem estar desativadas, exceto templates.  
Ao clicar em um dos templates do menu, o fluxo deve ser adicionado ao experimento.

<a href="#progresso">Voltar ao topo ^</a>

### Conteúdo do Experimento (ExperimentContent)

Componente para exibir um experimento.  
Esse componente deve possuir um corpo, onde o fluxo do experimento será montado.  
Esse componente deve possuir um botão para executar o experimento.  
Esse componente deve possuir um botão para implantar um experimento.

<a href="#progresso">Voltar ao topo ^</a>

### Drawer Lateral Direito (RightSideDrawer)

Componente para exibir a configuração de um passo do fluxo de um experimento.

<a href="#progresso">Voltar ao topo ^</a>

### Alerta (Alert)

Componente que exibe uma mensagem ao usuário.

<a href="#progresso">Voltar ao topo ^</a>

---

## Componentes Com Estado

Abaixo estão listados e descritos os componentes com estado.

<a href="#progresso">Voltar ao topo ^</a>

### Tabela de Projetos (ProjectsTable)

Componente para listar projetos.  
Esse componente é responsável por exibir uma tabela com os projetos cadastrados.  
Quando esse componente for montado, ele deve realizar uma requisição para buscar os projetos cadastrados.  
Enquanto os projetos não são retornados, um loading deve ser exibido.  
Caso não existam projetos, um componente `<Empty />` deve ser exibido. Por padrão o componente do Ant Design já possuí uma configuração para isso.  
Quando uma ou mais linhas da tabela são selecionadas, o botão para excluir um projeto deve ser desabilitado.  
Um duplo clique sobre uma linha deve direcionar o usuário para a edição do projeto.
Esse componente deve possuir paginação.

<a href="#progresso">Voltar ao topo ^</a>

### Abas de Experimento (ExperimentsTabs)

Componente para exibir os experimentos do projeto em abas.  
Quando esse componente for montado, ele deve realizar uma requisição para buscar os experimentos do projeto.  
Esse componente deve ter um botão que permita adicionar novas abas (experimentos).  
Um duplo clique sobre uma aba (experimento), deve permitir que o nome do mesmo seja editado.

<a href="#progresso">Voltar ao topo ^</a>

### Fluxo do Experimento (ExperimentFlow)

Componente para exibir o fluxo de um experimento.  
Quando esse componente for montado, ele deve realizar uma requisição para buscar os dados do fluxo do experimento.  
Cada passo do fluxo deve permitir um clique que irá abrir o drawer de configuração do passo.

<a href="#progresso">Voltar ao topo ^</a>

### Conteúdo Drawer Conjunto de Dados (DataSetDrawerContent)

Componente para exibir as configurações do passo "Conjunto de Dados" do fluxo de um experimento.

<a href="#progresso">Voltar ao topo ^</a>

### Tabela de Conjunto de Dados (DataSetTable)

Componente para exibir a tabela de conjunto de dados, no passo "Conjunto de Dados" do fluxo de um experimento.

<a href="#progresso">Voltar ao topo ^</a>

### Conteúdo Drawer Criação de Atributos Por Tempo

Componente para exibir as configurações do passo "Criação de Atributos Por Tempo" do fluxo de um experimento.

<a href="#progresso">Voltar ao topo ^</a>

### Conteúdo Drawer Pré-Seleção de Atributos (AttributePreSelectionDrawerContent)

Componente para exibir as configurações do passo "Pré-Seleção de Atributos" do fluxo de um experimento.

<a href="#progresso">Voltar ao topo ^</a>

### Conteúdo Drawer Criação de Atributos Genéricos (GenericAttributeCreationDrawerContent)

Componente para exibir as configurações do passo "Criação de Atributos Genéricos" do fluxo de um experimento.

<a href="#progresso">Voltar ao topo ^</a>

### Conteúdo Drawer Filtro de Atributos (AttributeFilterDrawerContent)

Componente para exibir as configurações do passo "Filtro de Atributos" do fluxo de um experimento.

<a href="#progresso">Voltar ao topo ^</a>

### Conteúdo Drawer AutoML (AutoMLDrawerContent)

Componente para exibir as configurações do passo "AutoML" do fluxo de um experimento.

<a href="#progresso">Voltar ao topo ^</a>

---

## Páginas

Abaixo estão listadas e descritas as páginas da aplicação, que fazem referência direta a uma rota.

<a href="#progresso">Voltar ao topo ^</a>

### Ínicio (raiz /)

Página inicial da aplicação.

<a href="#progresso">Voltar ao topo ^</a>

### Projetos (/projects)

Página de projetos da aplicação.

<a href="#progresso">Voltar ao topo ^</a>

### Projeto ID (/projects/{p_id})

Página de um projeto da aplicação.

<a href="#progresso">Voltar ao topo ^</a>

### Experimento ID (/projects/{p_id}/experiments/{e_id})

Página de um experimento, de um projeto da aplicação.

<a href="#progresso">Voltar ao topo ^</a>

---

## Rotas

Abaixo estão listadas e descritas as rotas acessíveis da aplicação.

<a href="#progresso">Voltar ao topo ^</a>

### Ínicio (raiz /)

Rota que exibe a página `<Root />`

<a href="#progresso">Voltar ao topo ^</a>

### Projetos (/projects)

Rota que exibe a página `<Projects />`

<a href="#progresso">Voltar ao topo ^</a>

### Projeto ID (/projects/{p_id})

Rota que exibe a página `<Project id={p_id} />`

<a href="#progresso">Voltar ao topo ^</a>

### Experimento ID (/projects/{p_id}/experiments/{e_id})

Rota que exibe a página `<Experiment id={e_id} />` como filha da página `<Project id={p_id}>`

<a href="#progresso">Voltar ao topo ^</a>
