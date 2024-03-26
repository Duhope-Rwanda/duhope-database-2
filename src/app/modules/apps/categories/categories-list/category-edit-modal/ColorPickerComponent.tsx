import { useState } from "react";
import { ChromePicker } from 'react-color'

export const ColorPickerComponent = () => {

  const [color, setColor] = useState('#fff');

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor.hex);
  }
  return (
    <div>
      <ChromePicker color={color} onChange={handleColorChange} />

    </div>
  );

}