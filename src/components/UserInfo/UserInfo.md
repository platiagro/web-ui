**Default**

```js
<UserInfo name='Usuário Anônimo' />
```

**With Two Initials**

```js
<UserInfo name='Usuário Anônimo' initialsCount={2} />
```

**With Custom Avatar Background and Text Colors**

```js
<UserInfo
  name='Usuário Anônimo'
  avatarBackground='yellow'
  avatarColor='black'
/>
```

**With Custom Avatar**

```js
import { Avatar } from 'antd';

<UserInfo
  name='Usuário Anônimo'
  renderAvatar={(initials) => {
    return (
      <Avatar style={{ background: 'blue', marginRight: '16px' }}>
        {initials}
      </Avatar>
    );
  }}
/>;
```
