import Link from "next/link";

interface PageHeaderProps {
  title: string;
  backHref?: string;
  showSearch?: boolean;
}

export function PageHeader({ title, backHref = "/", showSearch = false }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href={backHref} passHref>
          <button className="p-1">
            <span>&larr;</span>
          </button>
        </Link>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      {showSearch && (
        <button className="p-1">
          <span>&#x1F50D;</span>
        </button>
      )}
    </header>
  );
}
