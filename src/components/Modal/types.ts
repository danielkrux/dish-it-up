export type ModalShowParams = {
  title: string;
  children?: React.ReactNode;
};

export type ModalRef = {
  show: (params: ModalShowParams) => void;
  hide: () => void;
};

export type ModalRefObj = {
  current: ModalRef | null;
};
