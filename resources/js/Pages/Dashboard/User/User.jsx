import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { BreadcrumbComponent } from "@/Components/ui/custom/breadcrumb";
import { UserClient } from "@/Components/tables/user-tables/client";

export default function User(props) {
  return (
    <AuthenticatedLayout user={props.auth.user}>
      <Head title="User Page" />

      <div className="flex-1 space-y-6  p-4 pt-6 md:p-8">
        <BreadcrumbComponent />
        <UserClient data={props.users} />
      </div>
    </AuthenticatedLayout>
  );
}
