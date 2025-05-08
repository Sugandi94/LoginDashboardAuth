import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Extend the schema to add password confirmation
const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(1, "Confirm password is required"),
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { registerMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = (data: FormData) => {
    // Remove confirmPassword and terms from data before submitting
    const { confirmPassword, terms, ...registerData } = data;
    
    registerMutation.mutate(registerData, {
      onSuccess: () => {
        setRegisterSuccess(true);
        form.reset();
        
        // Call the onSuccess callback after a delay to show the success message
        setTimeout(() => {
          if (onSuccess) onSuccess();
        }, 2000);
      },
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
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
        <span className="inline-block w-20 h-1 bg-secondary rounded-full"></span>
        <p className="text-gray-500 mt-2">Fill in your details to get started</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="form-floating relative">
                  <FormControl>
                    <Input
                      {...field}
                      id="register-firstname"
                      className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all duration-300"
                      placeholder=" "
                    />
                  </FormControl>
                  <label 
                    htmlFor="register-firstname" 
                    className="absolute top-3 left-4 text-gray-500 transition-all"
                  >
                    First Name
                  </label>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="form-floating relative">
                  <FormControl>
                    <Input
                      {...field}
                      id="register-lastname"
                      className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all duration-300"
                      placeholder=" "
                    />
                  </FormControl>
                  <label 
                    htmlFor="register-lastname" 
                    className="absolute top-3 left-4 text-gray-500 transition-all"
                  >
                    Last Name
                  </label>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="form-floating relative">
                <FormControl>
                  <Input
                    {...field}
                    id="register-username"
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all duration-300"
                    placeholder=" "
                  />
                </FormControl>
                <label 
                  htmlFor="register-username" 
                  className="absolute top-3 left-4 text-gray-500 transition-all"
                >
                  Username
                </label>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="form-floating relative">
                <FormControl>
                  <Input
                    {...field}
                    id="register-email"
                    type="email"
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all duration-300"
                    placeholder=" "
                  />
                </FormControl>
                <label 
                  htmlFor="register-email" 
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
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all duration-300"
                    placeholder=" "
                  />
                </FormControl>
                <label 
                  htmlFor="register-password" 
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
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="form-floating relative">
                <FormControl>
                  <Input
                    {...field}
                    id="register-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:bg-white transition-all duration-300"
                    placeholder=" "
                  />
                </FormControl>
                <label 
                  htmlFor="register-confirm-password" 
                  className="absolute top-3 left-4 text-gray-500 transition-all"
                >
                  Confirm Password
                </label>
                <button
                  type="button"
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="terms"
                    className="w-4 h-4 text-secondary focus:ring-secondary rounded"
                  />
                </FormControl>
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the <a href="#" className="text-secondary hover:underline">Terms of Service</a> and <a href="#" className="text-secondary hover:underline">Privacy Policy</a>
                </label>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-secondary to-accent text-white font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            {registerMutation.isPending ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </Form>
      
      {registerMutation.isError && (
        <Alert variant="destructive" className="mt-6">
          <AlertDescription>
            {registerMutation.error.message || "There was an error creating your account. Please try again."}
          </AlertDescription>
        </Alert>
      )}
      
      {registerSuccess && (
        <Alert variant="default" className="mt-6 bg-green-50 text-green-600 border-green-200">
          <AlertDescription>
            Account created successfully! You can now log in.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
