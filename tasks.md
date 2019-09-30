# Tarefas para finalizar MVP (ForAgri) <!-- omit in toc -->

## Índice <!-- omit in toc -->

- [Progresso](#Progresso)
- [Componentes Sem Estado](#Componentes-Sem-Estado)
  - [App](#App)
  - [Cabeçalho Principal (MainHeader)](#Cabe%C3%A7alho-Principal-MainHeader)
  - [Rodapé Principal (MainFooter)](#Rodap%C3%A9-Principal-MainFooter)
  - [Cabeçalho do Conteúdo (ContentHeader)](#Cabe%C3%A7alho-do-Conte%C3%BAdo-ContentHeader)
  - [Modal Novo Projeto (NewProjectModal)](#Modal-Novo-Projeto-NewProjectModal)
  - [Menu Lateral Esquerdo (LeftSideMenu)](#Menu-Lateral-Esquerdo-LeftSideMenu)
  - [Conteúdo do Experimento (ExperimentContent)](#Conte%C3%BAdo-do-Experimento-ExperimentContent)
  - [Container do Experimento (ExperimentContainer)](#Container-do-Experimento-ExperimentContainer)
  - [Drawer Lateral Direito (RightSideDrawer)](#Drawer-Lateral-Direito-RightSideDrawer)
  - [Alerta (Alert)](#Alerta-Alert)
- [Componentes Com Estado](#Componentes-Com-Estado)
  - [Tabela de Projetos (ProjectsTable)](#Tabela-de-Projetos-ProjectsTable)
  - [Abas de Experimento (ExperimentsTabs)](#Abas-de-Experimento-ExperimentsTabs)
  - [Fluxo do Experimento (ExperimentFlow)](#Fluxo-do-Experimento-ExperimentFlow)
  - [Conteúdo Drawer Conjunto de Dados (DataSetDrawerContent)](#Conte%C3%BAdo-Drawer-Conjunto-de-Dados-DataSetDrawerContent)
  - [Tabela de Conjunto de Dados (DataSetTable)](#Tabela-de-Conjunto-de-Dados-DataSetTable)
  - [Conteúdo Drawer Criação de Atributos Por Tempo](#Conte%C3%BAdo-Drawer-Cria%C3%A7%C3%A3o-de-Atributos-Por-Tempo)
  - [Conteúdo Drawer Pré-Seleção de Atributos (AttributePreSelectionDrawerContent)](#Conte%C3%BAdo-Drawer-Pr%C3%A9-Sele%C3%A7%C3%A3o-de-Atributos-AttributePreSelectionDrawerContent)
  - [Conteúdo Drawer Criação de Atributos Genéricos (GenericAttributeCreationDrawerContent)](#Conte%C3%BAdo-Drawer-Cria%C3%A7%C3%A3o-de-Atributos-Gen%C3%A9ricos-GenericAttributeCreationDrawerContent)
  - [Conteúdo Drawer Filtro de Atributos (AttributeFilterDrawerContent)](#Conte%C3%BAdo-Drawer-Filtro-de-Atributos-AttributeFilterDrawerContent)
  - [Conteúdo Drawer AutoML (AutoMLDrawerContent)](#Conte%C3%BAdo-Drawer-AutoML-AutoMLDrawerContent)
- [Páginas](#P%C3%A1ginas)
  - [Ínicio (raiz /)](#%C3%8Dnicio-raiz)
  - [Projetos (/projects)](#Projetos-projects)
  - [Projeto ID (/projects/{p_id})](#Projeto-ID-projectspid)
  - [Experimento ID (/projects/{p_id}/experiments/{e_id})](#Experimento-ID-projectspidexperimentseid)
- [Rotas](#Rotas)
  - [Ínicio (raiz /)](#%C3%8Dnicio-raiz--1)
  - [Projetos (/projects)](#Projetos-projects-1)
  - [Projeto ID (/projects/{p_id})](#Projeto-ID-projectspid-1)
  - [Experimento ID (/projects/{p_id}/experiments/{e_id})](#Experimento-ID-projectspidexperimentseid-1)

---

## Progresso

Acompanhe o progresso do projeto.

- [ ] Projeto Finalizado (MVP - ForAgri)
  - [ ] Componentes Sem Estado
    - [x] App
    - [x] Cabeçalho Principal (MainHeader)
    - [ ] Rodapé Principal (MainFooter)
    - [ ] Cabeçalho do Conteúdo (ContentHeader)
    - [ ] Modal Novo Projeto (NewProjectModal)
    - [ ] Menu Lateral Esquerdo (LeftSideMenu)
    - [ ] Conteúdo do Experimento (ExperimentContent)
    - [ ] Container do Experimento (ExperimentContainer)
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
- [x] Espera-se que possua um filho Layout;
- [x] Espera-se que o filho Layout possua um filho Header;
- [x] Espera-se que o filho Layout possua um filho Content;
- [x] Espera-se que o filho Layout possua um filho Footer;
- [x] Espera-se que o filho Header, do filho Layout, possua um filho Route;
- [x] Espera-se que o filho Route, do filho Header, do filho Layout, possua uma propriedade render que retorne um component MainHeader;
- [x] Espera-se que o filho Content, do filho Layout, possua um filho Switch;
- [x] Espera-se que as rotas principais (mainRoutes) sejam mapeadas dentro do componente Switch;
- [x] Espera-se que o filho Footer, do filho Layout, possua um filho MainFooter;

<a href="#progresso">Voltar ao topo ^</a>

### Cabeçalho Principal (MainHeader)

Cabeçalho principal da aplicação.  
Esse componente é responsável por exibir o logotipo e o menu principal
da aplicação.

- [x] Espera-se que o componente contenha um logotipo;
- [x] Espera-se que o componente receba uma propriedade rotas principais (mainRoutes);
- [x] Espera-se que o componente possua um filho Menu (componente antdesign)
- [x] Espera-se que a propriedade rotas principais (mainRoutes) seja mapeada em componentes Menu.Item (antd), filhos do Menu (antd);
- [x] Espera-se que o componente Menu.Item possua como chave (key) o atributo path do objeto de rota, elemento do vetor mainRoutes;
- [x] Espera-se que cada Menu.Item possua um filho Link
- [x] Espera-se que esse componente receba uma propriedade location (para receber essa propriedade o componente precisa estar roteado `<Route component={MainHeader} />`);
- [x] Espera-se que a propriedade selectedKeys do menu Ant Design seja preenchida com o resultado da chamada de função getCurrentRoute(location.pathname, mainRoutes) do arquivo utils.js;

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

### Container do Experimento (ExperimentContainer)

Componente para agrupar ExperimentContent, ExperimentsTabs e LeftSideMenu.

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
