**Default**

```js
<UploadInputBlock
  actionUrl='https://www.google.com'
  buttonText='Button Text'
  tip='The Tip'
  title='THe Title'
  handleUploadCancel={() => alert('Upload Canceled')}
  handleSelectDataset={() => alert('Dataset Selected')}
  datasets={[
    { name: 'Dataset 1' },
    { name: 'Dataset 2' },
    { name: 'Dataset 3' },
  ]}
/>
```

**Empty Datasets**

```js
<UploadInputBlock
  actionUrl='https://www.google.com'
  buttonText='Button Text'
  tip='The Tip'
  title='THe Title'
  handleUploadCancel={() => alert('Upload Canceled')}
  handleSelectDataset={() => alert('Dataset Selected')}
  datasets={[]}
  isDisabled
/>
```

**Loading Datasets**

```js
<UploadInputBlock
  actionUrl='https://www.google.com'
  buttonText='Button Text'
  tip='The Tip'
  title='THe Title'
  handleUploadCancel={() => alert('Upload Canceled')}
  handleSelectDataset={() => alert('Dataset Selected')}
  datasets={[]}
  datasetsLoading
  isDisabled
/>
```

**Disabled**

```js
<UploadInputBlock
  actionUrl='https://www.google.com'
  buttonText='Button Text'
  tip='The Tip'
  title='THe Title'
  handleUploadCancel={() => alert('Upload Canceled')}
  handleSelectDataset={() => alert('Dataset Selected')}
  datasets={[]}
  isDisabled
/>
```
