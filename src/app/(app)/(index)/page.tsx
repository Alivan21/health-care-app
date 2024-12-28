import { PageHeader } from "@/components/layouts/header";
import MainContainer from "@/components/layouts/main-container";

const breadcrumbs = [{ title: "Dashboard", link: "/dashboard" }];

export default function Home() {
  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} />
      <MainContainer>
        <h1>Hello World</h1>
      </MainContainer>
    </>
  );
}
