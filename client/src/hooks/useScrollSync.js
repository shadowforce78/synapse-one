import { useRef, useEffect } from 'react';

export const useScrollSync = (dependencies = []) => {
  const refs = useRef(new Set());
  const isScrolling = useRef(false);
  const lineHeightRatio = useRef({ editor: 1, preview: 1.5 }); // Ratio estimé entre l'éditeur et la prévisualisation

  const register = (element, type = 'default') => {
    if (element) {
      element.dataset.scrollType = type;
      refs.current.add(element);
      return () => refs.current.delete(element);
    }
  };

  useEffect(() => {
    const handleScroll = (e) => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      const source = e.target;
      const sourceType = source.dataset.scrollType || 'default';
      const isEditor = sourceType === 'editor';
      
      // Calcul de la position relative ajustée selon le type d'élément
      const getAdjustedScrollRatio = (element, sourceRatio) => {
        const elemType = element.dataset.scrollType || 'default';
        const ratio = isEditor 
          ? sourceRatio * (lineHeightRatio.current.preview / lineHeightRatio.current.editor)
          : sourceRatio * (lineHeightRatio.current.editor / lineHeightRatio.current.preview);
          
        return Math.min(1, Math.max(0, ratio)); // Limiter entre 0 et 1
      };

      // Calcul de base du pourcentage de scroll
      const scrollRatioY = source.scrollTop / (source.scrollHeight - source.clientHeight || 1);
      const scrollRatioX = source.scrollLeft / (source.scrollWidth - source.clientWidth || 1);

      // Application sur les autres éléments
      refs.current.forEach((element) => {
        if (element !== source) {
          const adjustedScrollRatioY = getAdjustedScrollRatio(element, scrollRatioY);
          
          const targetY = (element.scrollHeight - element.clientHeight) * adjustedScrollRatioY;
          element.scrollTop = targetY;
          
          // Pour le scroll horizontal, on garde un ratio simple
          if (element.scrollWidth > element.clientWidth) {
            element.scrollLeft = (element.scrollWidth - element.clientWidth) * scrollRatioX;
          }
        }
      });

      isScrolling.current = false;
    };

    refs.current.forEach((element) => {
      element.addEventListener('scroll', handleScroll, { passive: true });
    });

    return () => {
      refs.current.forEach((element) => {
        element.removeEventListener('scroll', handleScroll);
      });
    };
  }, [...dependencies]);

  return register;
};
