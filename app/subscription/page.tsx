"use client"
import { TikTokSubscriptionPage } from "@/components/subs"
import { useRouter } from "next/navigation"

export default function SubscriptionPage() {
  const router = useRouter()
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    localStorage.removeItem("userType")
    router.push("/")
  }
  
  return <TikTokSubscriptionPage  
    onNavigateToMain={() => {
      router.push("/")
    }}
    onNavigateToWallet={() => {
      router.push("/")
    }}
    onBack={() => {  
      router.push("/")  
    }}
    onLogout={handleLogout}
  />
}
