
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, collection, getDocs, query, where, setDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebaseConfig';
import { useToast } from '@/hooks/use-toast';

type User = {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  isAdmin?: boolean;
} | null;

interface AuthContextType {
  currentUser: User;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  checkIsAdmin: (userId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  checkIsAdmin: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Function to check if user is an admin
  const checkIsAdmin = async (userId: string): Promise<boolean> => {
    try {
      const docRef = doc(db, 'admins', userId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      if (user) {
        try {
          const isAdmin = await checkIsAdmin(user.uid);

          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            isAdmin,
          });
        } catch (error) {
          console.error('Error checking admin:', error);
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            isAdmin: false,
          });
        }
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      let errorMessage = "Error al iniciar sesión. Verifica tus credenciales.";
      
      if (error?.code === "auth/user-not-found" || error?.code === "auth/wrong-password") {
        errorMessage = "Correo o contraseña incorrectos.";
      } else if (error?.code === "auth/too-many-requests") {
        errorMessage = "Demasiados intentos fallidos. Inténtalo más tarde.";
      }
      
      toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: errorMessage,
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      let errorMessage = "Error al crear la cuenta.";
      
      if (error?.code === "auth/email-already-in-use") {
        errorMessage = "El correo electrónico ya está en uso.";
      } else if (error?.code === "auth/weak-password") {
        errorMessage = "La contraseña es demasiado débil.";
      }
      
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: errorMessage,
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setCurrentUser(null);
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      });
    } catch (error) {
      console.error("Error closing session:", error);
      toast({
        variant: "destructive",
        title: "Error al cerrar sesión",
        description: "Hubo un problema al intentar cerrar la sesión.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Correo enviado",
        description: "Se ha enviado un correo para restablecer tu contraseña.",
      });
    } catch (error: any) {
      let errorMessage = "Error al enviar el correo.";
      
      if (error?.code === "auth/user-not-found") {
        errorMessage = "No hay ningún usuario registrado con este correo electrónico.";
      }
      
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
      
      throw error;
    }
  };

  const value = {
    currentUser,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
    checkIsAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
