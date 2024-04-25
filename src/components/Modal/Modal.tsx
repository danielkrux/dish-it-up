import {
  forwardRef,
  useState,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { ModalProps } from "react-native";
import ModalUI from "./ModalUI";
import { ModalRef, ModalRefObj, ModalShowParams } from "./types";

let refs: ModalRefObj[] = [];

const ModalRoot = forwardRef(function ModalRoot(_, ref) {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<ModalProps>();

  const show = useCallback((params: ModalShowParams) => {
    setData(params);
    setIsVisible(true);
  }, []);
  const hide = useCallback(() => setIsVisible(false), []);

  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        show,
        hide,
      }),
      [hide, show]
    )
  );

  return <ModalUI {...data} isVisble={isVisible} hide={hide} />;
});

export function Modal() {
  const modalRef = useRef<ModalRef | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const setRef = useCallback((ref: ModalRef | null) => {
    if (ref) {
      modalRef.current = ref;
      refs.push({
        current: ref,
      });
    } else {
      refs = refs.filter((r) => r.current !== modalRef.current);
    }
  }, []);

  return <ModalRoot ref={setRef} />;
}

function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find((ref) => ref?.current !== null);
  if (!activeRef) {
    return null;
  }
  return activeRef.current;
}

Modal.show = (params: ModalShowParams) => {
  getRef()?.show(params);
};

Modal.hide = () => {
  getRef()?.hide();
};
