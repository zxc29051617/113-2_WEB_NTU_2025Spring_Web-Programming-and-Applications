import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, HeartOff } from "lucide-react";
import { useState } from "react";

export interface CafeData {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  hours?: string;
  lat?: number;
  lng?: number;
  policies?: string[];
  paymentMethods?: string[];
  facilities?: string[];
  imageUrl?: string;
}

interface StoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cafe: CafeData;
}

export const StoreDialog: React.FC<StoreDialogProps> = ({
  open,
  onOpenChange,
  cafe,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {/* <Button variant="outline"></Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{cafe.name ? cafe.name : ""}</DialogTitle>
          <DialogDescription>以下為咖啡廳的詳細資訊</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">地址</Label>
            <Input value={cafe.address} readOnly className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">電話</Label>
            <Input value={cafe.phone} readOnly className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">營業時間</Label>
            <Input value={cafe.hours} readOnly className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">政策</Label>
            <Input
              value={cafe.policies ? cafe.policies.join(", ") : ""}
              readOnly
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">付款方式</Label>
            <Input
              value={cafe.paymentMethods ? cafe.paymentMethods.join(", ") : ""}
              readOnly
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">設施</Label>
            <Input
              value={cafe.facilities ? cafe.facilities.join(", ") : ""}
              readOnly
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">經緯度</Label>
            <Input
              value={`${cafe.lat}, ${cafe.lng}`}
              readOnly
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={toggleFavorite}
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            aria-label="Toggle Favorite"
          >
            {isFavorite ? (
              <Heart className="text-red-500 fill-red-500" />
            ) : (
              <HeartOff />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
