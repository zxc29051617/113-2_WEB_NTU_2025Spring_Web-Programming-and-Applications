"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  MapPin,
  Phone,
  Clock,
  Wifi,
  Plug,
  PawPrint,
  Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StoreDialog, CafeData } from "@/components/store-dialog";
import { Badge } from "@/components/ui/badge";
import data from "../app/data.json";

export type Cafe = {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
  policies: string[];
  paymentMethods: string[];
  facilities: string[];
  imageUrl: string;
};

interface ColumnDefinitionHandlerProps {
  handleOpenDialog: (cafe: Cafe) => void;
}

export function ColumnDefinitionHandler({
  handleOpenDialog,
}: ColumnDefinitionHandlerProps): ColumnDef<Cafe>[] {
  const columns: ColumnDef<Cafe>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="選擇全部"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="選擇行"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            咖啡廳名稱
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const cafe = row.original;
        return (
          <button
            className="border-b border-gray-400 hover:opacity-80 cursor-pointer"
            onClick={() => handleOpenDialog(cafe)}
          >
            {row.getValue("name")}
          </button>
        );
      },
    },
    {
      accessorKey: "address",
      header: "地址",
      cell: ({ row }) => (
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("address")}</span>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "電話",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("phone")}</span>
        </div>
      ),
    },
    {
      accessorKey: "hours",
      header: "營業時間",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{row.getValue("hours")}</span>
        </div>
      ),
    },
    {
      accessorKey: "facilities",
      header: "設施",
      cell: ({ row }) => {
        const facilities: string[] = row.getValue("facilities");
        return (
          <div className="flex flex-wrap gap-1">
            {facilities.map((facility) => {
              let icon = null;
              let displayText = facility;

              switch (facility) {
                case "Wi-Fi":
                  icon = <Wifi className="h-3 w-3 mr-1" />;
                  break;
                case "Socket":
                  icon = <Plug className="h-3 w-3 mr-1" />;
                  displayText = "插座";
                  break;
                case "Toilets":
                  icon = <span className="text-xs mr-1">🚻</span>;
                  displayText = "洗手間";
                  break;
                default:
                  icon = null;
              }
              return (
                <Badge key={facility} variant="outline" className="text-xs">
                  {icon}
                  {displayText}
                </Badge>
              );
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "policies",
      header: "政策",
      cell: ({ row }) => {
        const policies: string[] = row.getValue("policies");
        return (
          <div className="flex flex-wrap gap-1">
            {policies.map((policy) => {
              let icon = null;
              let displayText = policy;

              switch (policy) {
                case "Pet Friendly":
                  icon = <PawPrint className="h-3 w-3 mr-1" />;
                  displayText = "寵物友善";
                  break;
                case "LGBTQ+ friendly":
                  icon = <Heart className="h-3 w-3 mr-1" />;
                  displayText = "LGBTQ+友善";
                  break;
                default:
                  icon = null;
              }
              return (
                <Badge key={policy} variant="outline" className="text-xs">
                  {icon}
                  {displayText}
                </Badge>
              );
            })}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const cafe = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">打開選單</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>操作</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${cafe.lat},${cafe.lng}`,
                    "_blank"
                  )
                }
              >
                查看地圖
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(cafe.phone)}
              >
                複製電話號碼
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                從收藏移除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return columns;
}

export function Favorites() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [selectedCafe, setSelectedCafe] = React.useState<CafeData | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleOpenDialog = (cafe: CafeData) => {
    setSelectedCafe(cafe);
    setDialogOpen(true);
  };

  const columns = ColumnDefinitionHandler({
    handleOpenDialog,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="w-full p-4">
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="搜尋咖啡廳名稱..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  顯示欄位 <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id === "name" && "名稱"}
                        {column.id === "address" && "地址"}
                        {column.id === "phone" && "電話"}
                        {column.id === "hours" && "營業時間"}
                        {column.id === "facilities" && "設施"}
                        {column.id === "policies" && "政策"}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="destructive"
              disabled={!Object.keys(rowSelection).length}
              onClick={() => {
                console.log("移除選中的咖啡廳:", Object.keys(rowSelection));
                setRowSelection({});
              }}
            >
              移除選中項目
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    沒有收藏的咖啡廳
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            已選中 {table.getFilteredSelectedRowModel().rows.length}{" "}
            間咖啡廳，共 {table.getFilteredRowModel().rows.length} 間
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              上一頁
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              下一頁
            </Button>
          </div>
        </div>
      </div>
      {selectedCafe && (
        <StoreDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          cafe={selectedCafe}
        />
      )}
    </>
  );
}
