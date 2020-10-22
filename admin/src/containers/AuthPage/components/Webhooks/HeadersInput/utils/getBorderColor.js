const getBorderColor = ({ isFocused = false, hasError = false }) => {
  if (isFocused) {
    return '#faa6185c';
  }
  if (hasError) {
    return '#F64D0A';
  }

  return '#E3E9F3';
};

export default getBorderColor;