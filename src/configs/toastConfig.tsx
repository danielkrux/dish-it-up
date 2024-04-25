import { ToastConfig } from "react-native-toast-message";
import Icon from "~/components/Icon";
import Toast from "~/components/Toast";

const toastConfig: ToastConfig = {
  success: (props) => (
    <Toast
      renderLeadingIcon={() => (
        <Icon name="Check" className="text-acapulco-400" size={20} />
      )}
      {...props}
    />
  ),
  error: (props) => (
    <Toast
      renderLeadingIcon={() => (
        <Icon name="TriangleAlert" className="text-red-400" size={20} />
      )}
      {...props}
    />
  ),
  info: (props) => (
    <Toast
      renderLeadingIcon={() => (
        <Icon name="Info" className="text-white" size={20} />
      )}
      {...props}
    />
  ),
};

export default toastConfig;
