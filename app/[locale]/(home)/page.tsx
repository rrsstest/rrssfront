import { metadataHome } from "./meta";
import { HomeBody, HomeLayout } from "@/components";

export const metadata = metadataHome;

export default function Page() {
  return (
    <HomeLayout>
      <HomeBody />
    </HomeLayout>
  );
}
