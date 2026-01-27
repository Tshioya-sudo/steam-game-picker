'use client';

import { Card } from '@/components/ui';
import { MoodCategory, MOOD_OPTIONS } from '@/types';

interface MoodFilterProps {
  selectedMood: MoodCategory | null;
  onSelect: (mood: MoodCategory | null) => void;
  moodCounts?: Record<MoodCategory, number>;
}

export function MoodFilter({ selectedMood, onSelect, moodCounts }: MoodFilterProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-steam-text-light">
        今の気分は？
      </h2>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {MOOD_OPTIONS.map((option) => {
          const isSelected = selectedMood === option.id;
          const count = moodCounts?.[option.id];

          return (
            <Card
              key={option.id}
              variant={isSelected ? 'selected' : 'hover'}
              onClick={() => onSelect(isSelected ? null : option.id)}
              className="p-3 text-center"
            >
              <span className="text-2xl block mb-1">{option.icon}</span>
              <h3 className="font-medium text-sm text-steam-text-light">
                {option.labelJa}
              </h3>
              {count !== undefined && count > 0 && (
                <span className="text-xs text-steam-text/60 mt-0.5 block">
                  {count}本
                </span>
              )}
            </Card>
          );
        })}
      </div>

      {selectedMood && (
        <p className="text-sm text-steam-text/70 text-center">
          {MOOD_OPTIONS.find((m) => m.id === selectedMood)?.description}
        </p>
      )}

      <p className="text-xs text-steam-text/50 text-center mt-2">
        ※ 全てのゲームが分類されているわけではありません（随時追加中）
      </p>
    </div>
  );
}
