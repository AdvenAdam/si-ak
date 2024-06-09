import { Modal } from "@/Components/ui/custom/modal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useForm as inertiaForm, router, usePage } from "@inertiajs/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/Components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Form } from "@/Components/ui/form";
import InputForm from "@/Components/ui/custom/input-form";
import { Button } from "@/Components/ui/button";

const formSchema = z.object({
  nama: z.string().min(1, { message: "Name is required" }),
});

export const MapelAddModal = ({ isOpen, onClose, onConfirm, error }) => {
  const { errors } = usePage().props;
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
    },
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line no-undef
    router.post(route("Kelas&Mapel.new"), { ...data, insertFor: "mapel" });
    if (errors?.addMapel) {
      Object.keys(errors.addMapel).forEach((key) => {
        form.setError(key, { message: errors.addMapel[key] });
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
          variant: "destructive",
          title: "Save Failed",
          description: errors.addMapel[key],
          duration: 5000, //5s
        });
      });
    }
  };
  const handleClose = () => {
    onClose();
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Add New Mata Pelajaran"
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
            <div className="space-y-6">
              <InputForm
                form={form}
                name={"nama"}
                label={"Nama Mata Pelajaran"}
                type={"text"}
              />
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
