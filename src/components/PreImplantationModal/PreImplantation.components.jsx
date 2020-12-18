// CORE LIBS
import PropTypes from 'prop-types';
import React from 'react';

// UI LIBS
import {Modal, Checkbox} from 'antd';
import './style.less';


const PreImplantationModal = (props) =>{
    const {handleCloseModal, modalVisible} = props
    return(
    <Modal title="Preparar para a implantação" visible={modalVisible} onOk={()=>{}} onCancel={handleCloseModal}>
        <p>Selecione os fluxos:</p>
        <Checkbox className='ant-checkbox-group-item'>
            Experimento 1
        </Checkbox>
    </Modal>
    )
    }

export default PreImplantationModal;