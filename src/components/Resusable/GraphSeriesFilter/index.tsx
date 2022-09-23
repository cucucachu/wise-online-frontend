import * as React from "react";
import "./GraphSeriesFilter.css";

type GraphSeriesFilterProps = {
  color: string;
  label: string;
  onToggle(value: boolean): void;
  selected: boolean;
};

export const GraphSeriesFilter: React.FC<GraphSeriesFilterProps> = (props) => {
  const { color, label, onToggle, selected } = props;
  const onClick = React.useCallback(() => {
    onToggle(!selected);
  }, [selected, onToggle]);

  const className = ["graph-series-filter"];
  if (!selected) {
    className.push("graph-series-filter--unselected");
  }

  return (
    <div onClick={onClick} className={className.join(" ")}>
      <div
        style={selected ? { background: color } : undefined}
        className="graph-series-filter-circle"
      />
      {label}
    </div>
  );
};
