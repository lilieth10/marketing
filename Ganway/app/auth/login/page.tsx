import { LoginForm } from "@/components/auth/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image with better proportions */}
      <div className="flex-[2] relative bg-gray-100">
        <Image
          src="/images/auth/login-image.jpg"
          alt="Fashion models"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex-[1] bg-white flex flex-col justify-center px-12 min-w-[400px]">
        <LoginForm />
      </div>
    </div>
  )
}
