import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";

const InputSelect = ({ name, form, label, placeholder, data, ...props }) => {
  // Create a map from value to label for quick lookup
  const valueToLabelMap = data.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            {...props}
          >
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder || label}>
                  {field.value && valueToLabelMap[field.value]}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="space-y-1">
              {data.map((item, index) => (
                <SelectItem
                  key={index}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputSelect;
