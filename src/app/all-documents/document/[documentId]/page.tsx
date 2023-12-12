import Editor from "@/components/Editor";
import MaxWidthWrapper from "@/components/MaxwidthWrapper";
import SingleDocument from "@/components/SingleDocumnet";
import WelcomeCard from "@/components/WelcomeCard";

export default function Document({params}:{params:{documentId:string}}) {
  return (
        <MaxWidthWrapper className='border-l border-2 px-4 pt-4 overflow-x-scroll lg:px-24 lg:pt-12'>
          <SingleDocument documentId={params.documentId} />
          <Editor />
        </MaxWidthWrapper>
  )
}
