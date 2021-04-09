**Default**

```js
<UploadButton
  actionUrl='https://123.456.789/url/example'
  parameterName='featuretypes'
  method='PATCH'
  buttonText='Importar arquivo'
  handleUploadFail={() => alert('Fail')}
  handleUploadSuccess={() => alert('Succeed')}
  handleUploadStart={() => alert('Start Upload')}
/>
```

**Disabled**

```js
<UploadButton
  actionUrl='https://123.456.789/url/example'
  parameterName='featuretypes'
  method='PATCH'
  buttonText='Importar arquivo'
  handleUploadFail={() => alert('Fail')}
  handleUploadSuccess={() => alert('Succeed')}
  handleUploadStart={() => alert('Start Upload')}
  isDisabled
/>
```

**Loading**

```js
<UploadButton
  actionUrl='https://123.456.789/url/example'
  parameterName='featuretypes'
  method='PATCH'
  buttonText='Importar arquivo'
  handleUploadFail={() => alert('Fail')}
  handleUploadSuccess={() => alert('Succeed')}
  handleUploadStart={() => alert('Start Upload')}
  isLoading
/>
```
