import sanitize from "mongo-sanitize";

const sanitizeUserInputs = (userInputs: any) => {
  const keys = Object.keys(userInputs);

  const sanitizeValues = Object.values(userInputs).map((each) =>
    sanitize(each)
  );

  let result = {};
  keys.forEach((key, i) => (result[key] = sanitizeValues[i]));

  return result;
};
export default sanitizeUserInputs;
