import { createContext, useContext, useState } from "react";
export type WebResult = {
	url?: string;
	title?: string;
	description?: string;
	markdown?: string;
	screenshot?: string;
};

export type WebResultsContextType = {
	webResults: WebResult[];
	addWebResult: (webResult: WebResult) => void;
	addWebResults: (webResults: WebResult[]) => void;
};

export const WebResultsContext = createContext<WebResultsContextType>({
	webResults: [],
	addWebResult: () => {},
	addWebResults: () => {},
});

export const WebResultsProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const [webResults, setWebResults] = useState<WebResult[]>([]);

	const addWebResult = (webResult: WebResult) => {
		setWebResults((prev) => [...prev, webResult]);
	};

	const addWebResults = (webResults: WebResult[]) => {
		setWebResults((prev) => [...prev, ...webResults]);
	};

	return (
		<WebResultsContext.Provider
			value={{ webResults, addWebResult, addWebResults }}
		>
			{children}
		</WebResultsContext.Provider>
	);
};

export const useWebResults = () => {
	const { webResults, addWebResult, addWebResults } =
		useContext(WebResultsContext);
	return { webResults, addWebResult, addWebResults };
};
