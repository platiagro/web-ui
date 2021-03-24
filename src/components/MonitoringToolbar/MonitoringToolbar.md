**Padrão**

Toolbar de monitoramento com botão de adicionar monitoramento

```js
<MonitoringToolbar handleAddMonitoring={() => alert('Add A New Monitoring')} />
```

**Com Botão de Ver Monitoramento**

Mostrando botão de ver monitoramento

```js
<MonitoringToolbar
  handleSeeMonitoring={() => alert('See the Monitoring')}
  showSeeButton
/>
```

**Com Botão de Excluir Monitoramento**

Mostrando botão de excluir monitoramento

```js
<MonitoringToolbar
  handleDeleteMonitoring={() => alert('Delete Monitoring')}
  showDeleteButton
/>
```
