import { Plus, StickyNote } from "lucide-react";

const Header = (
    {
        SetShowAddNoteModal,
        totallength
    }:
    {
        SetShowAddNoteModal: (open: boolean) => void;
        totallength: number 
    }) => {
    return (
        <header className="sticky top-0 z-10 w-full border-b border-athens-gray bg-white/80 backdrop-blur-md">
            {/* max-w-6xl and m-auto ensures the header content stays centered and aligned with your main grid */}
            <div className="max-w-6xl m-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                
                {/* Branding Section */}
                <div className="flex items-center gap-4">
                    <div className="bg-cornflower-blue w-11 h-11 flex justify-center items-center rounded-xl shadow-sm">
                        <StickyNote className="text-white w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl text-slate-900 leading-none">Notes</h1>
                        <p className="text-pale-sky text-sm mt-1">
                            {totallength} {totallength === 1 ? "Note" : "Notes"}
                        </p>
                    </div>
                </div>

                {/* Action Section */}
                <button 
                    className="flex items-center justify-center gap-2 
                               bg-cornflower-blue hover:bg-opacity-90 text-white 
                               shadow-sm font-semibold text-sm rounded-lg 
                               cursor-pointer px-5 py-2.5 transition-all
                               active:scale-95 focus:outline-none focus:ring-2 focus:ring-cornflower-blue/40"
                    onClick={() => SetShowAddNoteModal(true)}>
                    <Plus className="h-4 w-4 stroke-[3px]" />
                    Add Note
                </button>

            </div>
        </header>
    );
};

export default Header;