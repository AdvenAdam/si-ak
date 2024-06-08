import { useState } from "react";
import { FormControl, FormItem } from "../form";
import { Popover } from "@headlessui/react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { PopoverContent } from "../popover";
import { Calendar } from "../calendar";

export function DatePickerDemo({ name, field }) {
  const [date, setDate] = useState();

  return (
    <FormItem>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
            >
              {field.value ? format(field.value, "PP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </FormItem>
  );
}
