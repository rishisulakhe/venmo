import { getServerSession } from "next-auth";
import { AddMoneyCard } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnrampCard } from "../../../components/OnRampTransactions";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db";
async function getBalance() {
  const session = await getServerSession(authOptions);
  // const balance = await prisma.balance.findFirst({
  //   where: {
  //     userId: Number(session?.user?.id),
  //   },
  // });
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}
export async function getP2p() {
  const session = await getServerSession(authOptions);
  const p2p = await prisma.p2PTransfer.findMany({
    where: {
      fromUserId: Number(session.user.id),
    },
  });
  return p2p;
}
export async function getOnRampTrans() {
  const session = await getServerSession(authOptions);
  const txn = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return txn;
}
export default async function () {
  const balance = await getBalance();
  const transactions = await getOnRampTrans();

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoneyCard />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnrampCard transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}