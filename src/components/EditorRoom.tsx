import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/save.min.js";
import React, { type Dispatch, type SetStateAction, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import PaymentModalAlert from "./PaymentModalAlert";
import SaveDocButton from "./serverButtons/saveDocButton";
import { useMutation, useMyPresence, useOthers, useStorage } from "liveblocks.config";
import { Cursor } from "./Cursor";
import { api } from "@/trpc/react";
import { saveDocAction } from "@/lib/actions/saveEditAction";

interface EditorRoomProps {
  docId: string;
  htmlString:string | null;
  pageTitle:string;
  awaitedSub: {
    status: boolean;
    data: {
      subscriptions: Array<{ status: string }>;
    };
  };
}

export default function EditorRoom({
  awaitedSub,
  htmlString,
  pageTitle,
  docId,
}: EditorRoomProps) {
  const [showpaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [myPresence, updateMyPresence] = useMyPresence();
  const person = useStorage((root) => root.author);
  console.log({person});
  

  const others = useOthers();
  const {data:htmlText} = api.document.getHtmlText.useQuery({documentId:docId})

  const [model, setModel] = useState(() => {
    console.log(docId),'docd';
    const saVedHtmlString = localStorage.getItem(`savedHtml-${docId}`)
    console.log('savvd', saVedHtmlString);
    // if(person) {
    //   return person.documentText
    // }
    if(htmlString){
      return htmlString
    }
    
    if(saVedHtmlString !== '' || !null) {
      return localStorage.getItem(`savedHtml-${docId}`)
      
    }
    return htmlText?.success ? htmlText.htmlText : 'err'
  })

  const parser = new DOMParser()
  const doc = parser.parseFromString(model!, 'text/html');
  const textContent = doc.body.textContent?.replaceAll('Powered by Froala Editor','');
  const saveDocWithProperties = saveDocAction.bind(null, {documentId:docId, documentTitle:pageTitle, documentDescription:textContent!.substring(0, 200),html:person.documentText})


  function handlePointerMove(e: React.MouseEvent) {
    const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    updateMyPresence({ cursor, isTyping: null });
  }
  // Set cursor to null on pointer leave
  function handlePointerLeave(e: React.MouseEvent) {
    updateMyPresence({ cursor: null, isTyping: null });
  }
  const updateName = useMutation(({ storage }, newString:string) => {
    const person = storage.get("author");
    person.set("documentText", newString);
  }, []);
  console.log(myPresence.cursor);

  return (
    <>
      <form
        id="editor"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        action={saveDocWithProperties}
        className="relative mt-12 h-full w-full"
      >
        <FroalaEditor
          tag="textarea"
          model={person.documentText ?? ''}
          onModelChange={(e: string) => {
            // setModel(e);
            updateName(e)
          }}
          config={{
            saveInterval: 2000,
            placeholderText: "start writing your document...",
            fontSizeSelection: true,
            // documentReady: true,
            heightMin: 300,
            charCounterMax:
              awaitedSub.data.subscriptions.length > 0
                ? awaitedSub?.data?.subscriptions[0]!.status === "active"
                  ? 1000
                  : 50
                : 50,

            events: {
              "save.before": function (html: string) {
                localStorage.setItem(`savedHtml-${docId}`, html);
              },
              "charCounter.exceeded": function () {
                // Do something here.
                // this is the editor instance.
                setShowPaymentModal(true);
              },
            },
          }}
        />

        <SaveDocButton />
      </form>
      <PaymentModalAlert
        isOpenPayment={showpaymentModal}
        setIsOpenPayment={setShowPaymentModal}
      />
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence }) => (
          <Cursor
            key={connectionId}
            x={presence.cursor!.x}
            y={presence.cursor!.y}
          />
        ))}
    </>
  );
}
