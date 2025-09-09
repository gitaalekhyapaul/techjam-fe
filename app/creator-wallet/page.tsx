import { CreatorWalletPage } from "@/wallet/creator/creator-wallet-page"

export default function CreatorWalletPageRoute() {
  return <CreatorWalletPage onBack={() => window.history.back()} />
}
