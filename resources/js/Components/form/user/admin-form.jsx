import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/Components/ui/card";
import InputForm from "@/Components/ui/custom/input-form";
import InputSelect from "@/Components/ui/custom/input-select";
import { Form } from "@/Components/ui/form";
import { toast } from "@/Components/ui/use-toast";
import { useKelasDataStore } from "@/hooks/useKelasData";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as inertiaForm, router } from "@inertiajs/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z
  .object({
    nama: z.string().min(1, { message: "Username is required" }),
    email: z.string({ message: "Email is required" }).email({ message: "Email must be a valid email" }),
    password: z.string().min(1, { message: "Password is required" }).min(8, "Password must be at least 8 characters"),
    confirm: z
      .string()
      .min(1, { message: "Confirm password is required" })
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const AdminForm = () => {
  const { post, errors, recentlySuccessful } = inertiaForm();
  const hasErrors = Boolean(Object.keys(errors).length);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      nama: "",
      confirm: "",
    },
  });

  useEffect(() => {
    if (hasErrors) {
      const messageError = Object.entries(errors).reduce((acc, [key, value]) => {
        form.setError(key, { message: value });
        return { ...acc, [key]: value };
      }, {});
      const toastMessage = Object.values(messageError).map((message) => <li key={message}>{message}</li>);
      toast({
        className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
        variant: "destructive",
        title: "Login Failed",
        description: <ol>{toastMessage}</ol>,
        duration: 5000, //5s
      });
    }
    if (recentlySuccessful) {
      // form.reset();
      toast({
        className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
        variant: "success",
        title: "Success",
        description: "Data has been saved",
        duration: 5000, //5s
      });
    }
  }, [hasErrors, errors, recentlySuccessful, form]);

  const onSubmit = (data) => {
    // eslint-disable-next-line no-undef
    post(route("user.store", { ...data, role_id: 3 }));
  };
  const onErrorSubmit = (errors) => {
    if (errors) {
      toast({
        className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
        variant: "destructive",
        title: "Save Failed",
        description: "Please make sure you filled all data correctly.",
        duration: 5000, //5s
      });
    }
  };
  return (
    <Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}
          className="space-y-4"
        >
          <CardContent className="space-y-6">
            <div className="space-y-2 mt-10">
              <CardTitle>Admin</CardTitle>
              <CardDescription>{`Make changes to your Admin here. Click save when you're done.`}</CardDescription>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputForm
                form={form}
                name={"email"}
                label={"Email"}
                type={"text"}
              />

              <InputForm
                form={form}
                name={"nama"}
                label={"Username"}
                type={"text"}
              />
              <InputForm
                form={form}
                name={"password"}
                label={"Password"}
                type={"password"}
              />
              <InputForm
                form={form}
                name={"confirm"}
                label={"Confirm Password"}
                type={"password"}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AdminForm;
