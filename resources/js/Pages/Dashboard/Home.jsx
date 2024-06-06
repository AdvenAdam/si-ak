import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Home({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Home" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <p className="p-6 text-gray-900">You{`'`}re logged in!</p>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
