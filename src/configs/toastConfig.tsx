import { ToastConfig } from "react-native-toast-message";
import Icon from "~/components/Icon";
import Toast from "~/components/Toast";

const toastConfig: ToastConfig = {
	success: (props) => (
		<Toast
			renderLeadingIcon={() => (
				<Icon name="check" className="text-acapulco-400" size={20} />
			)}
			{...props}
		/>
	),
	error: (props) => (
		<Toast
			renderLeadingIcon={() => (
				<Icon name="alert-triangle" className="text-red-400" size={20} />
			)}
			{...props}
		/>
	),
	info: (props) => (
		<Toast
			renderLeadingIcon={() => (
				<Icon name="info" className="text-white" size={20} />
			)}
			{...props}
		/>
	),
};

export default toastConfig;
