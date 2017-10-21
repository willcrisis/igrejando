import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './Icon.scss';

export default class Icon extends PureComponent {
  constructor(props) {
    super(props);
    this.size = {};
    if (this.props.faSize) {
      this.size[`fa-${this.props.faSize}`] = true;
    }
  }

  render() {
    return (
      <i className={cx('ig-icon', 'fa', 'fa-fw', `fa-${this.props.name}`, {'has-click': this.props.onClick}, this.size)} onClick={this.props.onClick} style={this.styles}/>
    );
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  faSize: PropTypes.string,
  onClick: PropTypes.func
};
