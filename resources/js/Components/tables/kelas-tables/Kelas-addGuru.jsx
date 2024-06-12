import { Button } from "@/Components/ui/button";
import InputSelect from "@/Components/ui/custom/input-select";
import { useGuruDataStore } from "@/hooks/useGuruData";
import { useMapelDataStore } from "@/hooks/useMapelData";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const AddGuruMapel = ({ form }) => {
  const { guru, mapel } = usePage().props;
  const [generateCount, setGenerateCount] = useState(1);
  useEffect(() => {
    mapel && useMapelDataStore.setState({ mapel });
    guru && useGuruDataStore.setState({ guru });
  }, []);
  const { mapel: dats } = useMapelDataStore();
  console.log("🚀 ~ AddGuruMapel ~ dats:", dats);
  const handleClick = (action) => {
    if (action === "add") {
      setGenerateCount(generateCount + 1);
    } else {
      setGenerateCount(generateCount - 1);
      form.setValue(`mapel_id[${generateCount - 1}]`, "");
      form.setValue(`guru_id[${generateCount - 1}]`, "");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Button
          variant={"secondary"}
          onClick={(e) => {
            e.preventDefault();
            handleClick("add");
          }}
        >
          Add Pelajaran
        </Button>
      </div>
      {[...Array(generateCount)].map((_, index) => (
        <SelectComponent
          key={index}
          index={index}
          form={form}
        />
      ))}
      <Button
        variant={"secondary"}
        onClick={(e) => {
          e.preventDefault();
          handleClick("remove");
        }}
        disabled={generateCount === 1}
      >
        Rmv Pelajaran
      </Button>
    </div>
  );
};

export const SelectComponent = ({ index, form }) => {
  const { guru } = useGuruDataStore();
  const { mapel } = useMapelDataStore();

  const handleMapelChange = (e) => {
    const selectedMapelId = e;
    form.setValue(`mapel_id[${index}]`, selectedMapelId);

    const selectedMapel = mapel.find((mapel) => mapel.id == selectedMapelId);
    console.log("🚀 ~ handleMapelChange ~ selectedMapel:", selectedMapel);
    if (selectedMapel) {
      const filteredGuru = guru.filter((guru) => guru.mapel_id === selectedMapel.id);
      console.log("🚀 ~ handleMapelChange ~ filteredGuru:", filteredGuru);
      useGuruDataStore.setState({ guru: filteredGuru });
      useMapelDataStore.setState({ mapel: mapel.filter((mapel) => mapel.id !== selectedMapel.id) });
    }
    console.log(
      "🚀 ~ SelectComponent ~ mapelData:",
      mapel.filter((mapel) => mapel.id != selectedMapelId)
    );
  };

  return (
    <div className="grid grid-cols-2 space-x-2">
      <InputSelect
        form={form}
        name={`mapel_id[${index}]`}
        label={"Mata Pelajaran"}
        placeholder={"Pilih Mata Pelajaran"}
        onValueChange={handleMapelChange}
        data={mapel.map((mapel) => ({
          value: mapel.id,
          label: mapel.nama_mata_pelajaran,
        }))}
      />

      <InputSelect
        form={form}
        name={`guru_id[${index}]`}
        label={"Guru"}
        placeholder={"Pilih Guru"}
        data={guru.map((guru) => ({
          value: guru.id,
          label: guru.nama_guru,
        }))}
      />
    </div>
  );
};

export default AddGuruMapel;
