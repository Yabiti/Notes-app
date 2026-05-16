import { CATEGORIES, DEFAULT_EMOJIS } from "@/constant";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { INote } from "@/types/note";
import clsx from "clsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useState } from "react";
import { Switch } from "@/shared/ui/switch";

const AddNoteModal = ({
    showAddNoteModal,
    SetShowAddNoteModal,
    HandleAddNote,
    Editingnote,
    setEdit

}: {
    showAddNoteModal: boolean;
    SetShowAddNoteModal: (open: boolean) => void;
    HandleAddNote: (note: INote) => void;   
    Editingnote: INote | null;
    setEdit: (note: INote | null) => void;
}) => {
    const [FormData, SetFormData] = useState<INote>(
        Editingnote ? 
        Editingnote 
        : {
        icon: "🎨",
        title: "",
        description: "",
        category: "Work",
        iscomplete: false,
        id: ""
    }
);

    const dialogTitle = Editingnote ? "Edit Note" : "Add Note";
    const dialogbtnTitle = Editingnote ? "Update Note" : "Add Note";
    const onOPenchange = () => {
        SetShowAddNoteModal(false);
        setEdit(null);
    };

    const onChange = (key: string, value: string | boolean) => {
        SetFormData((prev) => ({ ...prev, [key]: value }))
    };

    const AddNoteClick = () => {
        HandleAddNote(FormData)
    };

    const onCacelBtnClick = () => {
        SetShowAddNoteModal(false); 
        setEdit(null)
    }

    return (
        <Dialog open={showAddNoteModal} onOpenChange={onOPenchange}>
            <DialogContent className="max-w-380px p-5 rounded-[2rem] gap-0">
                <DialogHeader className="mb-3">
                    <DialogTitle className="text-left text-sm font-bold">
                        {dialogTitle}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-3.5">
                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-[11px] flex items-center gap-0.5">
                            Icon <span className="text-destructive text-xs">*</span>
                        </label>
                        <div className="flex flex-wrap gap-1">
                            {DEFAULT_EMOJIS.map((emoji, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={clsx(
                                        "cursor-pointer text-base p-1 rounded-lg transition-all",
                                        FormData.icon === emoji 
                                            ? "bg-cornflower-blue/10 ring-1 ring-cornflower-blue" 
                                            : "hover:bg-athens-gray"
                                    )}
                                    onClick={() => onChange("icon", emoji)}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-[11px] flex items-center gap-0.5">
                            Title <span className="text-destructive text-xs">*</span>
                        </label>
                        <Input
                            className="bg-alabaster border-none h-8 rounded-lg text-xs"
                            placeholder="title"
                            value={FormData.title ?? ""}
                            onChange={(e) => onChange("title", e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-[11px] flex items-center gap-0.5">
                            Description <span className="text-destructive text-xs">*</span>
                        </label>
                        <Textarea
                            className="bg-alabaster border-none resize-none min-h-16 rounded-lg text-xs"
                            placeholder="description"
                            value={FormData.description ?? ""}
                            onChange={(e) => onChange("description", e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-[11px] flex items-center gap-0.5">
                            Category <span className="text-destructive text-xs">*</span>
                        </label>
                        <Select
                            value={FormData.category}
                            onValueChange={(value) => onChange("category", value)}
                        >
                            <SelectTrigger className="bg-alabaster border-none h-8 rounded-lg text-xs cursor-pointer">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {CATEGORIES.map((category) => (
                                    <SelectItem
                                        key={category.value}
                                        value={category.value}
                                        className="cursor-pointer text-xs"
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className={`h-1.5 w-1.5 rounded-full ${category.color}`} />
                                            {category.label}
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="font-bold text-[11px] flex items-center gap-0.5">
                            Mark as complete <span className="text-destructive text-xs">*</span>
                        </label>
                        <Switch
                            checked={FormData.iscomplete}
                            onCheckedChange={(value) => onChange("iscomplete", value)}
                            className="cursor-pointer scale-[0.7] origin-right"
                        />
                    </div>
                </div>

                <DialogFooter className="mt-6 flex flex-row items-center justify-end gap-2">
                    <button
                        className="cursor-pointer text-[12px] border border-athens-gray rounded-lg font-bold px-3 
                        py-1.5 hover:opacity-70 transition-opacity"
                        onClick={onCacelBtnClick}
                    >
                        Cancel
                    </button>
                    <button
                        className="cursor-pointer bg-cornflower-blue text-white text-[12px] font-bold
                        px-4 py-1.5 rounded-xl shadow-sm"
                        onClick={AddNoteClick}
                    >
                        {dialogbtnTitle}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddNoteModal;
