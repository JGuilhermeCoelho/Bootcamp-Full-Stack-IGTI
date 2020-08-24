import React from "react";
import Position from "./Position";
import Picture from "./Picture";
import Info from "./Info";
import Name from "./Name";
import Votes from "./Votes";
import Percentage from "./Percentage";
import Popularity from "./Popularity";
import css from "./candidate.module.css";
import { formatPercentage } from "../helpers/formatHelpers";

export default function Candidate({
  previousVote,
  candidate,
  position,
  previousPercentage,
}) {
  const { id, name, votes, percentage, popularity } = candidate;
  const imageSource = `${id}.jpg`;

  return (
    <div className={css.flexRow}>
      <Position> {position} </Position>
      <Picture imageSource={imageSource} description={name} title={name} />
      <Info>
        <Name>{name}</Name>
        <Votes
          value={votes}
          previousVotes={previousVote}
          previousPercentage={previousPercentage}
        />
        <Percentage>{formatPercentage(percentage)}</Percentage>
        <Popularity value={popularity} />
      </Info>
    </div>
  );
}
