import { Session } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { supabase } from "./app/_layout";

type AuthContext = {
	session: Session | null;
	isLoading: boolean;
	user: Session["user"] | undefined;
	setSession: (session: Session | null) => void;
};

export const AuthContext = createContext<AuthContext>({
	user: undefined,
	isLoading: true,
	session: null,
	setSession: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [loading, setLoading] = useState(true);
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setLoading(false);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<AuthContext.Provider
			value={{ user: session?.user, isLoading: loading, session, setSession }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
