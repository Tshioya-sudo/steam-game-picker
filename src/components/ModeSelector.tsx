'use client';

import { Card } from '@/components/ui';
import { PickMode, PICK_MODE_OPTIONS } from '@/types';

interface ModeSelectorProps {
  selectedMode: PickMode;
  onSelect: (mode: PickMode) => void;
  backlogCount?: number;
  totalCount?: number;
}

export function ModeSelector({
  selectedMode,
  onSelect,
  backlogCount,
  totalCount,
}: ModeSelectorProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-steam-text-light">
        モードを選択
      </h2>

      <div className="grid gap-3">
        {PICK_MODE_OPTIONS.map((option) => {
          const isSelected = selectedMode === option.id;
          const count =
            option.id === 'backlog'
              ? backlogCount
              : option.id === 'daily'
              ? totalCount
              : undefined;

          return (
            <Card
              key={option.id}
              variant={isSelected ? 'selected' : 'hover'}
              onClick={() => onSelect(option.id)}
              className="flex items-center gap-4"
            >
              <span className="text-3xl">{option.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-steam-text-light">
                    {option.labelJa}
                  </h3>
                  {count !== undefined && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-steam-blue/20 text-steam-blue">
                      {count}本
                    </span>
                  )}
                </div>
                <p className="text-sm text-steam-text/70 mt-0.5">
                  {option.description}
                </p>
              </div>
              {isSelected && (
                <span className="text-steam-blue text-xl">✓</span>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
