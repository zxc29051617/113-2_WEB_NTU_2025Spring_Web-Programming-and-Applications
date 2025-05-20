"use client";

import * as React from "react";
import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { z } from "zod";

export const schema = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  hours: z.string(),
  policies: z.array(z.string()),
  paymentMethods: z.array(z.string()),
  facilities: z.array(z.string()),
  imageUrl: z.string().url(),
});

// 新增: 定義 Props 接口
interface SearchBarProps {
  data: z.infer<typeof schema>[];
  onSearch: (searchTerm: string) => void; // 新增: 搜尋回調函數
}

export function SearchBar({
  data: initialData,
  onSearch, // 新增: 接收 onSearch prop
}: SearchBarProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [data] = React.useState(() => initialData);

  const nameOptions = Array.from(new Set(data.flatMap((cafe) => cafe.name)));

  // 新增: 處理搜尋變更
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setOpen(value.trim() !== "");
    onSearch(value); // 新增: 觸發上層的搜尋回調
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center w-full">
        <Input
          ref={inputRef}
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search café..."
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "pl-9 w-full"
          )}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
          <Command>
            <CommandEmpty>Cannot find any result.</CommandEmpty>
            <CommandList>
              {nameOptions
                .filter((name) =>
                  name.toLowerCase().includes(search.toLowerCase())
                )
                .map((name) => (
                  <CommandItem
                    key={name}
                    onSelect={() => {
                      setSearch(name);
                      setOpen(false);
                      onSearch(name); // 新增: 選擇項目時觸發搜尋
                    }}
                    className="h-9 cursor-pointer"
                  >
                    {name}
                  </CommandItem>
                ))}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}