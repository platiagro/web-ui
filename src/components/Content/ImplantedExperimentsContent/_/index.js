// CORE LIBS
import React from 'react';

// COMPONENTS
import ContentHeader from '../../ContentHeader/Container';
import ImplantedExperimentsTable from '../ImplantedExperimentsTable/_/Container';
import { Modal, Button } from 'antd';

const contetInfo = () => {
  const ndarray = `{"ndarray":[...]}`;
  const body = `{
    "names:" { ["SepalLengthCm", "SepalWidthCm", "PetalLengthCm", "PetalWidthCm"] }
    "data": { "ndarray": [ [5.1, 3.5, 1.4, 0.2], [6.3, 2.3, 4.4, 1.3] ] }
  }`;

  const restricoes = `
    curl -X POST \
       -H 'Content-Type: application/json' \
       -d '{"data": { "ndarray": [[5.1,3.5,1.4,0.2]], "names":["SepalLengthCm","SepalWidthCm","PetalLengthCm","PetalWidthCm"]}}' \
            http://localhost/seldon/deployments/ff885bf3-c587-4e2a-aad8-1ac394426796/api/v1.0/predictions
  `;

  const retorno = `
  {
    "meta": { "puid": "pqvaab0ej28n89sr4ffjni1ie7", 
    "tags": { },
      "routing": { },
      "requestPath": {
        "e6065e85-a056-40b7-9e4b-4db49ee3b915": "platiagro/platiagro-deployment-image:0.0.2"
      },
      "metrics": []
    },
    "data": {
      "names": ["Iris-setosa", "Iris-versicolor", "Iris-virginica"],
      "ndarray": [[0.8902377788100774, 0.10971507514730343, 4.714604261906825E-5]]
    }
  }
  `;

  return (
    <div>
      <p>
        As aplicações clientes devem enviar uma requisição HTTP (REST) para a
        seguinte API.
      </p>
      <pre>
        POST /seldon/deployments/id-do-experimento/api/v1.0/predictions
        <br />
        Headers: Content-Type: application/json
      </pre>

      <p>RequestBody:</p>

      <pre> {body} </pre>
      <p></p>
      <p>
        "names":[...] - nome das colunas do conjunto de dados, sem o nome da
        variável alvo. "data":{ndarray} - amostras para predição, sem a variável
        alvo.
      </p>

      <p>Por exemplo, a seguinte requisição poderia ser realizada:</p>

      <p>{restricoes}</p>

      <p>Essa requisição retorna uma resposta similar a seguinte:</p>
      <p>{retorno}</p>
    </div>
  );
};

function info() {
  Modal.info({
    width: 800,
    content: <div>{contetInfo()}</div>,
    onOk() {},
  });
}

/**
 * Implantend Experiments Content.
 * This component is responsible for displaying the implanted experiments content.
 */
const ImplantedExperimentsContent = () => (
  // fragment container
  <>
    {/* content header */}
    <ContentHeader title='Experimentos Implantados' editable={false} />
    {/* div content page container */}
    <div className='contentPage'>
      <Button
        onClick={info}
        icon='question-circle'
        className='ant-btn newProjectButton ant-btn-secondary'
      >
        Como usar um experimento implantado?
      </Button>

      <ImplantedExperimentsTable />
    </div>
  </>
);

// EXPORT
export default ImplantedExperimentsContent;
