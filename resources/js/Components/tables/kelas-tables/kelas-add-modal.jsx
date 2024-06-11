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
import { useGuruDataStore } from "@/hooks/useGuruData";
import InputSelect from "@/Components/ui/custom/input-select";
const formSchema = z.object({
  nama: z
    .string()
    .min(1, { message: "Name is required" })
    .transform((value) => value?.trim()),
  guru_id: z
    .string()
    .min(1, { message: "Wali Guru is required" })
    .transform((value) => value?.trim()),
  tahun_mulai: z.string().min(1, { message: "Tahun Mulai Ajaran is required" }),
  tahun_selesai: z.string().min(1, { message: "Tahun Selesai Ajaran is required" }),
});

const KelasAddModal = ({ isOpen, onClose }) => {
  const { guru } = useGuruDataStore();
  const { errors } = usePage().props;
  const [isMounted, setIsMounted] = useState(false);

  const currentYear = new Date().getFullYear();
  const optTahunAjar = () => {
    const next5Year = currentYear + 5;
    let last5Year = currentYear - 5;
    let years = [];
    while (last5Year <= next5Year) {
      years.push(last5Year++);
    }
    return years;
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      guru_id: "",
      tahun_mulai: "",
      tahun_selesai: "",
    },
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line no-undef
    router.post(route("Kelas&Mapel.new"), { ...data, insertFor: "kelas" });
    if (errors?.addKelas) {
      Object.keys(errors.addKelas).forEach((key) => {
        form.setError(key, { message: errors.addKelas[key] });
        toast({
          className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
          variant: "destructive",
          title: "Save Failed",
          description: errors.addKelas[key],
          duration: 5000, //5s
        });
      });
    } else {
      handleClose();
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
      title="Add New Kelas"
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
                label={"Nama Kelas"}
                type={"text"}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputSelect
                  form={form}
                  name={"tahun_mulai"}
                  label={"Tahun Ajaran Mulai"}
                  placeholder={"Pilih Tahun"}
                  data={optTahunAjar()
                    .slice(0, -1)
                    .map((year) => ({
                      value: year,
                      label: year,
                    }))}
                  onValueChange={(e) => {
                    form.setValue("tahun_selesai", (Number(e) + 1).toString());
                    form.setValue("tahun_mulai", e);
                  }}
                />

                <InputSelect
                  form={form}
                  name={"tahun_selesai"}
                  label={"Tahun Ajaran Selesai"}
                  placeholder={"Pilih Tahun"}
                  data={optTahunAjar()
                    .slice(1)
                    .map((year) => ({
                      value: year,
                      label: year,
                    }))}
                  onValueChange={(e) => {
                    form.setValue("tahun_selesai", e);
                    form.setValue("tahun_mulai", (Number(e) - 1).toString());
                  }}
                />
              </div>
              <InputSelect
                form={form}
                name={"guru_id"}
                label={"Guru Wali Kelas"}
                placeholder={"Pilih Guru Wali"}
                data={guru.map((data) => ({
                  value: data.id,
                  label: data.nama_guru,
                }))}
              />

              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default KelasAddModal;
