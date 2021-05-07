import React from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;
const CheckBox = ({ category, Checked, categoryToggle }) => {
  const renderCheckBox = () =>
    category &&
    category.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => categoryToggle(value._id)}
          checked={Checked.indexOf(value._id) === -1 ? false : true}
          type="checkbox"
        />
        &nbsp;&nbsp;
        <span>{value.name}</span>
        &nbsp;&nbsp;&nbsp;
      </React.Fragment>
    ));

  return (
    <div style={{width:'100%',margin:'8px'}}>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="분류" key="1">
          {renderCheckBox()}
        </Panel>
      </Collapse>
    </div>
  );
};

export default CheckBox;
