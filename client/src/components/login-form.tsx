import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { loginUserSchema } from "@shared/schema";
import { z } from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FormData = z.infer<typeof loginUserSchema>;

export default function LoginForm() {
  const { loginMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Account Login</h1>
        <div className="flex space-x-3">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
            <i className="fab fa-google"></i>
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
            <i className="fab fa-facebook-f"></i>
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
            <i className="fab fa-twitter"></i>
          </button>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <span className="inline-block w-20 h-1 bg-primary rounded-full"></span>
        <p className="text-gray-500 mt-2">Enter your credentials to continue</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="form-floating relative">
                <FormControl>
                  <Input
                    {...field}
                    id="login-email"
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300"
                    placeholder=" "
                  />
                </FormControl>
                <label 
                  htmlFor="login-email" 
                  className="absolute top-3 left-4 text-gray-500 transition-all"
                >
                  Email Address
                </label>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="form-floating relative">
                <FormControl>
                  <Input
                    {...field}
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300"
                    placeholder=" "
                  />
                </FormControl>
                <label 
                  htmlFor="login-password" 
                  className="absolute top-3 left-4 text-gray-500 transition-all"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember-me" className="w-4 h-4 text-primary focus:ring-primary rounded" />
              <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">Remember me</label>
            </div>
            <a href="#" className="text-sm text-primary hover:text-primary-dark transition-colors">
              Forgot password?
            </a>
          </div>
          
          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>
      
      {loginMutation.isError && (
        <Alert variant="destructive" className="mt-6">
          <AlertDescription>
            {loginMutation.error.message || "An error occurred during login. Please try again."}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
