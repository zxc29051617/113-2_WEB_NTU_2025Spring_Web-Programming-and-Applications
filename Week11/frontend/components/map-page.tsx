"use client";

import React, { useState } from "react";
import {
  IconChevronDown,
  IconMoneybag,
  IconLayoutColumns,
  IconInfoCircle,
} from "@tabler/icons-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Maps from "@/components/maps";
import { SearchBar } from "@/components/search-bar";
import { ChatBot } from "@/components/chat-bot";

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

export function MapPage({
  data: initialData,
}: {
  data: z.infer<typeof schema>[];
}) {
  const [data] = React.useState(() => initialData);

  const paymentMethodOptions = Array.from(
    new Set(data.flatMap((cafe) => cafe.paymentMethods))
  );
  const [selectedPayments, setPayments] = useState<string[]>([]);

  const facilityOptions = Array.from(
    new Set(data.flatMap((cafe) => cafe.facilities))
  );
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const policiesOptions = Array.from(
    new Set(data.flatMap((cafe) => cafe.policies))
  );
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <SearchBar data={data} />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="cursor-pointer">
                <IconMoneybag />
                <span className="hidden lg:inline">Payments</span>
                <span className="lg:hidden">Payments</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {paymentMethodOptions.map((method) => (
                <DropdownMenuCheckboxItem
                  key={method}
                  checked={selectedPayments.includes(method)}
                  onCheckedChange={(checked) => {
                    setPayments((prev) =>
                      checked
                        ? [...prev, method]
                        : prev.filter((m) => m !== method)
                    );
                  }}
                  className="capitalize cursor-pointer"
                >
                  {method}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="cursor-pointer">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Facilities</span>
                <span className="lg:hidden">Facilities</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {facilityOptions.map((method) => (
                <DropdownMenuCheckboxItem
                  key={method}
                  checked={selectedFacilities.includes(method)}
                  onCheckedChange={(checked) => {
                    setSelectedFacilities((prev) =>
                      checked
                        ? [...prev, method]
                        : prev.filter((m) => m !== method)
                    );
                  }}
                  className="capitalize cursor-pointer"
                >
                  {method}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="cursor-pointer">
                <IconInfoCircle />
                <span className="hidden lg:inline">Policies</span>
                <span className="lg:hidden">Policies</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {policiesOptions.map((method) => (
                <DropdownMenuCheckboxItem
                  key={method}
                  checked={selectedPolicies.includes(method)}
                  onCheckedChange={(checked) => {
                    setSelectedPolicies((prev) =>
                      checked
                        ? [...prev, method]
                        : prev.filter((m) => m !== method)
                    );
                  }}
                  className="capitalize cursor-pointer"
                >
                  {method}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="cursor-pointer">
            Clear
          </Button>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="rounded-lg overflow-hidden">
          <Maps />
        </div>
        <div className="fixed bottom-4 right-[40px] z-50">
          <ChatBot />
        </div>
      </TabsContent>
    </Tabs>
  );
}
