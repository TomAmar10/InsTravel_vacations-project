import "./Button.css";

function Button(props: any): JSX.Element {
  return (
    <button className="Button flow" onClick={props.onClick} style={props.style}>
      {props.value}
    </button>
  );
}

export default Button;
