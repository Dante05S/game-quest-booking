export interface PropsButton {
  disabled: boolean;
  moveTo: (direction: 'right' | 'left', scrollVelocity?: number) => void;
}
