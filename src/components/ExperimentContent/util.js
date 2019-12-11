const getPhase = (param, manifest, alter = null) => {
  return Object.values(manifest).find((n) => n.displayName === param)
    ? Object.values(manifest).find((n) => n.displayName === param).phase
    : alter;
};

const taskGetPhases = (taskStatus, manifest) => {
  //   // feature-temporal
  //   // pre-selection-1
  //   // feature-tools
  //   // pre-selection-2
  //   // filter
  //   // automl
  //   // regression
  const tasks = { ...taskStatus };

  tasks.conjunto_dados = 'Succeeded';

  tasks.atributos_tempo = getPhase(
    'feature-temporal',
    manifest.status.nodes,
    'Pending'
  );

  tasks.pre_selecao1 = getPhase(
    'pre-selection-1',
    manifest.status.nodes,
    'Pending'
  );

  tasks.atributos_genericos = getPhase(
    'feature-tools',
    manifest.status.nodes,
    'Pending'
  );

  tasks.pre_selecao2 = getPhase(
    'pre-selection-2',
    manifest.status.nodes,
    'Pending'
  );

  tasks.filtro_atributos = getPhase('filter', manifest.status.nodes, 'Pending');

  tasks.automl = getPhase('automl', manifest.status.nodes, 'Pending');

  tasks.regression = getPhase('regression', manifest.status.nodes, 'Pending');

  return tasks;
};

export default taskGetPhases;
