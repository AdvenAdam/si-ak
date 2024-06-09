import { UserForm } from "@/Components/form/add-user";
import { BreadcrumbComponent } from "@/Components/ui/custom/breadcrumb";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Update = (props) => {
  console.log("🚀 ~ Update ~ props:", props);
  return (
    <Authenticated user={props.auth.user}>
      <Head title="Update User Page" />
      <div className="flex-1 space-y-6  p-4 pt-6 md:p-8">
        <BreadcrumbComponent />
        <div className="flex-1 space-y-6 p-6 md:p-10">
          <UserForm />
        </div>
      </div>
    </Authenticated>
  );
};
export default Update;
