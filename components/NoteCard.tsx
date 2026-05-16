import { CATEGORIES } from "@/constant";
import { INote } from "@/types/note";
import { clsx } from "clsx";
import { Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@/shared/ui/checkbox";

const NoteCard = ({
  note,
  ontoggleComplete,
  handleEdit,
  handleDelete,
}: {
  note: INote;
  ontoggleComplete: (noteId: string) => void;
  handleEdit: (note: INote) => void;
  handleDelete: (noteId: string) => void;
}) => {
  const categoryobj = CATEGORIES.find((item) => item.value === note.category);

  return (
    <div
      className="group flex flex-col rounded-lg fade-in shadow-sm border
      border-athens-gray bg-white p-5 mt-4 gap-3"
    >
      {/* Header: Fixed with justify-between */}
      <div className="flex items-center justify-between">
        <span className="text-3xl">{note.icon}</span>
        <div className="flex gap-1">
          <button
            className="h-8 w-8 text-pale-sky cursor-pointer hover:text-black-pearl
            hover:bg-athens-gray font-medium rounded-md flex items-center justify-center
            text-sm"
            onClick={() => handleEdit(note)} // Changed from note.id to note
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            className="h-8 w-8 text-pale-sky cursor-pointer hover:text-flamingo
            hover:bg-athens-gray font-medium rounded-md flex items-center justify-center
            text-sm"
            onClick={() => handleDelete(note.id)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3
          className={clsx(
            "font-semibold text-lg line-clamp-2 text-black-pearl",
            note.iscomplete && "text-pale-sky line-through"
          )}
        >
          {note.title}
        </h3>
        <p className="text-sm line-clamp-3 text-pale-sky ">
          {note.description}
        </p>
      </div>

      {/* Footer: Added flex and fixed spacing */}
      <div className="border-t border-athens-gray pt-3 flex items-center justify-between">
        <span
          className={`text-xs font-medium text-white ${categoryobj?.color} px-2.5 py-0.5 rounded-full`}
        >
          {categoryobj?.label}
        </span>

        <div className="flex items-center gap-2">
          <Checkbox
            id={note.id}
            checked={note.iscomplete}
            className="cursor-pointer data-[state=checked]:bg-salem 
            data-[state=checked]:border-salem"
            onCheckedChange={() => ontoggleComplete(note.id)}
          />
          <label
            htmlFor={note.id}
            className="text-xs cursor-pointer text-pale-sky"
          >
            {note.iscomplete ? "Done" : "Mark Done"}
          </label>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;