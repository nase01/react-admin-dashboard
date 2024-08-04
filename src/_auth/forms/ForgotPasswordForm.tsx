import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/shared/Loader";
import { ForgotPWValidation } from "@/lib/validation";

import { useSendPWResetToken, usePasswordReset } from "@/lib/react-query/queries";
import { useState } from "react";

const ForgotPasswordForm = () => {
	const { toast } = useToast();
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
        toast({ title: response.errors[0].detail });
        
        return;
      }
      
      toast({ title: "Password has been reset" });
      form.reset();

    } else {
      handleSendPWResetToken(user.email);
    }
  };

	const handleSendPWResetToken = async (email: string) => {
    
    const response = await sendPWResetToken(email);
		
    if (response?.errors) {
      toast({ title: response.errors[0].detail });
      
      return;
    }
    
    setIsTokenSent(true);
		toast({ title: `Password reset token sent to this email ${email}` });

  };

  return (
		<Form {...form}>
			<>
				<div className="flex justify-center items-center text-light-4 my-10" >
					<h2 className="font-bold text-lg">
						Password Reset
					</h2>
				</div>
				
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

          <Button type="submit" disabled={isSendingPWResetToken || isResettingPassword} className="shad-button_primary">
            {isSendingPWResetToken || isResettingPassword ? (
              <div className="flex flex-center gap-2">
                <Loader />
              </div>
            ) : hasResetToken ? "Reset Password" : "Send Reset Token" }
          </Button>

          <Button type="button" size="lg" className="shad-button"
            onClick={() => hasResetToken ? setHasResetToken(false) : setHasResetToken(true)}
            disabled={!isTokenSent || isSendingPWResetToken || isResettingPassword}
            variant="outline"
          >
            { hasResetToken ? "Back" : "I Have Reset Token" }
          </Button>

          <p className="text-small-regular text-light-4 text-center mt-2">
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1">
              Back to login
            </Link>
          </p>
				</form>
			</>
		</Form>
  )
}

export default ForgotPasswordForm