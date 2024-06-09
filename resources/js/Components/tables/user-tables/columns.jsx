import { CellAction } from "./cell-action";

export const columns = [
  {
    id: "row",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "username",
    header: "NAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "role",
    header: "ROLE",
    cell: ({ row }) => {
      const role = row.getValue("role");
      let className = "text-sl";
      if (role === "guru") {
        className += " text-green-700";
      } else if (role === "siswa") {
        className += " text-yellow-700";
      } else {
        className += " text-sky-700";
      }

      return (
        <div className={className}>
          <span>{role}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "join_date",
    header: "JOIN",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
