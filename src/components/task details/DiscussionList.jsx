import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import icons from "@/constants/icons";

const DiscussionList = () => {
  const discussions = Array(7).fill({
    title: "Is it accessible?",
    description: "Yes. It adheres to the WAI-ARIA design pattern.",
    dateOfDiscussion: "01 June 2025",
    discussWith: [
      "https://i.pravatar.cc/150?img=joy",
      "https://i.pravatar.cc/150?img=moy",
      "https://i.pravatar.cc/150?img=zoy",
      "https://i.pravatar.cc/150?img=goy",
      "https://i.pravatar.cc/150?img=roy",
    ],
  });

  return (
    <Accordion type="single" collapsible className="w-full">
      {discussions.map((discussion, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger
            className="text-[#004368] text-sm font-semibold  "
            style={{
              backgroundColor: "transparent",
              outline: "none",
              border: "none",
            }}
          >
            {discussion.title}
          </AccordionTrigger>
          <AccordionContent className="text-sm  pl-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4 text-[#004368]">
                <img src={icons.Event} alt="event icon" className="w-5 h-5" />
                <p>Date of discussion : {discussion.dateOfDiscussion} </p>
              </div>
              <div>
                <h4 className="font-[500]">Details</h4>
                <p className="text-[0.6vw] pt-2 ">{discussion.description} </p>
              </div>
              <div>
                <p className="font-[500]">Discussion Attachments</p>
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex items-center gap-2 border rounded-[4px] border-[#6a8b92] px-2 py-1">
                    <img
                      src={icons.FilePin}
                      alt="attachment icon"
                      className="w-5 h-5"
                    />
                    <span>Discussion Files</span>
                  </div>
                  <div className="flex items-center gap-2 border border-[#4e828d] rounded-[4px] px-2 py-1">
                    <img
                      src={icons.Img}
                      alt="attachment icon"
                      className="w-5 h-5"
                    />
                    <span>Discussion Picture</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-[500] mb-2 ">Discuss With</p>
                <div className="flex -space-x-3">
                  {discussion.discussWith.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`user-${index}`}
                      className="w-9 h-9 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default DiscussionList;
