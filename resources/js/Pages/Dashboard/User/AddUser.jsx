import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { BreadcrumbComponent } from "@/Components/ui/custom/breadcrumb";
import { UserClient } from "@/Components/tables/user-tables/client";
import { UserForm } from "@/Components/form/add-user";

export default function AddUser(props) {
  return (
    <AuthenticatedLayout user={props.auth.user}>
      <Head title="User Page" />

      <div className="flex-1 space-y-6  p-4 pt-6 md:p-8">
        <BreadcrumbComponent />
        <div className="flex-1 space-y-6 p-6 md:p-10">
          <UserForm />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}