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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const TX_PAGINATION_INCREMENT = 15;

  const { connected, publicKey } = useUnifiedWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<ConfirmedSignatureInfo[]>([]);
  const [txLimit, setTxLimit] = useState<number>(TX_PAGINATION_INCREMENT);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      if (publicKey) {
        setBalance(await connection.getBalance(publicKey) / LAMPORTS_PER_SOL);
      }
    }

    fetchData()
  }, [connection, publicKey]);

  useEffect(() => {
    async function fetchData() {
      if (publicKey) {
        setIsFetching(true);

        const txs = await connection.getSignaturesForAddress(publicKey, {
          limit: txLimit,
        });

        setTransactions(txs)
        setIsFetching(false);
      }
    };

    fetchData();
  }, [connection, publicKey, txLimit]);

  return (
    <main className="flex flex-col gap-y-4 items-center">
      <h1 className="font-semibold">Dashboard</h1>
      {connected ? (
        <>
          <p className="text-lg">Balance : {balance} SOL</p>
          <h2>Transaction History</h2>
          <Table>
            <TableHeader>
              <TableRow className="justify-end">
                <TableHead className="w-full min-w-[150px]">Signature</TableHead>
                <TableHead className="min-w-[125px]">Block</TableHead>
                <TableHead className="min-w-[125px]">Slot</TableHead>
                <TableHead className="text-right min-w-[100px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length ? transactions.map((transaction) => (
                <TableRow key={transaction.signature} className="overflow-hidden justify-end">
                  <TableCell className="w-full min-w-[150px] text-ellipsis">{transaction.signature}</TableCell>
                  <TableCell className="min-w-[125px]">{transaction.blockTime}</TableCell>
                  <TableCell className="min-w-[125px]">{transaction.slot}</TableCell>
                  <TableCell className={`text-right min-w-[100px] font-bold ${transaction.err ? "text-red-400" : "text-green-400"}`}>{transaction.err ? "Error" : "Success"}</TableCell>
                </TableRow>
              )) :
                (<>
                  {Array.from({ length: 5 }).map((_) => (
                    <TableRow className="overflow-hidden justify-end">
                      <TableCell><Skeleton className="w-full h-[20px]"></Skeleton></TableCell>
                      <TableCell><Skeleton className="w-full h-[20px]"></Skeleton></TableCell>
                      <TableCell><Skeleton className="w-full h-[20px]"></Skeleton></TableCell>
                      <TableCell><Skeleton className="w-full h-[20px]"></Skeleton></TableCell>
                    </TableRow>
                  ))}
                </>)}
            </TableBody>
          </Table>
          {Boolean(transactions.length) &&
            <Button disabled={isFetching} onClick={() => setTxLimit(p => p + TX_PAGINATION_INCREMENT)}>
              {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Load More
            </Button>
          }
        </>
      ) : (
        <NotConnected />
      )
      }
    </main >
  )
}