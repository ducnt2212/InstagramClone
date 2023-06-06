/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },

  /** fix firebase initialize app */
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs'],
  },
  //
};
