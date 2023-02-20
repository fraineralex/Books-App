exports.EqualValue = (value, EqualValue) => {
  return value === EqualValue;
};

exports.LengthValue = (array) => {
  if (array.length > 0) return array.length + " libros.";
  else { return " Ninguno.";
  }
};
