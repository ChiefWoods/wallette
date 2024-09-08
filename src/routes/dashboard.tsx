import { useConnection, useUnifiedWallet } from "@jup-ag/wallet-adapter";
import NotConnected from "../components/notConnected";
import { useEffect, useState } from "react";
import { ConfirmedSignatureInfo, LAMPORTS_PER_SOL } from "@solana/web3.js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  const { connected, publicKey } = useUnifiedWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<ConfirmedSignatureInfo[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (publicKey) {
        setBalance(await connection.getBalance(publicKey) / LAMPORTS_PER_SOL);

        const sigs = await connection.getSignaturesForAddress(publicKey);

        setTransactions(sigs);
      }
    }

    fetchData()
  }, [connection, publicKey]);

  return (
    <main className="flex flex-col gap-y-4 items-center">
      <h1 className="font-semibold">Dashboard</h1>
      {connected ? (
        <>
          <p className="text-lg">Balance : {balance} SOL</p>
          <h2>Transaction History</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Signature</TableHead>
                <TableHead className="w-[125px]">Block</TableHead>
                <TableHead className="w-[125px">Slot</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.signature} className="">
                  <TableCell className="w-full">{transaction.signature}</TableCell>
                  <TableCell className="min-w-[100px]">{transaction.blockTime}</TableCell>
                  <TableCell className="min-w-[100px]">{transaction.slot}</TableCell>
                  <TableCell className={`text-right min-w-[100px] font-bold ${transaction.err ? "text-red-400" : "text-green-400"}`}>{transaction.err ? "Error" : "Success"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <NotConnected />
      )}
    </main>
  )
}