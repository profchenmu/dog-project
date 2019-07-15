import * as React from 'react';
import './loading.less';
class Loading extends React.Component<any, any> {
  constructor(props:any) {
    super(props)
  }

  public render() {
    return (
      <div className="loading">
        <div className="loading-bar"/>
      </div>
    )
  }
}

export default Loading