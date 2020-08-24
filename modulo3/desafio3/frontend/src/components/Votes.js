import React from "react";
import CountUp from "react-countup";

export default function Votes({ value, previousVotes }) {
  return (
    <div>
      <CountUp start={previousVotes} end={value} duration={0.6} separator=".">
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
    </div>
  );
}
