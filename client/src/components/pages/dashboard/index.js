import React, { PureComponent } from 'react';
import { Translate } from 'react-redux-i18n';

export default class Dashboard extends PureComponent {
  render() {
    return (
      <div>
        <Translate value="dashboard"/>
      </div>
    );
  }
}
