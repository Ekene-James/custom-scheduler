import React from "react";

interface Props {
  name: string;
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * @property
   * @type {Date}
   * Converted to string type in the component using string.toLocaleDateString because html input takes a string as value
   */
  value: Date;
}
/** Html Date picker
 *
 *
 * @param Props interface
 * @returns JSX element
 */
function DatePicker({ name, handleOnchange, value }: Props) {
  return (
    <input
      type="date"
      name={name}
      onChange={handleOnchange}
      value={value.toLocaleDateString("en-CA")}
    />
  );
}

export default DatePicker;
