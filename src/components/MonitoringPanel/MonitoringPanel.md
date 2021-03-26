**Padrão**

Painel de monitoramento.

```js
const handleSelectMonitoring = (monitoring) => {
  alert(`${monitoring.title} Monitoring Clicked`);
};

<MonitoringPanel
  monitorings={[
    { uuid: '1', title: 'First' },
    { uuid: '2', title: 'Second' },
    { uuid: '3', title: 'Third' },
  ]}
  handleSelectMonitoring={handleSelectMonitoring}
/>;
```

**Loading Monitorings**

Carregando os monitoramentos (mostrando skeleton)

```js
<MonitoringPanel isLoading />
```

**Deleting a Monitoring**

Excluindo o monitoramento selecionado

```js
<MonitoringPanel
  monitorings={[
    { uuid: '1', title: 'First' },
    { uuid: '2', title: 'Second' },
    { uuid: '3', title: 'Third' },
  ]}
  selectedMonitoring={{ uuid: '2', title: 'Second' }}
  isDeleting
/>
```
