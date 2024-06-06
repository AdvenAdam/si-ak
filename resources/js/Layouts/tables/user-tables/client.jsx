"use client";
import { Button } from "@/Components/ui/button";
import { DataTable } from "@/Components/ui/custom/data-table";
import { Separator } from "@/Components/ui/separator";
import { Plus } from "lucide-react";
import { router } from "@inertiajs/react";
import { columns } from "./columns";
import { Heading } from "@/Components/ui/custom/heading";

export const UserClient = ({ data }) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.get(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="name"
        columns={columns}
        data={data}
      />
    </>
  );
};
