**Default**
```js
import { useState } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';

const [selected, setSelected] = useState(false);

const title = 'Teste';
const icon = <DatabaseOutlined />;

const operator = {
  uuid: 'operator0001',
};

const onSelect = (operator) => {
  setSelected(true);
  alert(`Selected: ${operator.uuid}`);
};

const onDeselect = (operator) => {
  setSelected(false);
  alert(`Deselected: ${operator.uuid}`);
};

const onRemove = (operator) => {
  alert(`Removed: ${operator.uuid}`);
};

const onEdit = (operator) => {
  alert(`Edited: ${operator.uuid}`);
};

<DeploymentFlowBox 
  selected={selected}
  onSelect={onSelect}
  onDeselect={onDeselect}
  onEdit={onEdit}
  onRemove={onRemove}
  operator={operator}
  title={title}
  icon={icon}
/>
```


**Setted Up**
```js
import { useState } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';

const [selected, setSelected] = useState(false);

const title = 'Teste';
const icon = <DatabaseOutlined />;
const settedUp = true;

const operator = {
  uuid: 'operator0001',
};

const onSelect = (operator) => {
  setSelected(true);
  alert(`Selected: ${operator.uuid}`);
};

const onDeselect = (operator) => {
  setSelected(false);
  alert(`Deselected: ${operator.uuid}`);
};

const onRemove = (operator) => {
  alert(`Removed: ${operator.uuid}`);
};

const onEdit = (operator) => {
  alert(`Edited: ${operator.uuid}`);
};

<DeploymentFlowBox 
  settedUp={settedUp}
  title={title}
  icon={icon}
  selected={selected}
  onSelect={onSelect}
  onDeselect={onDeselect}
  onEdit={onEdit}
  onRemove={onRemove}
  operator={operator}
/>
```


**Interrupted**
```js
import { useState } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';

const [selected, setSelected] = useState(false);

const title = 'Teste';
const icon = <DatabaseOutlined />;
const settedUp = true;
const status = 'Interrupted';

const operator = {
  uuid: 'operator0001',
};

const onSelect = (operator) => {
  setSelected(true);
  alert(`Selected: ${operator.uuid}`);
};

const onDeselect = (operator) => {
  setSelected(false);
  alert(`Deselected: ${operator.uuid}`);
};

const onRemove = (operator) => {
  alert(`Removed: ${operator.uuid}`);
};

const onEdit = (operator) => {
  alert(`Edited: ${operator.uuid}`);
};

<DeploymentFlowBox
  settedUp={settedUp} 
  title={title} 
  icon={icon}
  selected={selected}
  onSelect={onSelect}
  onDeselect={onDeselect}
  onEdit={onEdit}
  onRemove={onRemove}
  operator={operator}
  status={status}
/>
```


**Running**
```js
import { useState } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';

const [selected, setSelected] = useState(false);

const title = 'Teste';
const icon = <DatabaseOutlined />;
const settedUp = true;
const status = 'Running';

const operator = {
  uuid: 'operator0001',
};

const onSelect = (operator) => {
  setSelected(true);
  alert(`Selected: ${operator.uuid}`);
};

const onDeselect = (operator) => {
  setSelected(false);
  alert(`Deselected: ${operator.uuid}`);
};

const onRemove = (operator) => {
  alert(`Removed: ${operator.uuid}`);
};

const onEdit = (operator) => {
  alert(`Edited: ${operator.uuid}`);
};

<DeploymentFlowBox 
  status={status} 
  settedUp={settedUp} 
  title={title} 
  icon={icon}
  selected={selected}
  onSelect={onSelect}
  onDeselect={onDeselect}
  onEdit={onEdit}
  onRemove={onRemove}
  operator={operator}
/>
```


**Pending**
```js
import { useState } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';

const [selected, setSelected] = useState(false);

const title = 'Teste';
const icon = <DatabaseOutlined />;
const settedUp = true;
const status = 'Pending';

const operator = {
  uuid: 'operator0001',
};

const onSelect = (operator) => {
  setSelected(true);
  alert(`Selected: ${operator.uuid}`);
};

const onDeselect = (operator) => {
  setSelected(false);
  alert(`Deselected: ${operator.uuid}`);
};

const onRemove = (operator) => {
  alert(`Removed: ${operator.uuid}`);
};

const onEdit = (operator) => {
  alert(`Edited: ${operator.uuid}`);
};

<DeploymentFlowBox 
  status={status} 
  settedUp={settedUp} 
  title={title} 
  icon={icon}
  selected={selected}
  onSelect={onSelect}
  onDeselect={onDeselect}
  onEdit={onEdit}
  onRemove={onRemove}
  operator={operator}
/>
```


