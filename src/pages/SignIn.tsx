import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ROUTES } from "@/lib/routes";
import { signInSchema, SignInFormData, emailSchema } from "@/lib/validations";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement Supabase signin
      console.log("Sign in data:", data, "Remember me:", rememberMe);
      toast.success("Welcome back!");
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const result = emailSchema.safeParse(resetEmail);
    if (!result.success) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsResetting(true);
    try {
      // TODO: Implement Supabase password reset
      console.log("Reset password for:", resetEmail);
      toast.success("Password reset email sent! Check your inbox.");
      setForgotPasswordOpen(false);
      setResetEmail("");
    } catch (error) {
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setIsResetting(false);
    }
  };

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
          <h1 className="font-display text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue your journey</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="h-12" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
                      <DialogTrigger asChild>
                        <button 
                          type="button" 
                          className="text-sm text-primary hover:underline"
                        >
                          Forgot password?
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reset Password</DialogTitle>
                          <DialogDescription>
                            Enter your email address and we'll send you a link to reset your password.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="h-12"
                          />
                          <Button 
                            onClick={handleForgotPassword}
                            className="w-full"
                            disabled={isResetting}
                          >
                            {isResetting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              "Send Reset Link"
                            )}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password" 
                        className="h-12 pr-12" 
                        {...field} 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-12 w-12"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-3">
              <Checkbox 
                id="remember" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label 
                htmlFor="remember" 
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Remember me
              </label>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-14 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to={ROUTES.SIGNUP} className="text-primary font-medium hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
