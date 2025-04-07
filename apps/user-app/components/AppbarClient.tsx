import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/router";
import { use } from "react";
export function AppbarClient() {
  const router = useRouter();
  const session=useSession();
  return (
    <div>
    <Appbar
        onSignin={signIn}
        onSignout={async ()=>{
            await signOut();
            router.push("/api/auth/signin")
        }}
        user={session.data?.user}
    />
    </div>
  );
}
export default AppbarClient;