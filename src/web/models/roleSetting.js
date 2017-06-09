export default {
  namespace: 'roleSetting',
  state: {
    selectedRowKeys: [],  // Check here to configure the default column
    deleteButtonLoading: false,
    saveButtonLoading: false,
  },
  reducers: {
    select(state, { payload: selectedRowKeys }) {
      return { ...state, selectedRowKeys };
    },
    setDeleteLoading(state, { payload: deleteButtonLoading }) {
      return { ...state, deleteButtonLoading };
    },
    setSaveLoading(state, { payload: saveButtonLoading }) {
      return { ...state, saveButtonLoading };
    },
  },
};
