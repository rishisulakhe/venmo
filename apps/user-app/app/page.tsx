import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { PrismaClient } from "@repo/db";
const client =new PrismaClient();

export default function Home() {
  return (
    <div>
      <div className="text-red-500">
        Hi Rishi beta
      </div>
      <Button appName=" app">
        Hi their
      </Button>
    </div>)
}
