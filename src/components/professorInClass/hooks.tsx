import * as React from 'react';
import {EngagementGraphSeries} from './types';

export const useEngagementGraphToggles = () => {
  const [selectedGraphLines, setSelectedGraphLines] = React.useState<EngagementGraphSeries[]>([
      'connected',
      'disconnects',
      'mobile'
  ]);

  const onToggleGraphLine = React.useCallback((line: EngagementGraphSeries, selected: boolean) => {
      if (selected) {
          setSelectedGraphLines(selectedGraphLines.concat(line));
      } else {
          setSelectedGraphLines(selectedGraphLines.filter(a => a !== line));
      }
  }, [selectedGraphLines, setSelectedGraphLines]);

  return { selectedGraphLines, onToggleGraphLine };
};
