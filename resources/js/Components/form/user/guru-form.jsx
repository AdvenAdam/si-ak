import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import InputForm from "@/Components/ui/custom/input-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    nama: z.string().min(1, { message: "Name is required" }),
    nisn: z.number({
      required_error: "NISN is required",
      invalid_type_error: "NISN must be a number",
    }),
    alamat: z.string(),
    tanggal_lahir: z.string().min(1, { message: "Date of Birth is required" }).date({ message: "Invalid date format" }),
    id_kelas: z.number().min(1, { message: "Class is required" }),
    email: z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email({
        message: "Email must be a valid email",
      }),
    password: z.string().min(1, { message: "Password is required" }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const GuruForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Card>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
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
              <InputForm
                form={form}
                name={"kelas"}
                label={"Kelas"}
                type={"number"}
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

export default GuruForm;
