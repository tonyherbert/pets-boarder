import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { Settings } from 'lucide-react';

interface SettingsPopoverProps {
  setYDomain: (domain: [number, number]) => void;
  setLineColor: (color: string) => void;
  setShowPoints: (show: boolean) => void;
}

export function SettingsPopover({ setYDomain, setLineColor, setShowPoints }: SettingsPopoverProps) {
  const [minWeight, setMinWeight] = useState<number>(0);
  const [maxWeight, setMaxWeight] = useState<number>(100);
  const [lineColor, setLineColorInternal] = useState<string>('hsl(var(--chart-1))');
  const [showPoints, setShowPointsInternal] = useState<boolean>(false);

  useEffect(() => {
    const preferences = localStorage.getItem('chartPreferences');
    if (preferences) {
      const parsedPreferences = JSON.parse(preferences);
      if (parsedPreferences.yDomain) {
        setMinWeight(parsedPreferences.yDomain[0]);
        setMaxWeight(parsedPreferences.yDomain[1]);
        setYDomain(parsedPreferences.yDomain);
      }
      if (parsedPreferences.lineColor) {
        setLineColorInternal(parsedPreferences.lineColor);
        setLineColor(parsedPreferences.lineColor);
      }
      if (parsedPreferences.showPoints !== undefined) {
        setShowPointsInternal(parsedPreferences.showPoints);
        setShowPoints(parsedPreferences.showPoints);
      }
    }
  }, [setYDomain, setLineColor, setShowPoints]);

  const handleSliderChange = (values: number[], type: 'min' | 'max') => {
    if (type === 'min') {
      setMinWeight(values[0]);
      setYDomain([values[0], maxWeight]);
      localStorage.setItem(
        'chartPreferences',
        JSON.stringify({ yDomain: [values[0], maxWeight], lineColor, showPoints })
      );
    } else if (type === 'max') {
      setMaxWeight(values[0]);
      setYDomain([minWeight, values[0]]);
      localStorage.setItem(
        'chartPreferences',
        JSON.stringify({ yDomain: [minWeight, values[0]], lineColor, showPoints })
      );
    }
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setLineColorInternal(newColor);
    setLineColor(newColor);
    localStorage.setItem(
      'chartPreferences',
      JSON.stringify({ yDomain: [minWeight, maxWeight], lineColor: newColor, showPoints })
    );
  };

  const handleShowPointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const show = event.target.checked;
    setShowPointsInternal(show);
    setShowPoints(show);
    localStorage.setItem(
      'chartPreferences',
      JSON.stringify({ yDomain: [minWeight, maxWeight], lineColor, showPoints: show })
    );
  };

  return (
    <Popover>
      <PopoverTrigger className="ml-auto bg-transparent" asChild>
        <Button variant="outline">
          <Settings className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the Y-axis.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-2 items-center gap-4 w-full">
              <Label htmlFor="maxWeight">Max Weight</Label>
              <Slider
                id="maxWeight"
                value={[maxWeight]}
                min={0}
                max={100}
                step={10}
                onValueChange={(values: number[]) => handleSliderChange(values, 'max')}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4 w-full">
              <Label htmlFor="lineColor">Line Color</Label>
              <input
                type="color"
                id="lineColor"
                value={lineColor}
                onChange={handleColorChange}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4 w-full">
              <Label htmlFor="showPoints">Show Data Points</Label>
              <input
                type="checkbox"
                id="showPoints"
                checked={showPoints}
                onChange={handleShowPointsChange}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
