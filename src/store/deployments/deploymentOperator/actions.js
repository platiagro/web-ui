// ACTION TYPES
import actionTypes from './actionTypes';

import deploymentsOperatorsApi from 'services/DeploymentsOperatorsApi';

// UI LIB
import { message } from 'antd';

// UTILS
import utils from 'utils';

export const setOperatorParametersRequest =
  (projectId, deploymentId, operator, parameterName, parameterValue) =>
  (dispatch) => {
    dispatch({
      type: actionTypes.SET_DEPLOYMENT_OPERATOR_PARAMETERS_REQUEST,
    });
    //TODO:
    // dispatch(operatorParameterLoadingData());

    // formating parameter value
    const formatedValue = Array.isArray(parameterValue)
      ? parameterValue.join(',')
      : parameterValue;

    // filtering parameters with value
    const parametersWithValue = operator.parameters.filter((parameter) => {
      if (parameter.name === parameterName) {
        return true;
      } else if (parameter.value !== undefined) {
        return true;
      } else {
        return false;
      }
    });

    // creating parameter object to update
    const parameters = {};
    parametersWithValue.forEach(({ name, value }) => {
      parameters[name] =
        name === parameterName
          ? formatedValue !== null
            ? formatedValue
            : undefined
          : Array.isArray(value)
          ? value.join(',')
          : value;
    });

    // creating operator object
    const operatorWithParameters = { parameters };

    // update operator
    deploymentsOperatorsApi
      .updateOperator(
        projectId,
        deploymentId,
        operator.uuid,
        operatorWithParameters
      )
      .then((response) => {
        const successOperator = { ...operator };

        // changing param value
        successOperator.parameters = successOperator.parameters.map(
          (parameter) => ({
            ...parameter,
            value:
              parameter.name === parameterName
                ? parameterValue !== null
                  ? parameterValue
                  : undefined
                : parameter.value,
          })
        );

        // checking if operator is setted up
        successOperator.settedUp = utils.checkOperatorSettedUp(response.data);
        //TODO:
        // dispatch(operatorParameterDataLoaded());
        dispatch({
          type: actionTypes.SET_DEPLOYMENT_OPERATOR_PARAMETERS_SUCCESS,
          successOperator,
        });
      })
      .catch((error) => {
        //TODO:
        // dispatch(operatorParameterDataLoaded());
        const errorMessage = error.message;
        dispatch({
          type: actionTypes.SET_DEPLOYMENT_OPERATOR_PARAMETERS_FAIL,
          errorMessage,
        });
        message.error(errorMessage);
      });
  };
