import type { CheckboxValueType } from 'antd/es/checkbox/Group';

export interface Types {
  currentData: ResultInfoDataSingle | undefined;
}

export interface FieldTypes {
  fieldKey: number;
  isListField: boolean;
  key: number;
  name: number;
}

export interface SelectItem {
  name: string;
  value: number;
}

export interface ModalTypes {
  isModalOpen?: boolean;
  setModalOpen: (bool: boolean) => void;
  getModalQualityCheckVal: (list: CheckboxValueType[]) => void;
  qualityList?: any[];
}

export interface ItemType {
  name: string;
  value: string | number;
}

export interface BrandQualitySelectTypes {
  enquiryQuality?: string | number;
  disabled?: boolean;
  brandName?: string | number;
  handleChangeBrandName: () => void;
}
