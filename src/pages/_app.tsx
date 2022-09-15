import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<>
			<Toaster />
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
