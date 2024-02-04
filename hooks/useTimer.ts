import { useRef, useState } from 'react';

interface TimerState {
  timer: string;
  startTimer: () => void;
}

interface TimeRemainder {
  total: number;
  sec: number;
  min: number;
}

const useTimer = (startSecs: number): TimerState => {
  const refInterval = useRef<NodeJS.Timer | null>(null);
  const [timer, setTimer] = useState<string>('00');

  // Obtiene por donde va el contador en tiempo real
  const getCreatAt = (): string => {
    const createdAt = new Date();
    // Establece el limite del contador que es donde debe empezar
    createdAt.setSeconds(createdAt.getSeconds() + startSecs);
    return String(createdAt);
  };

  // Obtiene cuanto tiempo ha pasado desde que incio el contador
  // recibe como parametro la fecha cuando se creo el timer
  const getTimeRemainder = (createdAt: string): TimeRemainder => {
    // Obtiene la diferencia de tiempo desde que se creo el timer y la hora actual
    const total: number =
      Date.parse(createdAt) - Date.parse(String(new Date()));
    const sec = Math.floor((total / 1000) % 60); // Obtenemos los segundos
    const min = Math.floor((total / 1000 / 60) % 60); // Obtenemos los minutos
    return { total, sec, min };
  };

  // Me retorna el formato del contador (00:00)
  const getFormatTimer = (time: TimeRemainder): string => {
    const { sec, min } = time;
    return `${min > 9 ? min : `0${min}`}:${sec > 9 ? sec : `0${sec}`}`;
  };

  // Me permite inicializar el contador, por donde va en tiempo real
  const initTimer = (): void => {
    const createdAt = getCreatAt();
    const time = getTimeRemainder(createdAt);
    if (time.total >= 0) {
      setTimer(getFormatTimer(time));
    }
  };

  // Me permite comenzar la cuenta regresiva
  const startTimer = (): void => {
    const createdAt = getCreatAt();

    // En caso de que llegue un nuevo contador borra el existente, para poder que no haya errores
    if (refInterval.current !== null)
      clearInterval(Number(refInterval.current));
    const id = setInterval(() => {
      const time = getTimeRemainder(createdAt);
      // Solo en caso de que aún el contador no sea 00, se actualiza el timer cada segundo
      if (time.total >= 0) {
        setTimer(getFormatTimer(time));
      } else {
        // Por el contrario se borra el intervalo para que deje de comprabar cada segundo
        clearInterval(Number(refInterval.current));
      }
    }, 1000);
    // Si aun no existe ningun contandor, se referencia para poder borrarlo en caso
    // de que llegue uno nuevo o se reinicie
    if (refInterval.current !== undefined) refInterval.current = id;
  };

  const resetTimer = (): void => {
    initTimer();
    clearInterval(Number(refInterval.current));
    refInterval.current = null;
    startTimer();
  };

  return { timer, startTimer: resetTimer };
};

export default useTimer;
