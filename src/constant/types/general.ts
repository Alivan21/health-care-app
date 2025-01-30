export type SelectOptionsProps = {
  label: string;
  value: string;
};

export type SelectProps = {
  options: SelectOptionsProps[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  selectTriggerPlaceholder: string;
};

export type ChartProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isSelectFilter?: boolean;
  selectProps?: SelectProps;
};
