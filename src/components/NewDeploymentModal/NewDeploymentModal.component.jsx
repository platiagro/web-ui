import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import ExperimentsTable from './ExperimentsTable';
import TemplatesTable from './TemplatesTable';

import './NewDeploymentModal.style.less';

const NewDeploymentModal = ({
  visible,
  loading,
  experimentsLoading,
  templatesLoading,
  experimentsData,
  templatesData,
  onCancel,
  onConfirm,
}) => {
  const [filteredExperiments, setFilteredExperiments] =
    useState(experimentsData);
  const [filteredTemplates, setFilteredTemplates] = useState(templatesData);
  const [selectedUuid, setSelectedUuid] = useState(undefined);
  const [selectedType, setSelectedType] = useState(undefined);

  const experimentsSelectedRow = useMemo(() => {
    return selectedType === 'experiment' ? selectedUuid : '';
  }, [selectedType, selectedUuid]);

  const templatesSelectedRow = useMemo(() => {
    return selectedType === 'template' ? selectedUuid : '';
  }, [selectedType, selectedUuid]);

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

  const handleOk = () => {
    onConfirm(selectedType, selectedUuid);
  };

  useEffect(() => {
    setFilteredExperiments(experimentsData);
    setFilteredTemplates(templatesData);
  }, [experimentsData, templatesData]);

  return (
    <Modal
      width={'70%'}
      onOk={handleOk}
      visible={visible}
      okText='Confirmar'
      onCancel={onCancel}
      cancelText='Cancelar'
      className='newDeploymentModal'
      title={<strong>Escolha um fluxo</strong>}
      okButtonProps={{ disabled: !selectedType }}
      confirmLoading={loading || experimentsLoading || templatesLoading}
    >
      <div>
        <Input
          suffix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
          placeholder='Pesquisar fluxo'
          onChange={handleSearch}
        />
      </div>

      <div className='section'>
        <ExperimentsTable
          loading={experimentsLoading}
          onSelect={handleExperimentSelect}
          experimentsData={filteredExperiments}
          selectedRowKey={experimentsSelectedRow}
        />
      </div>

      <div className='section'>
        <TemplatesTable
          loading={templatesLoading}
          onSelect={handleTemplateSelect}
          templatesData={filteredTemplates}
          selectedRowKey={templatesSelectedRow}
        />
      </div>
    </Modal>
  );
};

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
  experimentsLoading: PropTypes.bool.isRequired,
  templatesLoading: PropTypes.bool.isRequired,
};

export default NewDeploymentModal;
