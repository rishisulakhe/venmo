"use client"

import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { Appbar } from "@repo/ui/appbar";
import { signIn,signOut , useSession} from "next-auth/react";
export default function Home() {
  const sesssion=useSession();
  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={sesssion.data?.user}/>
    </div>)
}
