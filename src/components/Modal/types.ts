export type ModalShowParams = {
  title: string;
  description?: string;
  withPrompt?: boolean;
  defaultValue?: string | null;
  onConfirm?: (value?: string) => void;
};

export type ModalRef = {
  show: (params: ModalShowParams) => void;
  hide: () => void;
};

export type ModalRefObj = {
  current: ModalRef | null;
};
