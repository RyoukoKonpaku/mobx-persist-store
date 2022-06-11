import { IAutorunOptions } from 'mobx';

export type ReactionOptions = IAutorunOptions & { fireImmediately?: boolean };

export type PropertyOptionDefinition<T, P extends keyof T> = P | PersistPropertyConverter<T, P>;

export interface PersistenceStorageOptions<T, P extends keyof T> extends StorageOptions {
  name: string;
  properties: PropertyOptionDefinition<T, P>[];
}

export interface PersistPropertyConverter<T, TKey extends keyof T> {
  key: TKey;
  serialize: (prop: any) => any;
  deserialize: (prop: any) => any;
}

export interface StorageOptions {
  /**
   * @property {Boolean} [debugMode] When true console.info when getItem, setItem or removeItem are triggered.
   * @default false
   */
  debugMode?: boolean;
  /**
   * @property {Number} [expireIn] A value in milliseconds to determine when the data in storage should not be retrieved by getItem.
   *
   * Recommend the library https://github.com/henrikjoreteg/milliseconds to set the value
   */
  expireIn?: number;
  /**
   * @property {Boolean} [removeOnExpiration] If {@link StorageOptions#expireIn} has a value and has expired, the data in storage will be removed automatically when getItem is called. The default value is true.
   * @default true
   */
  removeOnExpiration?: boolean;
  /**
   *
   */
  storage?: StorageController;
  /**
   * @property {Boolean} [jsonify] When true the data will be JSON.stringify before being passed to setItem. The default value is true.
   * @default true
   */
  stringify?: boolean;
}

export interface StorageController {
  /**
   * The function that will retrieved the storage data by a specific identifier.
   *
   * @function
   * @param {String} key
   * @return {Promise<String | Object>}
   */
  getItem<T>(key: string): T | string | null | Promise<T | string | null>;
  /**
   * The function that will remove data from storage by a specific identifier.
   *
   * @function
   * @param {String} key
   * @return {Promise<void>}
   */
  removeItem(key: string): void | Promise<void>;
  /**
   * The function that will save data to the storage by a specific identifier.
   *
   * @function
   * @param {String} key
   * @param {String | Object} value
   * @return {Promise<void>}
   */
  setItem(key: string, value: any): void | Promise<void>;
}