**Succeeded**
```js
import { useState } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';

const [selected, setSelected] = useState(false);

const title = 'Teste';
const icon = <DatabaseOutlined />;
const settedUp = true;
const status = 'Succeeded';

const operator = {
  uuid: 'operator0001',
};

const onSelect = (operator) => {
  setSelected(true);
  alert(`Selected: ${operator.uuid}`);
};

const onDeselect = (operator) => {
  setSelected(false);
  alert(`Deselected: ${operator.uuid}`);
};

const onRemove = (operator) => {
  alert(`Removed: ${operator.uuid}`);
};

const onEdit = (operator) => {
  alert(`Edited: ${operator.uuid}`);
};

<DeploymentFlowBox 
  status={status} 
  settedUp={settedUp} 
  title={title} 
  icon={icon}
  selected={selected}
  onSelect={onSelect}
  onDeselect={onDeselect}
  onEdit={onEdit}
  onRemove={onRemove}
  operator={operator}
/>
```


**Failed**
```js
import { useState } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';

const [selected, setSelected] = useState(false);

const title = 'Teste';
const icon = <DatabaseOutlined />;
const settedUp = true;
const status = 'Failed';

const operator = {
  uuid: 'operator0001',
};

const onSelect = (operator) => {
  setSelected(true);
  alert(`Selected: ${operator.uuid}`);
};

const onDeselect = (operator) => {
  setSelected(false);
  alert(`Deselected: ${operator.uuid}`);
};

const onRemove = (operator) => {
  alert(`Removed: ${operator.uuid}`);
};

const onEdit = (operator) => {
  alert(`Edited: ${operator.uuid}`);
};

<DeploymentFlowBox 
  status={status} 
  settedUp={settedUp} 
  title={title} 
  icon={icon}
  selected={selected}
  onSelect={onSelect}
  onDeselect={onDeselect}
  onEdit={onEdit}
  onRemove={onRemove}
  operator={operator}
/>
```


**Ready**
```js
import { useState } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';

const [selected, setSelected] = useState(false);

const title = 'Teste';
const icon = <DatabaseOutlined />;
const settedUp = true;
const status = 'Ready';

const operator = {
  uuid: 'operator0001',
};

const onSelect = (operator) => {
  setSelected(true);
  alert(`Selected: ${operator.uuid}`);
};

const onDeselect = (operator) => {
  setSelected(false);
  alert(`Deselected: ${operator.uuid}`);
};

const onRemove = (operator) => {
  alert(`Removed: ${operator.uuid}`);
};

const onEdit = (operator) => {
  alert(`Edited: ${operator.uuid}`);
};

<DeploymentFlowBox 
  status={status} 
  settedUp={settedUp} 
  title={title} 
  icon={icon}
  selected={selected}
  onSelect={onSelect}
  onDeselect={onDeselect}
  onEdit={onEdit}
  onRemove={onRemove}
  operator={operator}
/>
```


**Waiting**
```js
import { useState } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';

const [selected, setSelected] = useState(false);

const title = 'Teste';
const icon = <DatabaseOutlined />;
const settedUp = true;
const status = 'Waiting';

const operator = {
  uuid: 'operator0001',
};

const onSelect = (operator) => {
  setSelected(true);
  alert(`Selected: ${operator.uuid}`);
};

const onDeselect = (operator) => {
  setSelected(false);
  alert(`Deselected: ${operator.uuid}`);
};

const onRemove = (operator) => {
  alert(`Removed: ${operator.uuid}`);
};

const onEdit = (operator) => {
  alert(`Edited: ${operator.uuid}`);
};

<DeploymentFlowBox 
  status={status} 
  settedUp={settedUp} 
  title={title} 
  icon={icon}
  selected={selected}
  onSelect={onSelect}
  onDeselect={onDeselect}
  onEdit={onEdit}
  onRemove={onRemove}
  operator={operator}
/>
```


**Selected**
```js
import { useState } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';

const [selected, setSelected] = useState(true);

const title = 'Teste';
const icon = <DatabaseOutlined />;

const operator = {
  uuid: 'operator0001',
};

const onSelect = (operator) => {
  setSelected(true);
  alert(`Selected: ${operator.uuid}`);
};

const onDeselect = (operator) => {
  setSelected(false);
  alert(`Deselected: ${operator.uuid}`);
};

const onRemove = (operator) => {
  alert(`Removed: ${operator.uuid}`);
};

const onEdit = (operator) => {
  alert(`Edited: ${operator.uuid}`);
};

<DeploymentFlowBox 
  selected={selected} 
  title={title} 
  icon={icon}
  onSelect={onSelect}
  onDeselect={onDeselect}
  onEdit={onEdit}
  onRemove={onRemove}
  operator={operator}
/>
```