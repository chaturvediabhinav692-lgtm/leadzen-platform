'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Save } from 'lucide-react';

interface NotesSectionProps {
    clientId: string;
    initialNotes: string;
}

export default function NotesSection({ clientId, initialNotes }: NotesSectionProps) {
    const { addNote } = useStore();
    const [notes, setNotes] = useState(initialNotes);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        addNote(clientId, notes);
        // Simulate slight delay for feedback
        setTimeout(() => setIsSaving(false), 500);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-800">Notes</h3>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    <Save size={16} />
                    {isSaving ? 'Saving...' : 'Save Notes'}
                </button>
            </div>

            <textarea
                className="w-full h-40 p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-slate-700 bg-slate-50"
                placeholder="Add notes about the client here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
        </div>
    );
}
