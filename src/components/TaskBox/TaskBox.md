**Pending**

```js
import { ReactFlowProvider } from 'react-flow-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from 'store';

const [statusIndex, setStatusIndex] = React.useState(0);
const [isSelected, setIsSelected] = React.useState(false);

const statusList = ['Running', 'Pending', 'Succeeded', 'Failed', 'Terminated'];

const handleChangeStatusIndex = () => {
  setStatusIndex((currentIndex) => {
    const isLastIndex = currentIndex === statusList.length - 1;
    return isLastIndex ? 0 : currentIndex + 1;
  });
};

const handleToggleSelection = () => {
  setIsSelected((isCurrentSelected) => !isCurrentSelected);
};

<Provider store={Store}>
  <MemoryRouter>
    <ReactFlowProvider>
      <button
        type='button'
        style={{ marginBottom: '16px' }}
        onClick={handleChangeStatusIndex}
      >
        Change Status
      </button>

      <div style={{ marginBottom: '16px' }}>
        Status: {statusList[statusIndex]}
      </div>

      <TaskBox
        name='TaskBox Name'
        icon={<i>I</i>}
        status={statusList[statusIndex]}
        onConnectingClass='Connecting Class'
        settedUp={true}
        handleClick={handleToggleSelection}
        handleRemoveOperator={() => alert('Operator Removed')}
        operator={null}
        dependenciesGraph={{}}
        selected={isSelected}
        experimentIsRunning={false}
        interruptIsRunning={false}
      />
    </ReactFlowProvider>
  </MemoryRouter>
</Provider>;
```
