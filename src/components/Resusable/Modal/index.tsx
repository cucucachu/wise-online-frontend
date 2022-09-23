import * as React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import "./Modal.css";

const ModalTitle: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div className={classnames("wise-modal__title", className)}>{children}</div>
  );
};

const ModalContent: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div className="wise-modal__content">{children}</div>;
};

type ModalProps = React.PropsWithChildren<{
  open: boolean;
}>;

type IModal = React.FC<ModalProps> & {
  Content: typeof ModalContent;
  Title: typeof ModalTitle;
};

export const Modal: IModal = ({ children, open }) => {
  const elRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    elRef.current = document.createElement("div");

    modalRoot?.appendChild(elRef.current);

    return () => {
      if (elRef.current) {
        modalRoot?.removeChild(elRef.current);
      }
    };
  }, []);

  if (!elRef.current || !open) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="wise-modal-backdrop">
      <div className="wise-modal">{children}</div>
    </div>,
    elRef.current
  );
};

Modal.Content = ModalContent;
Modal.Title = ModalTitle;
