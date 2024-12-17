import { createContext, useState, ReactNode } from "react";

// Define the type of context value
type AuthContextType = {
    info: { email: string; role: string };
    setInfo: React.Dispatch<React.SetStateAction<{ email: string; role: string }>>;
};

// Create context with a default value matching the expected shape
export const AuthContext = createContext<AuthContextType>({info:{email: "", role: ""},setInfo:()=>{}});

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [info, setInfo] = useState<{ email: string; role: string }>({ email: "", role: "" });

    return (
        <AuthContext.Provider value={{ info, setInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
