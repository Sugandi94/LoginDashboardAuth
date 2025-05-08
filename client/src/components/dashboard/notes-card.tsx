import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const initialNotes = [
  {
    id: 1,
    title: "Team Meeting",
    content: "Tomorrow at 10:00 AM - Discuss project timeline and milestones.",
    color: "yellow",
  },
  {
    id: 2,
    title: "Dashboard Updates",
    content: "Add activity graph and user analytics section to main dashboard.",
    color: "blue",
  },
];

export default function NotesCard() {
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState("");
  
  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const note = {
      id: Date.now(),
      title: "New Note",
      content: newNote,
      color: "yellow",
    };
    
    setNotes([...notes, note]);
    setNewNote("");
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Quick Notes</h3>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <i className="fas fa-plus"></i>
        </button>
      </div>
      
      <div className="space-y-4">
        {notes.map((note) => (
          <div 
            key={note.id}
            className={`p-4 rounded-lg bg-${note.color}-50 border-l-4 border-${note.color}-400`}
          >
            <h4 className="font-medium text-gray-800 mb-1">{note.title}</h4>
            <p className="text-sm text-gray-600">{note.content}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <Textarea 
          placeholder="Write a new note..." 
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none"
        />
        <div className="flex justify-end mt-2">
          <Button 
            onClick={handleAddNote}
            className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Save Note
          </Button>
        </div>
      </div>
    </div>
  );
}
