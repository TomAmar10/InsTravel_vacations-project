import { SortOptions } from "../HeaderFilters";

interface Props {
  sortBy: string;
}

function SortItem(props: Props): JSX.Element {
  return (
    <option
      id={props.sortBy}
      defaultChecked={props.sortBy === SortOptions.start}
    >
      {props.sortBy}
    </option>
  );
}

export default SortItem;
