import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export type PageBreadcrumbProps = {
  title: string;
  link: string;
};

export function PageBreadcrumbs({ items }: { items: PageBreadcrumbProps[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={item.title}>
            {index !== items.length - 1 ? (
              <BreadcrumbItem>
                <Link className="font-medium" href={item.link}>
                  {item.title}
                </Link>
              </BreadcrumbItem>
            ) : null}
            {index < items.length - 1 ? (
              <BreadcrumbSeparator>
                <ChevronRight className="!h-9 !w-5" />
              </BreadcrumbSeparator>
            ) : null}
            {index === items.length - 1 ? (
              <BreadcrumbPage className="font-medium text-primary">{item.title}</BreadcrumbPage>
            ) : null}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
