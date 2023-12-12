import MaxWidthWrapper from "@/components/MaxwidthWrapper";
import WelcomeCard from "@/components/WelcomeCard";

export default function AllDocuments() {
  return (
        <MaxWidthWrapper className='border-l border-2 px-4 pt-4 overflow-x-scroll lg:px-24 lg:pt-12'>
          <WelcomeCard />
        </MaxWidthWrapper>
  )
}
