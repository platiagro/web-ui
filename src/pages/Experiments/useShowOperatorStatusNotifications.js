import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { notification } from 'antd';

const operatorsSelector = ({ operatorsReducer }) => {
  return operatorsReducer || [];
};

export default () => {
  const { experimentId } = useParams();
  const operators = useSelector(operatorsSelector);

  const showedNotifications = useRef({});

  // Shows a notification if you have not shown it before
  // The operator uuid and message are used as the notification key
  useEffect(() => {
    if (!operators || operators.length === 0) return;

    operators.forEach((operator) => {
      if (operator.statusMessage) {
        const key = `${operator.uuid}-${operator.statusMessage}`;

        const previousNotification = showedNotifications.current[key];
        if (previousNotification) return;

        showedNotifications.current = {
          ...showedNotifications.current,
          [key]: true,
        };

        notification.open({
          key,
          duration: 0,
          message: operator.task?.name,
          description: operator.statusMessage,
        });
      }
    });
  }, [operators]);

  // Clear the showed notifications when change the experiment
  useEffect(() => {
    showedNotifications.current = {};
  }, [experimentId]);
};
