import { StylesConfig, GroupBase } from "react-select";
import { OptionType } from "./page";

export const customStylesForLanguageInput: StylesConfig<
  OptionType,
  true,
  GroupBase<OptionType>
> = {
  control: (base, state) => ({
    ...base,
    width: "100%", 
    boxSizing: "border-box",
    cursor: "pointer",
    padding: "0.2rem 0.2rem", 
    outline: "none", 
    borderRadius: "0.375rem", 
    borderWidth: state.isFocused ? "2px" : "1px", 
    borderColor: state.isFocused ? "#8fd3d1" : "#d1d5db", 
    boxShadow: state.isFocused
      ? "0 0 0 0px rgba(143, 211, 209, 0.5)" 
      : "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease", 
    "&:hover": {
      borderColor: "#8fd3d1",
    },
  }),

  multiValue: (base) => ({
    ...base,
    backgroundColor: "#30786e",
    color: "#ffffff",
    borderRadius: "0.375rem", 
  }),

  multiValueLabel: (base) => ({
    ...base,
    color: "#ffffff", 
    fontSize: "18px",
  }),

  multiValueRemove: (base) => ({
    ...base,
    color: "#ffffff", 
    borderRadius: "0.375rem", 
    ":hover": {
      backgroundColor: "#30786e",
      color: "#ffffff",
    },
  }),
};
