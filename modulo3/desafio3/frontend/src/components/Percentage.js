import React from "react";
import CountUp from "react-countup";

export default function Percentage({ value, previousPercentage }) {
  return (
    <div>
      <CountUp
        start={previousPercentage}
        end={value}
        duration={0.6}
        decimals={2}
        decimal=","
        suffix=" %"
      >
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
    </div>
  );
}
