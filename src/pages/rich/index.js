import React, { Component } from 'react';
import Editor from 'for-editor';
import { Card, message } from 'antd';

export class Rich extends Component {
  constructor() {
    super();

    this.state = {
      text: `
![alt](https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png)

> \`for-editor\` is a markdown editor

# for-editor

this is a markdown editor

## for-editor

this is a markdown editor

### for-editor

\`\`\`js
const editor = 'for-editor'
\`\`\`

- item1
  - subitem1
  - subitem2
  - subitem3
- item2
- item3

---

1. item1
2. item2
3. item3

### table

| title      | description     |
| ---------- | --------------- |
| for-editor | markdown editor |

`
    };
  }

  handleChange = (text) => {
    if (text === this.state.text) return;
    this.setState({
      text
    })
  }

  handleSave = ((text) => {
    let time = null;
    return () => {
      if (time) return;
      message.success("保存成功");
      time = setTimeout(() => {
        time = null;
      }, 800);
    };
  })();


  render() {
    const { text } = this.state;
    return (
      <div>
        <Card>
          <Editor
            value={text}
            subfield
            preview
            onChange={(text) => this.handleChange(text)}
            onSave={text => this.handleSave(text)}
          />
        </Card>
      </div>
    );
  }
}

export default Rich;
