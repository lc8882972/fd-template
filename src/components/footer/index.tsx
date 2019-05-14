import * as React from 'react';
import './index.scss';

class Footer extends React.Component {
  public render() {
    return (<div className="footer" id="footer">
      <div className="footer-inner">
        <p> Powered By <a target="_blank" rel="noopener noreferrer" href="/">Fusion.Design</a></p>
      </div>
    </div>);
  }
}

export default Footer;
