import React, { useMemo } from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import { BarChartOutlined } from '@ant-design/icons';

import { ImageLightbox, Placeholder } from 'components';

const MonitoringDrawerItemTabs = ({
  figures,
  handleSelectTab,
  selectedTabKey,
}) => {
  const defaultActiveKey = useMemo(() => {
    if (figures.length === 0) return;
    const [firstFigure] = figures;
    return firstFigure.uuid;
  }, [figures]);

  if (figures.length === 0) {
    return (
      <Placeholder
        iconComponent={<BarChartOutlined />}
        message='Não há dados de monitoramento para exibir'
      />
    );
  }

  return (
    <Tabs
      defaultActiveKey={defaultActiveKey}
      activeKey={selectedTabKey}
      onChange={handleSelectTab}
    >
      {figures.map((figure, index) => {
        const isHtmlFigure = figure.includes('text/html');

        return (
          <Tabs.TabPane key={`figure-${index}`} tab={`Gráfico ${index + 1}`}>
            {isHtmlFigure ? (
              <div className='monitoring-drawer-item-iframe-container'>
                <iframe
                  title={`Gráfico ${index + 1}`}
                  frameBorder='0'
                  scrolling='no'
                  height='100%'
                  width='100%'
                  src={figure}
                />
              </div>
            ) : (
              <ImageLightbox plotUrl={figure} />
            )}
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
};

MonitoringDrawerItemTabs.propTypes = {
  figures: PropTypes.array,
  handleSelectTab: PropTypes.func,
  selectedTabKey: PropTypes.string,
};

MonitoringDrawerItemTabs.defaultProps = {
  figures: [],
  handleSelectTab: undefined,
  selectedTabKey: undefined,
};

export default MonitoringDrawerItemTabs;
