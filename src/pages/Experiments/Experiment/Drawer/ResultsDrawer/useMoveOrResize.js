import { useCallback } from 'react';
import { ADD_CARD_KEY } from './constants';

export default (monitorings) => {
  return useCallback(
    (layout, _, newItem) => {
      if (newItem.i === ADD_CARD_KEY) return;

      for (const layoutItem of layout) {
        if (layoutItem.i !== ADD_CARD_KEY) {
          let compareResult = monitorings.find((e) => e.uuid === layoutItem.i);
          if (!compareResult) continue;

          compareResult.layout = {
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          };
        }
      }
    },
    [monitorings]
  );
};
