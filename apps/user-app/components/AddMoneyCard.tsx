"use client";
import { Card2 } from "@repo/ui/card2";
import { TextInput } from "@repo/ui/textinput";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { createOnRampTransaction } from "../app/lib/actions/createOnRamptxn";
const Banks = [
  {
    name: "HDFC bank",
    redirectUrl: "https://netbanking.hdfcbank.com/netbanking/",
  },
  {
    name: "AXIS bank",
    redirectUrl: "https://omni.axisbank.co.in/axisretailbanking/",
  },
];
export function AddMoneyCard() {
  const [reDirectUrl, setRedirectUrl] = useState(Banks[0]?.redirectUrl);
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState(Banks[0]?.name || "");
  return (
    <Card2 title="Add Money">
      <div className="w-full ">
        <TextInput
          placeholder="Amount"
          label="Amount"
          onchange={(value) => {
            setAmount(value);
          }}
        />
        <div className="p-2">
          Bank
          <Select
            list={Banks.map((x) => ({
              key: x.name,
              value: x.name,
            }))}
            onSelect={(value) => {
              setRedirectUrl(
                Banks.find((x) => x.name === value)?.redirectUrl || ""
              );
              setBank(Banks.find((x) => x.name === value)?.redirectUrl || "");
            }}
          />
        </div>
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              //add entry to onRamp with status pending, but when transaction is successfull convert it to success
              window.location.href = reDirectUrl || "";
              await createOnRampTransaction(Number(amount) * 100, bank);
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card2>
  );
}