import React, { Component } from "react";
import rates from "./rates.json";
import "./App.css";

// formule
// const value = (toRate / fromRate) * amount;

class App extends Component {
  state = {
    leftValue: "",
    rightValue: "",
    leftCurrency: "EUR",
    rightCurrency: "USD"
  };

  renderCurrenciesOptions = () => {
    // https://zellwk.com/blog/looping-through-js-objects/
    const options = [];

    const keys = Object.keys(rates);
    for (let i = 0; i < keys.length; i++) {
      options.push(<option value={keys[i]}>{keys[i]}</option>);
    }

    return options;
  };

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const obj = {};
    obj[name] = value;

    // Modification du montant de gauche
    if (name === "leftValue") {
      obj.rightValue =
        (rates[this.state.rightCurrency] / rates[this.state.leftCurrency]) *
        value;
      obj.rightValue = obj.rightValue.toFixed(2);
    }

    // Modification du montant de droite
    if (name === "rightValue") {
      obj.leftValue =
        (rates[this.state.leftCurrency] / rates[this.state.rightCurrency]) *
        value;
      obj.leftValue = obj.leftValue.toFixed(2);
    }

    // Modification de la devise de gauche
    if (name === "leftCurrency") {
      // const value = (toRate / fromRate) * amount;
      obj.rightValue =
        (rates[this.state.rightCurrency] / rates[value]) * this.state.leftValue;
      obj.rightValue = obj.rightValue.toFixed(2);
    }

    // Modification de la devise de droite
    if (name === "rightCurrency") {
      obj.rightValue =
        (rates[value] / rates[this.state.leftCurrency]) * this.state.leftValue;
      obj.rightValue = obj.rightValue.toFixed(2);
    }

    this.setState(obj);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          name="leftValue"
          value={this.state.leftValue}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="rightValue"
          value={this.state.rightValue}
          onChange={this.handleChange}
        />
        <select
          name="leftCurrency"
          value={this.state.leftCurrency}
          onChange={this.handleChange}
        >
          {this.renderCurrenciesOptions()}
        </select>

        <select
          name="rightCurrency"
          value={this.state.rightCurrency}
          onChange={this.handleChange}
        >
          {this.renderCurrenciesOptions()}
        </select>
      </div>
    );
  }
}

export default App;
