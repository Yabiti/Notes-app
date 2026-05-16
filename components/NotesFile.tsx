import { CATEGORIES, COMPLETION_FILTER } from "@/constant";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"

interface INotesFilterProps {
    CategoryFilter: string,
    SetCategoryFilter: (value: string) => void;
    CompletionFilter: string,
    SetCompletionFilter: (value: string) => void;
}
const NotesFilter = ({
    CategoryFilter,
    SetCategoryFilter,
    CompletionFilter,
    SetCompletionFilter

}: INotesFilterProps) => {
    return (
        <div className="mt-4 flex gap-4">
            <Select value={CategoryFilter}
                onValueChange={(value) => SetCategoryFilter(value)}>
                <SelectTrigger className="cursor-pointer bg-albasater">
                    <SelectValue>

                    </SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="all" className="cursor-pointer">
                        All Categories
                    </SelectItem>
                    {CATEGORIES.map((category) => (
                        <SelectItem
                            key={category.value} value={category.value}>
                            <span className="flex items-center gap-2">
                                <span className={`h-1.5 w-1.5 rounded-full ${category.color}`} />
                                {category.label}
                            </span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={CompletionFilter} 
            onValueChange={(value) => SetCompletionFilter(value)}>
            <SelectTrigger className="cursor-pointer bg-albasater">
                <SelectValue>
                </SelectValue>
                <SelectContent position="popper">
                    {COMPLETION_FILTER.map((completion) => (
                        <SelectItem key={completion.value}
                        value={completion.value}
                        className="cursor-pointer">
                            {completion.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectTrigger>
            </Select>
        </div>
    )
}

export default NotesFilter;