import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select";
import { Controller } from "react-hook-form";

interface ControlledSelectProps {
    name: string;
    control: any;
    placeholder: string;
    label: string;
    options: { id: string, name: string, type?: string }[];
}

export const ControlledSelect: React.FC<ControlledSelectProps> = ({ name, control, placeholder, label, options }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Select

                    onValueChange={field.onChange} {...field}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>{label}</SelectLabel>
                            {
                                options.map((item) => (
                                    <SelectItem key={item.id} value={item.id}>
                                        {item.name} {item.type && `- ${item.type}`}
                                    </SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            )}
        />
    );
};


