"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db";

export async function createOnRampTransaction(amount:number,provider:string) {
    const session=await getServerSession(authOptions);
    // const token=await axios.get("https://api.hdfcbank.com/getToken",{
    //     amount:amount
    //     })
    const token=Math.random().toString();
    const userId=session?.user?.id;

    if(!userId) {
        return {
            msg:"User not found"
        }
    }
    await prisma.onRampTransaction.create({
        data:{
            userId:Number(userId),
            amount:amount,
            status:"Processing",
            startTime:new Date(),
            provider,
            token:token
        }
    })

    return({
        msg:"OnRampTrasaction added"
    })
}