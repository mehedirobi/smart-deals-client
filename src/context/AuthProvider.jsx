import React, { useEffect, useState } from 'react';
import { Authcontext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Create user
    const createUser = () => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign in user
    const signInUser = () => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Sign in with google
    const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
    }

    // Sign Out
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
   

    // Observer useeffect
    useEffect(() => {
        const unsubscriber = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return unsubscriber;
    }, [])

    // AuthInfo
    const authInfo = {
        createUser,
        signInUser,
        signInWithGoogle,
        logOut,
        user, 
        loading,

    }
    return (
        <Authcontext value={authInfo}>
            {children}
        </Authcontext>
    );
};

export default AuthProvider;