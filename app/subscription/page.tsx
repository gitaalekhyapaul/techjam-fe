import { TikTokSubscriptionPage } from "@/components/subs"
import { useRouter } from "next/navigation"

export default function SubscriptionPage() {
  const router = useRouter()
  return <TikTokSubscriptionPage  onNavigateToMain={ () => {
    router.push("/")
  } }
  onNavigateToWallet={ () => {
    router.push("/")
  } }
  onBack={ () => {  
    router.push("/")  
  } }
  />
}
