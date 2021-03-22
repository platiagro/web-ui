import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Modal, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import ExperimentsTable from './ExperimentsTable';
import TemplatesTable from './TemplatesTable';

import './NewDeploymentModal.style.less';

/**
 * Componente de modal de nova implantação
 */
function NewDeploymentModal(props) {
  const {
    visible,
    loading,
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
  const [selectedType, setSelectedType] = useState(undefined);

  useEffect(() => {
    setFilteredExperiments(experimentsData);
    setFilteredTemplates(templatesData);
  }, [experimentsData, templatesData]);

  const handleSearch = (e) => {
    const filterValue = e.target.value.toLowerCase();

    const newFilteredExperiments = experimentsData.filter((experiment) =>
      experiment.name.toLowerCase().includes(filterValue)
    );

    const newFilteredTemplates = templatesData.filter((template) =>
      template.name.toLowerCase().includes(filterValue)
    );

    setFilteredExperiments(newFilteredExperiments);
    setFilteredTemplates(newFilteredTemplates);
  };

  const handleExperimentSelect = (selectedArray) => {
    const uuid = selectedArray[0];

    setSelectedType('experiment');
    setSelectedUuid(uuid);
  };

  const handleTemplateSelect = (selectedArray) => {
    const uuid = selectedArray[0];

    setSelectedType('template');
    setSelectedUuid(uuid);
  };

  const handleOk = () => onConfirm(selectedType, selectedUuid);

  const experimentsSelectedRow =
    selectedType === 'experiment' ? selectedUuid : '';

  const templatesSelectedRow = selectedType === 'template' ? selectedUuid : '';

  return (
    <Modal
      title={<strong>Escolha um fluxo</strong>}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      width={'70%'}
      cancelText='Cancelar'
      okText='Confirmar'
      className='newDeploymentModal'
      confirmLoading={loading}
    >
      <div>
        <Input
          placeholder='Pesquisar fluxo'
          suffix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          onChange={handleSearch}
        />
      </div>
      <div className='section'>
        <ExperimentsTable
          onSelect={handleExperimentSelect}
          experimentsData={filteredExperiments}
          selectedRowKey={experimentsSelectedRow}
        />
      </div>
      <div className='section'>
        <TemplatesTable
          onSelect={handleTemplateSelect}
          templatesData={filteredTemplates}
          selectedRowKey={templatesSelectedRow}
        />
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
  loading: PropTypes.bool.isRequired,
};

export default NewDeploymentModal;
