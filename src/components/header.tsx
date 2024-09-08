import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="w-full flex justify-between items-center">
      {children}
      <UnifiedWalletButton />
    </header>
  )
}