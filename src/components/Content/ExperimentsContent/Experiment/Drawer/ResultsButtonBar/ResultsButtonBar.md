**Default**

```js
const [loading, setLoading] = React.useState(false);

const onClick = () => {
  console.log("clicked");
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 2500);
};

<ResultsButtonBar
  disabled={false}
  loading={loading}
  showingResults={false}
  handleEditClick={onClick}
  handleResultsClick={onClick}
/>;
```
