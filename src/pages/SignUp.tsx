import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/lib/routes";
import { ArrowLeft } from "lucide-react";

export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 pt-safe">
        <Button asChild variant="ghost" size="icon">
          <Link to={ROUTES.LANDING}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="font-display text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">Start planning your dream trips today</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Enter your name" className="h-12" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" className="h-12" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Create a password" className="h-12" />
          </div>

          <Button type="submit" size="lg" className="w-full h-14 text-lg font-semibold">
            Create Account
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to={ROUTES.SIGNIN} className="text-primary font-medium hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}