import { SortOptions } from "../SortMenu";
import "./SortItem.css";

interface Props {
  sortBy: string;
  onSort: Function;
}

function SortItem(props: Props): JSX.Element {
  return (
    <div className="SortItem">
      <input
        type="radio"
        name="sort-radio-btn"
        id={props.sortBy}
        defaultChecked={props.sortBy === SortOptions.start}
        onClick={() => props.onSort(props.sortBy)}
      />
      <label htmlFor={props.sortBy}>{`${props.sortBy}`}</label>
    </div>
  );
}

export default SortItem;
