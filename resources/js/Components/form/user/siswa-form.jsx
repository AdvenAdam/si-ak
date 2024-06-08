import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/Components/ui/card";
import InputForm from "@/Components/ui/custom/input-form";
import InputSelect from "@/Components/ui/custom/input-select";
import { Form } from "@/Components/ui/form";
import { toast } from "@/Components/ui/use-toast";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as inertiaForm, router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z
  .object({
    nama: z.string({ message: "Name is required" }),
    nisn: z.string({ message: "NISN is required" }).regex(/^\d+$/, { message: "NISN must be a number" }),
    alamat: z.string().optional(),
    tanggal_lahir: z.string({ message: "Date of Birth is required" }).refine((val) => !isNaN(Date.parse(val)), {
      message: "Date of Birth is invalid",
      path: ["tanggal_lahir"],
    }),
    kelas_id: z.string({ message: "Class is required" }),
    email: z.string({ message: "Email is required" }).email({ message: "Email must be a valid email" }),
    password: z.string({ message: "Password is required" }).min(8, "Password must be at least 8 characters"),
    confirm: z.string({ message: "Confirm password is required" }).min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const SiswaForm = () => {
  const { post, errors, recentlySuccessful } = inertiaForm();
  const hasErrors = Boolean(Object.keys(errors).length);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      nama: "",
      nisn: "",
      alamat: "",
      tanggal_lahir: "",
      kelas_id: "",
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
      form.reset();
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
    post(route("user.store", { ...data, role_id: 1 }));
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
              <CardTitle>Siswa</CardTitle>
              <CardDescription>{`Make changes to your Siswa here. Click save when you're done.`}</CardDescription>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 small:grid-cols-1">
              <InputForm
                form={form}
                name={"nama"}
                label={"Nama"}
                type={"text"}
              />
              <InputForm
                form={form}
                name={"nisn"}
                label={"NISN"}
                type={"number"}
                min={0}
              />
              <InputSelect
                form={form}
                name={"kelas_id"}
                label={"Kelas"}
                placeholder={"Pilih Kelas"}
                data={[
                  { value: 1, label: "X" },
                  { value: 2, label: "XI" },
                  { value: 3, label: "XII" },
                ]}
              />
              <InputForm
                form={form}
                name={"tanggal_lahir"}
                label={"Tanggal Lahir"}
                type={"date"}
                className="w-fit"
              />
            </div>
            <div className="grid grid-cols-1">
              <InputForm
                form={form}
                name={"alamat"}
                label={"Alamat"}
                type={"text"}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <CardTitle>Informasi Akun</CardTitle>
              <CardDescription>{`Make changes to your Account here. Click save when you're done.`}</CardDescription>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 small:grid-cols-1">
              <InputForm
                form={form}
                name={"email"}
                label={"Email"}
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

export default SiswaForm;
