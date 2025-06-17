// UfcButton.jsx
import './ufcbutton.css';

export default function UfcButton({children, click, id}) {
  return (
    <button className="ufc-button" id = {id} onClick={click}>
      {children}
    </button>
  );
}
