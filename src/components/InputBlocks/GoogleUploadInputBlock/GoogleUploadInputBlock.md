**Default**

```js
<GoogleUploadInputBlock
  defaultFileList={[
    {
      uid: 'File Name',
      name: 'File Name',
      status: 'done',
      percent: '100%',
    },
  ]}
  handleCreateGoogleDataset={() => alert('Create Google Dataset')}
  handleUploadCancel={() => alert('Upload Canceled')}
  tip='The Tip'
  title='The Title'
/>
```

**Disabled**

```js
<GoogleUploadInputBlock
  defaultFileList={[
    {
      uid: 'File Name',
      name: 'File Name',
      status: 'done',
      percent: '100%',
    },
  ]}
  handleCreateGoogleDataset={() => alert('Create Google Dataset')}
  handleUploadCancel={() => alert('Upload Canceled')}
  tip='The Tip'
  title='The Title'
  isDisabled
/>
```

**Loading**

```js
<GoogleUploadInputBlock
  defaultFileList={[
    {
      uid: 'File Name',
      name: 'File Name',
      status: 'done',
      percent: '100%',
    },
  ]}
  handleCreateGoogleDataset={() => alert('Create Google Dataset')}
  handleUploadCancel={() => alert('Upload Canceled')}
  tip='The Tip'
  title='The Title'
  isLoading
/>
```
