import React, { Component } from "react";
import { formatNumber } from "../helpers/FormatHelpers";
import css from "./header.module.css";

export default class Header extends Component {
  handleInputChange = (event) => {
    const newText = event.target.value;

    this.props.onChangeFilter(newText);
  };

  render() {
    const { filter, countryCount, totalPopulation } = this.props;
    return (
      <div className={css.flexRow}>
        <input
          type="text"
          placeholder="Filtro"
          value={filter}
          onChange={this.handleInputChange}
        />{" "}
        |
        <span className={css.infoCountries}>
          Países: <b>{countryCount}</b>
        </span>{" "}
        |
        <span className={css.infoPopulation}>
          População: <b>{formatNumber(totalPopulation)}</b>
        </span>
      </div>
    );
  }
}
