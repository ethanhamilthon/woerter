import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OsLanguages, useI8 } from "..";

export function ChangeLanguage() {
  const { setLanguage, oslang } = useI8();
  return (
    <Select
      defaultValue={oslang}
      onValueChange={(v) => {
        setLanguage(v);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="System Language" />
      </SelectTrigger>
      <SelectContent>
        {OsLanguages.map((lang) => {
          return (
            <SelectItem value={lang.value} key={lang.value}>
              {lang.text}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
