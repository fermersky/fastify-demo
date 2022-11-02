import bcrypt from "bcrypt";

/**
 *
 * @param {string} plain
 * @param {string} hash
 * @return {boolean} password validation result
 */
export const compare = async (plain, hash) => bcrypt.compare(plain, hash);

export default {
  compare,
};
