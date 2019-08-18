import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './emoji-preview.module.scss';

export class EmojiPreview extends Component {
  render() {
    return (
      <div className={`${classes.emojiContainer} ${this.props.highlight ? classes.highlighter : ''}`}>
        <div className={classes.char}>{this.props.emoji.char}</div>
        <p className={classes.name}>{this.props.emoji.name}</p>
        <p className={classes.codes}>{this.props.emoji.codes}</p>
      </div>
    )
  }
}

EmojiPreview.defaultProps = {
  highlight: false,
}

EmojiPreview.propTypes = {
  emoji: PropTypes.shape({
    codes: PropTypes.string.isRequired,
    char: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  highlight: PropTypes.bool
};