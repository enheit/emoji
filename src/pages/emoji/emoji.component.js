import React, { Component } from 'react';

import { EmojiPreview } from './emoji-preview';
import { fetchEmoji } from './emoji.api';
import classes from './emoji.module.scss';
import { EmojiFilter } from './emoji-filter';

export class Emoji extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      emoji: [],
      foundEmoji: 0,
      filteredEmoji: [],
      selectedCategories: new Set(),
      categories: []
    }

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    fetchEmoji()
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          emoji: data.emoji,
          filteredEmoji: data.emoji,
          categories: this.getCategories(data.emoji)
        })
      });
  }

  getCategories(emoji) {
    const options = new Set();

    emoji.forEach(item => {
      options.add(item.category);
    })

    return Array.from(options);
  }

  handleCategoryChange(category) {
    if (!this.state.selectedCategories.has(category)) {
      this.setState(prevState => { 
        const selectedCategories =  new Set(prevState.selectedCategories).add(category);
        const filteredEmoji = prevState.emoji.filter(e => selectedCategories.has(e.category));
        const foundEmoji = prevState.search ? filteredEmoji.filter(fe => fe.name.toLowerCase().search(prevState.search.toLowerCase()) !== -1).length : 0;

        return {
          selectedCategories,
          filteredEmoji,
          foundEmoji
        }
      });
    } else {
      this.setState(prevState => {
        const selectedCategories = new Set(prevState.selectedCategories);
        selectedCategories.delete(category);

        const filteredEmoji = selectedCategories.size ? prevState.emoji.filter(e => selectedCategories.has(e.category)) : [...prevState.emoji];
        const foundEmoji = prevState.search ? filteredEmoji.filter(fe => fe.name.toLowerCase().search(prevState.search.toLowerCase()) !== -1).length : 0;

          return {
            selectedCategories,
            filteredEmoji,
            foundEmoji
          }
        }
      );
    }
  }

  handleSearchChange(event) {
    const pattern = event.target.value;

    this.setState(prevState => ({
      search: pattern,
      foundEmoji: pattern ? prevState.filteredEmoji.filter(fe => fe.name.toLowerCase().search(pattern.toLowerCase()) !== -1).length : 0,
    }));
  }

  render() {
    
    return (
      <div className={classes.emojiContainer}>
        <div className={classes.searchContainer}>
          <input className={classes.searchInput} placeholder="Search..." type="text" onChange={this.handleSearchChange} value={this.state.search} />
          {!!this.state.search && <p className={classes.searchResults}>Found: {this.state.foundEmoji}/{this.state.filteredEmoji.length}</p>}
        </div>
        <div className={classes.filterContainer}>
        <h2 className={classes.headline}>Categories</h2>
          <EmojiFilter
            options={this.state.categories}
            selectedOptions={this.state.selectedCategories}
            onChange={this.handleCategoryChange}
          />
        </div>
        <div className={classes.emojiListContainer}>
          <h2 className={classes.headline}>Emoji {this.state.filteredEmoji.length && `(${this.state.filteredEmoji.length})`}</h2>
          <div className={classes.emojiList}>
            {this.state.emoji && this.state.filteredEmoji.map(emoji => <EmojiPreview key={emoji.codes} emoji={emoji} highlight={!!this.state.search && (emoji.name.toLowerCase().search(this.state.search.toLowerCase()) !== -1)} />)}
          </div>
        </div>
      </div>
    )
  }
}