import { useEffect, useState } from 'react';

interface UseDrag {
  isDragging: boolean;
  disabledIconLeft: boolean;
  disabledIconRight: boolean;
  onDragging: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => void;
  onDragStart: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => void;
  moveTo: (direction: 'right' | 'left', scrollVelocity?: number) => void;
}

export default function useDrag(
  scrollRef: React.RefObject<HTMLDivElement>,
  direction: 'x' | 'y'
): UseDrag {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [prevPage, setPrevPage] = useState<number>(0);
  const [prevScroll, setPrevScroll] = useState<number>(0);
  const [disabledIconLeft, setDisabledIconLeft] = useState<boolean>(false);
  const [disabledIconRight, setDisabledIconRight] = useState<boolean>(false);

  const isMouseEvent = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ): boolean => {
    if (direction === 'x') {
      return (e as React.MouseEvent<HTMLDivElement>).pageX !== undefined;
    }
    return (e as React.MouseEvent<HTMLDivElement>).pageY !== undefined;
  };

  /**
   * Me guarda la posición en la que se empezo arrastrar el mouse o deslizar la pantalla
   */
  const onDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ): void => {
    if (scrollRef.current === null) return;
    setIsDragging(true);
    let page = 0;

    if (direction === 'x') {
      page = isMouseEvent(e)
        ? (e as React.MouseEvent<HTMLDivElement>).pageX
        : (e as React.TouchEvent<HTMLDivElement>).touches[0].pageX;
    } else {
      page = isMouseEvent(e)
        ? (e as React.MouseEvent<HTMLDivElement>).pageY
        : (e as React.TouchEvent<HTMLDivElement>).touches[0].pageY;
    }
    setPrevPage(page);

    setPrevScroll(
      direction === 'x'
        ? scrollRef.current.scrollLeft
        : scrollRef.current.scrollTop
    );
  };

  /**
   * Calcula la distancia que se debe hacer scroll a base de la posición en la que se empezo
   * a arrastrar el mouse o deslizar la pantalla, para asi generar el efecto de scroll de los tabs
   */
  const onDragging = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ): void => {
    if (scrollRef.current === null || !isDragging) return;

    let page = 0;

    if (direction === 'x') {
      page = isMouseEvent(e)
        ? (e as React.MouseEvent<HTMLDivElement>).pageX
        : (e as React.TouchEvent<HTMLDivElement>).touches[0].pageX;
    } else {
      page = isMouseEvent(e)
        ? (e as React.MouseEvent<HTMLDivElement>).pageY
        : (e as React.TouchEvent<HTMLDivElement>).touches[0].pageY;
    }

    const positionDiff: number = page - prevPage;
    if (direction === 'x') {
      scrollRef.current.scrollLeft = prevScroll - positionDiff;
    } else {
      scrollRef.current.scrollTop = prevScroll - positionDiff;
    }
  };

  const disabledIcons = (): void => {
    if (scrollRef.current === null) return;

    // Obtenemos el valor del scroll actual
    const scrollVal = Math.round(scrollRef.current.scrollLeft);

    // Obtenemos el valor de lo maximo que se puede hacer scroll
    const maxScrollableWidth =
      scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

    /* Ocultamos el icono izquierdo si el scroll llega a su punto de inicio 0, o
      se sobre pase el hacer mucho scroll hacia la izquierda
    */
    if (scrollVal <= 0) setDisabledIconLeft(true);
    else {
      setDisabledIconLeft(false);
    }
    // Si se llega al maximo valor que se puede hacer scroll, se oculta el icono derecho
    if (maxScrollableWidth <= scrollVal) setDisabledIconRight(true);
    else {
      setDisabledIconRight(false);
    }
  };

  const moveTo = (directionButton: string, scrollVelocity = 350): void => {
    if (scrollRef.current === null) return;
    if (direction === 'x') {
      scrollRef.current.scrollLeft +=
        directionButton === 'left' ? -scrollVelocity : scrollVelocity;
    } else if (direction === 'y') {
      scrollRef.current.scrollTop +=
        directionButton === 'up' ? -scrollVelocity : scrollVelocity;
    }
    setTimeout(() => {
      disabledIcons();
    }, 50);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      setDisabledIconLeft(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
      setDisabledIconRight(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    });
    document.addEventListener('mouseup', () => {
      setIsDragging(false);
    });
    document.addEventListener('touchend', () => {
      setIsDragging(false);
    });
    return () => {
      document.removeEventListener('mouseup', () => {
        setIsDragging(false);
      });
      document.removeEventListener('touchend', () => {
        setIsDragging(false);
      });
      window.addEventListener('resize', () => {
        setDisabledIconLeft(
          'ontouchstart' in window || navigator.maxTouchPoints > 0
        );
        setDisabledIconRight(
          'ontouchstart' in window || navigator.maxTouchPoints > 0
        );
      });
    };
  }, []);

  return {
    isDragging,
    onDragging,
    onDragStart,
    moveTo,
    disabledIconLeft,
    disabledIconRight
  };
}
