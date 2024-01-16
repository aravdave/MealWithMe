import { Availability } from "@/components/availability";
import { PageHeader } from "@/components/pageHeader";

export default function Page() {
  return (
    <PageHeader heading="Status" text="See when your friends are having dinner and share your plans with them.">
      <Availability />
    </PageHeader>
  );
}
