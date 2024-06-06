import { useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

export function BreadcrumbComponent() {
  const pathnames = useMemo(() => window.location.pathname.split("/").filter(Boolean), []);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((pathname, index) => (
          <>
            <BreadcrumbItem key={pathname}>
              {index === pathnames.length - 1 ? (
                <BreadcrumbPage>{pathname}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={`/${pathnames.slice(0, index + 1).join("/")}`}>{pathname}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== pathnames.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
