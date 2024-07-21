const schemes = [
  {
    shortForm: "mo",
    longForm: "monthly",
    name: "Month",
  },
  {
    shortForm: "yr",
    longForm: "yearly",
    name: "Year",
  },
];

export function convertSchemeToText(schemeIndex) {
  if (![0, 1].includes(schemeIndex)) {
    schemeIndex = 1;
    console.log("Invalid Scheme Index, using default...");
  }

  return schemes[schemeIndex];
}
