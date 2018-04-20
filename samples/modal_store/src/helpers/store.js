export const buildModuleTypes = ({ moduleName, types }) => {
  return Object.entries(types).reduce((exportTypes, [type, value]) => {
    exportTypes[type] = `${moduleName}/${value}`;
    return exportTypes;
  }, {});
};
