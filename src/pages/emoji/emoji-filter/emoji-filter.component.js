import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './emoji-filter.module.scss';

export class EmojiFilter extends Component {
  render() {
    return (
      <div className={classes.options}>
        {this.props.options.map((option, index) => {
          return (
          <button
            className={`${classes.option} ${this.props.selectedOptions.has(option) ? classes.optionSelected : ''}`}
            key={index}
            onClick={() => this.props.onChange(option)}
          >
            #{option}
          </button>)
        })}
      </div>
    )
  }
}

EmojiFilter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOptions: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}