/**
 * @remarks
 * This interface defines the shape of api data object it takes
 */

export interface ApiDataObject {
  /**
   * @property
   * @type {number}
   */
  title: string;
  /**
   * @property
   * @type {Date}
   */
  startDate: Date;
  /**
   * @property
   * @type {Date}
   */
  endDate: Date;
  /**
   * @property
   * @type {string}
   * @example
   * ```
   * 13:00
   * ```
   */
  startTime: string;
  /**
   * @property
   * @type {string}
   * @example
   * ```
   * 14:00
   * ```
   */
  endTime: string;
  /**
   * @property
   * @type {string}
   */
  clientImg: string;
  /**
   * @property
   * @type {string}
   */
  clientName: string;
  /**
   * @property
   * @type {string}
   */
  appointmentWith: string;
  /**
   * @property
   * @type {string}
   */
  appointmentWithImg: string;
  /**
   * @property
   * @type {string}
   */
  appointmentWithId: string;
  /**
   * @property
   * @type {number}
   */
  id: number;
}

/**
 * @remarks
 * This interface defines the type of parameters the ref for the custom modal takes using useImperativeHandle
 */
export interface RefType {
  /**
   * @property
   * @type {function}
   * @returns {void}
   */
  handleToggle: () => void;
}

/**
 * @remarks
 * This interface defines the shape of the Time type
 */
export interface TimeType {
  /**
   * @property
   * @type {string}
   */
  normalTime: string;
  /**
   * @property
   * @type {number}
   */
  militaryTime: number;
}

/**
 * @remarks
 * This interface defines the shape of the menu type for the custom menu
 */
export interface MenuItemType {
  /**
   * @property
   * @type {View}
   * @defaultValue "Day" | "Week" | "Month"
   */
  name: View;
  /**
   * @property
   * @type {View}
   * @defaultValue "Day" | "Week" | "Month"
   */
  value: View;
}

/**
 * @remarks
 * This type defines the shape of the view options for the custom menu
 */
export type View = "Day" | "Week" | "Month";
