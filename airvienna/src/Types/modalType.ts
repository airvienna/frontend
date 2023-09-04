export interface LoginModalProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  openEmail: () => void;
  setVerifiedEmail: (value: boolean) => void;
}

export interface LoginModalWrapperProps {
  $isEmail: boolean;
}

export interface InputWrapperProps {
  $error?: boolean;
}

export interface EmailSignUpModalProps {
  onClose: () => void;
}

export interface ActionDataType {
  verified: boolean;
  response: any;
}

export interface AddProfileModalProps {
  onClose: (value: boolean) => void;
}

export interface ModalHeaderProps {
  onClick: () => void;
}

export interface userModalProps {
  onClose: () => void;
  setIsOpen: (value: boolean) => void;
}
