import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ForgotPWValidation } from "@/lib/validation/AuthValidations";

import { useSendPWResetToken, usePasswordReset } from "@/lib/react-query/queries";
import { useState } from "react";
import { toastConfig } from "@/constants";
import toast from "react-hot-toast";
import { Icons } from "@/components/ui/icons";

const ForgotPasswordForm = () => {
  const [isTokenSent, setIsTokenSent] = useState(false);
  const [hasResetToken, setHasResetToken] = useState(false);

  const validationSchema = ForgotPWValidation(hasResetToken);

	const { mutateAsync: sendPWResetToken, isPending: isSendingPWResetToken } = useSendPWResetToken();
  const { mutateAsync: passwordReset, isPending: isResettingPassword } = usePasswordReset();

	const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: "",
      resetToken: "",
      newPassword: "",
      newPWConfirm: ""
    },
  });

  const handlePasswordReset = async (user: z.infer<typeof validationSchema>) => {
    if(hasResetToken) {
      const response = await passwordReset(user);
      
      if (response?.errors) {
        toast.error(response.errors[0].detail, toastConfig);
        
        return;
      }
      
      toast.success("Password has been reset", toastConfig);
      form.reset();

    } else {
      handleSendPWResetToken(user.email);
    }
  };

	const handleSendPWResetToken = async (email: string) => {
    
    const response = await sendPWResetToken(email);
		
    if (response?.errors) {
      toast.error(response.errors[0].detail, toastConfig);
      
      return;
    }
    
    setIsTokenSent(true);
    toast.success(`Password reset token sent to this email ${email}`, toastConfig);

  };

  return (

    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Password Reset</CardTitle>
        <CardDescription>Reset token will be sent to your registered email</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlePasswordReset)}
            className="flex flex-col gap-5 w-full mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field}  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {hasResetToken && (
              <>
                <FormField
                  control={form.control}
                  name="resetToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="shad-form_label">Reset Token:</FormLabel>
                      <FormControl>
                        <Input type="text" className="shad-input" {...field} />
                      </FormControl>
                      <FormMessage className="shad-form_message" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="shad-form_label">New Password:</FormLabel>
                      <FormControl>
                        <Input type="password" className="shad-input" {...field} />
                      </FormControl>
                      <FormMessage className="shad-form_message"  />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPWConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="shad-form_label">Confirm New Password:</FormLabel>
                      <FormControl>
                        <Input type="password" className="shad-input" {...field} />
                      </FormControl>
                      <FormMessage className="shad-form_message"  />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button type="submit" disabled={(isSendingPWResetToken || isResettingPassword)} className="shad-button">
              {(isSendingPWResetToken || isResettingPassword) && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )} { hasResetToken ? "Reset Password" : "Send Reset Token" }
            </Button>

            <Button type="button" size="lg" className="shad-button"
              onClick={() => hasResetToken ? setHasResetToken(false) : setHasResetToken(true)}
              disabled={(!isTokenSent || isSendingPWResetToken || isResettingPassword)}
              variant="outline"
            >
              { hasResetToken ? "Back" : "I Have Reset Token" }
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Link to="/sign-in" className="shad-link">
          Back to login
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ForgotPasswordForm