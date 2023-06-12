import Toast from "react-bootstrap/Toast";

function SuccessNotification(props: {
  show: boolean;
  parentShowHandler: (obj: boolean) => void;
}) {
  const parentShowHandler = props.parentShowHandler;
  return (
    <Toast
      onClose={() => {
        parentShowHandler(false);
      }}
      show={props.show}
      delay={3000}
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Bootstrap!</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
    </Toast>
  );
}

export default SuccessNotification;
