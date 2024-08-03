

var defaultColor =  '#' + Math.floor(Math.random() * 16777215).toString(16);

if(defaultColor === '#000000' || defaultColor === '#ffffff' || defaultColor === '#191924'){
  defaultColor =  '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// bg-primary px-8 
export const darkTheme = {
    bg: "#1C1C27",
    // bg: defaultColor,
    bgLight: "#1C1E27",
    primary: defaultColor,
    primary_shadow: defaultColor,
    text_primary: "#F2F3F4",
    text_secondary: "#b1b2b3",
    card: "#171721",
    card_light: '#191924',
    button: "#854CE6",
    white: "#FFFFFF",
    black: "#000000",
}

export const lightTheme = {
    bg: "#FFFFFF",
    bgLight: "#f0f0f0",
    primary: defaultColor,
    text_primary: "#111111",
    text_secondary: "#48494a",
    card: "#FFFFFF",
    button: "#5c5b5b",
}



