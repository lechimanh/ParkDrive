class ValidateBase {
    checkTextMaxLength(text, length) {
        if (text.length > length) {
            return false;
        } else {
            return true;
        }
    }
}
export default new ValidateBase();