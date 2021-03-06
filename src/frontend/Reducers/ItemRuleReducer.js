import {
  ADD_ITEM_RULE,
  DELETE_ITEM_RULE,
  UPDATE_RULES
} from "../Constant/ActionType";

const initialState = {
  rules: [
    {
      content:
        "Sinh viên cần tuân thủ nghiêm túc các nội quy và quy định của Khoa và Trường."
    },
    {
      content:
        "Đối với bất kỳ sự gian lận nào trong quá trình làm bài tập hay bài thi, sinh viên phải chịu mọi hình thức kỷ luật của Khoa/Trường và bị 0 điểm cho môn học này."
    },
    {
      content:
        "Sinh viên không được vắng quá 3 buổi trên tổng số các buổi học lý thuyết."
    }
  ]
};
const itemRuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_RULE:
      return {
        ...state,
        rules: [...state.rules, JSON.parse(action.data)]
      };
    case DELETE_ITEM_RULE: {
      return {
        ...state,
        rules: state.rules.filter((_, index) => index !== action.data)
      };
    }
    case UPDATE_RULES:
      return {
        ...state,
        rules: action.data
      };

    default:
      return state;
  }
};
export default itemRuleReducer;
