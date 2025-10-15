import React from 'react';


// Use this class to allow the user to enter a letter
// this class needs a function passed as a prop called onSearch to handle the user's request
class SingleLetterSearchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

    handleInputChange = (event) => {
        const value = event.target.value.charAt(0); // Get only the first character
        this.setState({
            inputValue: value}
        );
    };

    handleSearchClick = () => {
    if (this.state.inputValue.length === 1) {
      // Support both prop names: onGuess (used by HangmanGame) and onSearch (older name)
      const handler = this.props.onGuess || this.props.onSearch;
      if (typeof handler === 'function') {
        handler(this.state.inputValue);
      } else {
        // Gracefully handle missing handler to avoid TypeError
        console.warn('SingleLetterSearchbar: no handler provided via props.onGuess or props.onSearch');
      }
    } else {
      alert('Please enter a single letter.');
    }

    // Clear input after search
    this.setState({
      inputValue: ''
    });
    };

  render() {
    const { disabled } = this.props;
    return (
      <div>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          maxLength={1}
          disabled={disabled}
        />
        <button onClick={this.handleSearchClick} disabled={disabled}>Search</button>
      </div>
    );
  }
}

export default SingleLetterSearchbar;