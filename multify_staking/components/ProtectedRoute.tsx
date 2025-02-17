import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authcontext";
import { useUserData } from "../context/userDataHook";



export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const { userData } = useUserData();
  // based on userType go to company or users
  useEffect(() => {
    if (!user && !userData && user?.uid === null) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }
    , [user]);

  return <div>{user ? children : null}</div>;
}