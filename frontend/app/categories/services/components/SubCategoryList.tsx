"use client"; // Mark this as a client component

import Link from "next/link";

const SubCategoryList = ({
  subcategories,
  categorySlug,
}: {
  subcategories: any[];
  categorySlug: string;
}) => {
  if (!subcategories || subcategories.length === 0)
    return <div>No subcategories available.</div>;

  return (
    <div className="flex flex-row space-x-6 justify-center z-50">
      {subcategories.map((subcategory) => (
        <Link
          href={`/categories/${categorySlug}/${subcategory.slug}`}
          className="bg-secondary hover:bg-box duration-150 border-2 border-border text-tbox font-medium p-1 px-4 rounded-full"
        >
          {subcategory.name}
        </Link>
      ))}
    </div>
  );
};

export default SubCategoryList;
