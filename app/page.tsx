"use client";

import AddNoteModal from "@/components/AddNoteModal";
import Header from "@/components/Header";
import NoteCard from "@/components/NoteCard";
import NotesFilter from "@/components/NotesFile";
import { Input } from "@/shared/ui/input";
import { INote } from "@/types/note";
import { Search } from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [showAddNoteModal, SetShowAddNoteModal] = useState(false);
  const [Notes, SetNotes] = useState<INote[]>([]);
  const [Edit, setEdit] = useState<INote | null>(null);
  const [SearchText, setSearchText] = useState("");
  const [CategoryFilter, SetCategoryFilter] = useState("all");
  const [CompletionFilter, SetCompletionFilter] = useState("all");

  const filteredNotes = useMemo(() => {
    let allNotes = Notes;
    const SearchQuery = SearchText.trim().toLowerCase();

    if (SearchQuery) {
      allNotes = allNotes.filter((note) => {
        return (
          note.title.toLowerCase().includes(SearchQuery) ||
          note.description.toLowerCase().includes(SearchQuery)
        );
      });
    }

    if (CategoryFilter !== "all") {
      allNotes = allNotes.filter(({ category }) => category === CategoryFilter);
    }

    if (CompletionFilter !== "all") {
      const completeStatus = CompletionFilter === "complete";
      allNotes = allNotes.filter(
        ({ iscomplete }) => iscomplete === completeStatus
      );
    }

    return allNotes;
  }, [Notes, SearchText, CategoryFilter, CompletionFilter]);

  const HandleAddNote = (FormData: INote) => {
    if (Edit) {
      SetNotes((prev) =>
        prev.map((note) => (note.id === Edit.id ? FormData : note))
      );
    } else {
      SetNotes((prev) => [{ ...FormData, id: nanoid() }, ...prev]);
    }

    SetShowAddNoteModal(false);
    setEdit(null);
  };

  const ontoggleComplete = (noteId: string) => {
    SetNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, iscomplete: !note.iscomplete } : note
      )
    );
  };

  const handleEdit = (note: INote) => {
    setEdit(note);
    SetShowAddNoteModal(true);
  };

  const handleDelete = (noteId: string) => {
    SetNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      SetNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(Notes));
  }, [Notes]);

  return (
    <>
      <Header
        SetShowAddNoteModal={SetShowAddNoteModal}
        totallength={Notes.length}
      />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <section className="mb-6 flex flex-col items-start gap-2">
          <div className="relative w-full max-w-300px">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search notes..."
              value={SearchText}
              onChange={onChange}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-black"
            />
          </div>

          <div className="w-full max-w-300px">
            <NotesFilter
              CategoryFilter={CategoryFilter}
              SetCategoryFilter={SetCategoryFilter}
              CompletionFilter={CompletionFilter}
              SetCompletionFilter={SetCompletionFilter}
            />
          </div>
        </section>

        <section>
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  ontoggleComplete={ontoggleComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-220px items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white">
              <p className="text-sm text-gray-400">No notes found.</p>
            </div>
          )}
        </section>
      </main>

      {showAddNoteModal && (
        <AddNoteModal
          showAddNoteModal={showAddNoteModal}
          SetShowAddNoteModal={SetShowAddNoteModal}
          HandleAddNote={HandleAddNote}
          Editingnote={Edit}
          setEdit={setEdit}
        />
      )}
    </>
  );
}

