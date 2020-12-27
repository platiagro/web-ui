import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import ExperimentsTable from './ExperimentsTable';

/**
 * Componente de modal de nova implantação
 */
function NewDeploymentModal(props) {
  const {
    visible,
    experimentsData,
    templatesData,
    onCancel,
    onConfirm,
  } = props;

  const [filteredExperiments, setFilteredExperiments] = useState(
    experimentsData
  );
  const [filteredTemplates, setFilteredTemplates] = useState(templatesData);
  const [selectedUuid, setSelectedUuid] = useState(undefined);

  const handleSearch = (e) => {
    // FIXME: sanitizar filtro
    const filterValue = e.target.value;

    const newFilteredExperiments = experimentsData.filter((experiment) =>
      experiment.name.includes(filterValue)
    );

    const newFilteredTemplates = templatesData.filter((template) =>
      template.name.includes(filterValue)
    );

    setFilteredExperiments(newFilteredExperiments);
    setFilteredTemplates(newFilteredTemplates);
  };

  const handleExperimentSelect = (uuid) =>
    setSelectedUuid(`Experiment-${uuid}`);

  const handleOk = () => onConfirm(selectedUuid);

  return (
    <Modal
      title={<strong>Escolha um fluxo</strong>}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={'70%'}
      cancelText='Cancelar'
      okText='Confirmar'
    >
      <div>
        <Input
          placeholder='Pesquisar fluxo'
          suffix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          onChange={handleSearch}
        />
      </div>
      <div>
        <ExperimentsTable
          onSelect={handleExperimentSelect}
          experimentsData={filteredExperiments}
        />
      </div>
      <div>
        {/* FIXME: Adicionar tabela real */}
        Tabela Fluxos/Templates
        <hr />
        {JSON.stringify(filteredTemplates)}
      </div>
    </Modal>
  );
}

NewDeploymentModal.propTypes = {
  experimentsData: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  templatesData: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatarColor: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
  visible: PropTypes.bool.isRequired,
};

export default NewDeploymentModal;
